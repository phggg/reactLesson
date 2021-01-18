import React, {useEffect, useState} from 'react'
// import store from '../store/indexT'
import {connect, useDispatch, useSelector} from 'react-redux'
import {bindActionCreators} from "redux";

const ReduxPageHooksMy = props => {
  const dispatch = useDispatch()
  const count = useSelector(state => state.count)
  const count2 = useSelector(state => state.count2)
  const add = () => {
    dispatch({
      type: 'ADD',
      payload: 1
    })
  }

  const asyncAdd = () => {
    dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({type: 'ADD'})
      }, 1000)
    })
  }

  const add2 = () => {
    dispatch({
      type: 'ADD2',
      payload: 100
    })
  }

  return (
    <div>
      <h3>ReduxPage</h3>
      <p>{count}</p>
      <button onClick={add}>add</button>
      {/*<button onClick={props.minus}>minusProps</button>*/}
      <button onClick={asyncAdd}>asyncAdd</button>

      <p>{count2.num}</p>
      <button onClick={add2}>add2</button>
    </div>
  )
}

export default ReduxPageHooksMy