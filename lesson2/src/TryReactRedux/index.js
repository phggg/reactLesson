import React, {createContext, useContext, useLayoutEffect, useReducer, useCallback} from 'react'

// 通过Context传递store
// *step1 创建一个Context对象
const Context = createContext()
// *step2 通过Provider传递value (store)
export const Provider = ({store, children}) => {
  return <Context.Provider value={store}>
    {children}
  </Context.Provider>
}
// *step3 子组件接收 context value (Consumer || contextType || useContext)
export const connect = (mapStateToProps = state => state, mapDispatchToProps) => WrappedComponent => props => {
  const forceUpdate = useForceUpdate()
  const store = useContext(Context)
  const {getState, dispatch} = store
  const stateProps = mapStateToProps(getState())
  let dispatchProps = {dispatch}

  if (typeof mapDispatchToProps === 'object') {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
  } else if (typeof mapDispatchToProps === 'function') {
    dispatchProps = mapDispatchToProps(dispatch)
  }

  // 防止订阅丢失
  useLayoutEffect(() => {
    const unSubscribe = store.subscribe(() => {
      forceUpdate()
    })
    return () => {
      unSubscribe && unSubscribe()
    }
  }, [store])
  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
}

// hook只能用在函数组件或自定义hook中
const useForceUpdate = () => {
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  const update = useCallback(() => {
    forceUpdate()
  }, [])
  return update
}

const bindActionCreator = (creator, dispatch) => {
  return (...args) => dispatch(creator(...args))
}

export const bindActionCreators = (creators, dispatch) => {
  let obj = {}
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch)
  }
  return obj
}

export const useSelector = (selector) => {
  const store = useStore()
  const {getState} = store
  const selectState = selector(getState())
  const forceUpdate = useForceUpdate()
  // 防止订阅丢失
  useLayoutEffect(() => {
    const unSubscribe = store.subscribe(() => {
      forceUpdate()
    })
    return () => {
      unSubscribe && unSubscribe()
    }
  }, [store])
  return selectState
}

export const useDispatch = () => {
  const store = useStore()
  return store.dispatch
}

const useStore = () => {
  const store = useContext(Context)
  return store
}
