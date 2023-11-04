---
title: 'Redux 코드를 까보자 - middleware 편'
slug: 'analyze-redux-middleware'
tag: 'technical-experience'
createAt: '2023-11-02'
thumbnail: './thumbnail.png'
description: 'Redux core를 코드 레벨로 분석하며 Redux의 철학과 원리를 이해하자 middleware 편'
---

## 시리즈

> 사용한 코드: [Redux Repository](https://github.com/reduxjs/redux/tree/master/src)

1편: [Redux 코드를 까보자 - store 편](https://yoonhaemin.com/tag/technical-experience/analyze-redux-store/)

2편: [Redux 코드를 까보자 - middleware 편](https://yoonhaemin.com/tag/technical-experience/analyze-redux-middleware/)

## 시작

redux에서는 dispatch가 실행되는 앞뒤로 추가적인 로직을 실행할 수 있도록 하는 middleware가 있습니다. 대표적으로 redux-thunk, redux-saga 등의 라이브러리도 있고 개발자가 프로잭트내에 직접 만든 middleware도 있습니다. 이런 middleware들이 어떤식으로 구성이 되는지 코드를 까보면서 한번 알아보겠습니다.

<br/>

## applyMiddleware를 까보자

applyMiddleware는 middleware를 인자로 받고 StoreEnhancer를 반환하는 걸 볼 수 있습니다.

```tsx
// src/applyMiddleware.ts:60

export default function applyMiddleware(
  ...middlewares: Middleware[]
): StoreEnhancer<any> {...}
```

enhancer는 store에 미들웨어를 추가하기 위해서 존재합니다. 이 enhancer를 createStore에서 3번째 인자로 전달 시에 해당 store의 dispatch가 발생할 때마다 미들웨어를 한번 거쳐서 실행하게 됩니다. 즉 StoreEnhancer는 미들웨어를 하나로 묶어서 넘겨주는 메서드라는 것을 볼 수 있죠.

```typescript
// src/createStore.ts:61

export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S> | StoreEnhancer<Ext, StateExt>,
  enhancer?: StoreEnhancer<Ext, StateExt>
  // 여기에 있는 인자로 전달합니다.
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext {...}
```

그러면 어떻게 applyMiddleware는 enhancer를 리턴해주고 있는지 보겠습니다.

```tsx
// src/applyMiddleware.ts:60

export default function applyMiddleware(...middlewares: Middleware[]): StoreEnhancer<any> {
  return (createStore: StoreEnhancerStoreCreator) =>
    <S, A extends AnyAction>(reducer: Reducer<S, A>, preloadedState?: PreloadedState<S>) => {
      const store = createStore(reducer, preloadedState);
      let dispatch: Dispatch = () => {
        throw new Error(
          'Dispatching while constructing your middleware is not allowed. ' +
            'Other middleware would not be applied to this dispatch.'
        );
      };

      const middlewareAPI: MiddlewareAPI = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args)
      };
      // 미들웨어를 등록하는 중에는 dispatch에 접근할 수 없게 하기 위해서 따로 middlewareAPI를 만듭니다.
      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      dispatch = compose<typeof dispatch>(...chain)(store.dispatch);
      // compose를 통해서 middleware를 합쳐서 dispatch를 재할당함

      return {
        ...store,
        dispatch
      };
    };
}
```

미들웨어를 전부 받아 dispatch를 다시 생성해서 store를 만들어 주는 것을 볼 수 있는데요. 등록해 주었던 미들웨어를 compose매서드를 이용해 dispatch를 재생성하는 것을 볼 수 있습니다.

<br/>

이를 이해하기 위해서 compose라는 매서드를 살펴 보겠습니다.

```tsx
// src/compose.ts:46

export default function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T,>(arg: T) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  );
}
```

단순하게 받은 function을 순서대로 호출하는 하나의 메서드를 reduce를 통해 만들고 있습니다. 즉 이런 식으로 미들웨어가 적용이 되는 것이죠

```tsx
// 원본
// [f1,f2,f3,...]
funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  )

// 최종 완성된 compose 리턴값
(...args) => f1(f2(f3(...args)))
```

이는 함수형 프로그래밍의 커링을 이용한 것인데요. 커링을 사용해서 고차 함수를 만들면 함수를 재사용할 수 있고 여러 함수를 조합할 수 있는 특징을 가지고 있습니다. 여기서는 여러 함수를 조합하여 순차적으로 실행하는 것에 초점이 되어있군요.

<br/>

다시 applyMiddleware로 넘어와 봅시다.

```tsx
// src/applyMiddleware.ts:80

const chain = middlewares.map((middleware) => middleware(middlewareAPI));
dispatch = compose<typeof dispatch>(...chain)(store.dispatch);
```

compose의 리턴값의 실행값을 dispatch를 넣어주게 됩니다. 즉 compose의 리턴값에 …args는 store에 dispatch가 되는 것이죠.

```tsx
// 이런식으로 말이죠
compose(f1, f2, f3, ...)(store.dispatch);

// 완성
f1(f2(f3(store.dispatch)))
```

그런데 여기서 f1, f2, f3도 store.dispatch도 function입니다. 따라서 최종적으로 dispatch는 콜백 함수가 되는 것이며 다음과 같습니다. 정확한 원리는 아래에서 다시 살펴보도록 하고 넘어가겠습니다.

```tsx
// dispatch의 최종 결과물
(action) => f1(f2(f3(...store.dispatch(action))));
```

따라서 최종 리턴 타입은 다음과 같습니다.

```tsx
(createStore)=>{
	...store,
// 기존의 store
	dispatch,
// 변경된 dispatch: (action) => f1(f2(f3(...(store.dispatch(action)))))
}
```

그럼 반환된 enhancer를 바탕으로 createStore에 주입을 해보겠습니다.

```tsx
// middleware가 적용된 sotre의 예시
const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware, anotherMiddleware)
  //  => (createStore) => {...store, dispatch}
);
```

```tsx
// src/createStore.ts:95

if (typeof enhancer !== 'undefined') {
  if (typeof enhancer !== 'function') {
    throw new Error(
      `Expected the enhancer to be a function. Instead, received: '${kindOf(enhancer)}'`
    );
  }

  return enhancer(createStore)(reducer, preloadedState as PreloadedState<S>) as Store<
    ExtendState<S, StateExt>,
    A,
    StateExt,
    Ext
  > &
    Ext;
}
```

enhancer가 들어오면 다음과 같은 로직이 실행되는데요. 기존과 같은 커링 구조인걸 볼 수 있습니다. 조금더 보기 쉽게 치환해 보면 store의 리턴값은 다음과 같습니다.

```tsx
(reducer, preloadedState) => enhancer(createStore(store, preloadedState));
```

여기서 enhancer는 `(createStore) => {...store, dispatch}`였으니 결국 store를 만들어 enhancer의 파라미터로 넘겨주고 enhancer내부에서 미들웨어가 적용된 새로운 dispatch를 할당하는 것입니다.

<br/>

여기 까지의 내용을 정리하면 다음과 같습니다.

1. reducer를 바탕으로 store를 생성한다.
2. applyMiddleware로 해당 미들웨어를 커링 구조로 미들웨어를 합쳐 enhancer를 반환한다.
3. enhancer에 생성된 store를 넘긴다
4. enhancer에는 커링 구조로 되어있는 새로운 dispatch를 store에 적용한다.
5. action을 사용할 시에 커링 구조에 따라 미들웨어가 실행한다.

<br/>

## 미들웨어를 사용해 보자

미들웨어를 적용하려고 코드를 작성하면 다음과 같이 3개의 callback이 return 된걸 볼 수 있습니다.

```tsx
const middleware = (store) => (next) => (action) => {
  console.log('Before action dispatch', action);
  const result = next(action); // action이 다음 미들웨어 또는 리듀서로 전달됨
  console.log('After action dispatch', action);
  return result;
};
```

첫 번째로는 store. 두 번째로는 다음 미들웨어를 실행하는 next. 세 번째로는 전달받은 action을 받습니다. 이것을 이해하기 위해서는 미들웨어가 적용되는 applyMiddleware를 보면서 어느 순간에 어느 파라미터가 넘어오는지 확인해 봐야 합니다..

<br/>

enhancer의 return 메서드중에 다음과 같은 로직이 있습니다. middlewareAPI로 middleware를 하나씩 호출하고 있는 것을 볼 수 있는데요

```tsx
// src/applyMiddleware.ts:68

const store = createStore(reducer, preloadedState);
let dispatch: Dispatch = () => {
  throw new Error(
    'Dispatching while constructing your middleware is not allowed. ' +
      'Other middleware would not be applied to this dispatch.'
  );
};

const middlewareAPI: MiddlewareAPI = {
  getState: store.getState,
  dispatch: (action, ...args) => dispatch(action, ...args)
};
// 미들웨어를 등록하는 중에는 dispatch에 접근할 수 없게 하기 위해서 따로 middlewareAPI를 만듭니다.
const chain = middlewares.map((middleware) => middleware(middlewareAPI));
dispatch = compose<typeof dispatch>(...chain)(store.dispatch);
```

이 객체에서 dispatch는 에러를 띄우는 메서드로, getState는 store 자체값을 참조하고 있습니다. middleware에서 해당 store에 대한 dispatch를 왜 막고있습니다. 현재 dispatch가 실행되어서 middleware를 통과하고 있는 상황인데 여기서 다시 같은 store의 dispatch를 적용한다는 것은 1편에서 봤던 isDispatching과 똑같은 문제가 발생한다는 것을 알 수 있습니다.

<br/>

이렇게 만들어진 값에 middlewares의 루프를 돌면서 middlewareAPI를 주입하고 있고 여기서 middleware의 첫 번째 파라미터인 store가 주입되고 있습니다.

<br/>

두 번째 세 번째 파라미터도 무엇인지 계속 가보도록 하겠습니다. middleware를 compose 해서 나온 dispatch는 다음과 같다고 하였습니다

```tsx
f1(f2(f3(...store.dispatch)));
```

f1이라는 미들웨어의 f2라는 미들웨어 함수가 파라미터로 넘어가고 있습니다. 따라서 두 번째 인자인 next 함수가 다음 미들웨어를 나타내고 있고 현재 시점에서 추가되는 걸 알 수 있습니다.

<br/>

그러면 해당 함수는 두 번째 인자까지 호출했으니 세 번째 인자만 남은 콜백함수가 남게 됩니다.

해당 함수는 다음과 같은 꼴인데 f1의 인자로 f2, f3의 콜백함수가 들어가고 f2는 f3의 콜백 등등의 꼴로 추가됩니다.

```tsx
(((...)=>{로직})=>{로직}) => {로직}

// 마지막에 있는 store.dispatch
(action)=>{dispatch 코드}
```

따라서 마지막에 있는 store.dispatch의 로직이 실행되고 해당 값의 반환값이 그전의 dispatch에 인자로 넘어가게 됩니다. 1편에서 우리는 dispatch의 리턴값이 action이라고 살펴봤습니다. 따라서 return값은 action이 되고 다음 f3의 미들웨어의 action 또한 이 값이 됩니다.

따라서 action의 값을 바꾸지 않는 한 처음 dispatch 하려고 했던 action이 모든 미들웨어에 전달하는 것을 볼 수 있습니다.

<br/>

## 결론

redux구현에는 많은 함수형 프로그래밍 개념이 들어가 있고 순수하고 철저하게 단방향 데이터 flow를 위해서 내부에 많은 제약을 걸어 놨다는 것을 알 수 있습니다.

최근에는 다양한 상태관리 라이브러리들이 나오면서 점점 Redux의 학습이 필요없다 라는 내용들이 나오고 있는데요. 그럼에도 불구하고 저는 Redux에서 추구하고자 했던 철학들은 전역 상태 뿐만 아니라 상태 관리를 하는데 있어서 긍정적이고 적절히 사용하면 좋겠다라고 생각해 배워둘 필요가 있다고 생각합니다. 코드 분석을 통해서 내 프로젝트에도 이런 아이디어들을 적용해 보시는 계기가 되거나 Redux를 프로젝트 기술 스택으로 선택하는 계기가 되었으면 합니다.
