const applyMiddleware = (...middlewares) => {

  return createStore => reducer => {
    const store = createStore(reducer)
    // let dispatch = store.dispatch
    const midApi = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    }
    const middlewareChain = middlewares.map(middleware => middleware(midApi))
    // 重新赋值一个函数
    const dispatch = compose(...middlewareChain)(store.dispatch)
    // console.log(dispatch)

    // 加强store.dispatch
    return {
      ...store,
      dispatch
    }
  }
}

const compose = (...funcs) => {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export default applyMiddleware