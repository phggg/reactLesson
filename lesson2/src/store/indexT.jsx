import {createStore, applyMiddleware} from "../TryRedux";
// import {createStore, applyMiddleware} from "redux";
// import thunk from "redux-thunk"; //异步解决方案
// import logger from "redux-logger"; // 打印日志

export const counterReducer = (state = 0, {type, payload = 1}) => {
  switch (type) {
    case 'ADD':
      return state + payload
    case 'MINUS':
      return state - payload
    default:
      return state
  }
}

const logger2 = ({dispatch, getState}) => {
  console.log('logger2')
  return next => {
    console.log(next)
    return action => {
      console.log('----------')
      return next(action)
    }
  }
}

const thunk = ({dispatch, getState}) => {
  return next => {
    console.log('thunk')
    console.log(next)
    return action => {
      console.log(2222)
      console.log(action)
      console.log(dispatch)
      if (typeof action === 'function') {
        return action(dispatch, getState)
      }
      return next(action)
    }
  }
}

const logger = ({dispatch, getState}) => {
  return next => {
    console.log('logger')
    console.log(next)
    return action => {
      console.log('+++++++++++++++')
      console.log(next)
      console.log(action)
      const prevState = getState()
      console.log('prevState', prevState)

      const returnValue = next(action)
      console.log(action.type + '执行了')
      console.log(returnValue)

      const nextState = getState()
      console.log('nextState', nextState)
      console.log('+++++++++++++++')
      return returnValue
    }
  }
}

// logger要作为applyMiddleware的最后一个参数，不然不能保证action是plain object
const store = createStore(counterReducer, applyMiddleware(logger2, thunk, logger))

export default store