// import {createStore} from "../TryRedux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk"; //异步解决方案
import logger from "redux-logger"; // 打印日志

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

const store = createStore(counterReducer, applyMiddleware(thunk, logger))

export default store