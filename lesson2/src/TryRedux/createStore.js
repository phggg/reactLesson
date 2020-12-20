const createStore = (reducer, enhancer) => {

  if(enhancer){
    // enhancer 是用于加强store.dispatch的
    return enhancer(createStore)(reducer)
  }

  // store state
  let currentState
  // 监听函数数组
  const currentListeners = []
  const getState = () => {
    return currentState
  }
  const dispatch = (action) => {
    currentState = reducer(currentState, action)
    currentListeners.forEach(listener => listener())
  }
  const subscribe = (listener) => {
    currentListeners.push(listener)
    return () => {
      const index = currentListeners.indexOf(listener)
      currentListeners.splice(index,1)
    }
  }

  // 手动执行dispatch，派发初始值
  dispatch({type: 'REDUX/YYYYYYYYY'})

  return {
    getState,
    dispatch,
    subscribe,
  }
}

export default createStore