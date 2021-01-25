import React, {useEffect, useState} from 'react'
// import store from '../store/indexT'
import {connect} from '../TryReactRedux'
// import {bindActionCreators} from "redux";
import {bindActionCreators} from "../TryReactRedux";

const ReduxPageMy = props => {
  const [num, setNum] = useState(0)
  const add = () => {
    props.dispatch({
      type: 'ADD',
      payload: 1
    })
  }

  const asyncAdd = () => {
    // setTimeout(() => {
    //   store.dispatch({
    //     type: 'ADD',
    //     payload: 1
    //   })
    // }, 1000)
    props.dispatch((dispatch, getState) => {
      // console.log(11111111)
      // console.log(store.dispatch)
      // console.log(dispatch)
      // console.log(11111111)
      setTimeout(() => {
        dispatch({type: 'ADD'})
      }, 1000)
    })
  }

  const add2 = () => {
    props.dispatch({
      type: 'ADD2',
      payload: 100
    })
  }

  useEffect(() => {
    // * 重点：有订阅，一定得有取消订阅的操作
    const unSubscribe = store.subscribe(() => {
      setNum(n => n + 1)
    })
    return () => unSubscribe && unSubscribe()
  }, [])
  console.log(props)

  return (
    <div>
      <h3>ReduxPage</h3>
      {/*<div>{store.getState()}</div>*/}
      {/*<p>{store.getState().count}</p>*/}
      <p>{props.count}</p>
      <button onClick={add}>add</button>
      <button onClick={props.add}>addProps</button>
      <button onClick={props.minus}>minusProps</button>
      <button onClick={asyncAdd}>asyncAdd</button>

      {/*<p>{store.getState().count2.num}</p>*/}
      <p>{props.count2?.num}</p>
      <button onClick={add2}>add2</button>
    </div>
  )
}

export default connect(
  // mapStateToProps
  ({count, count2}) => ({count,count2}),

  // mapDispatchToDispatch
  // {
  //   add: () => ({type: 'ADD'}),
  //   minus: () => ({type: 'MINUS'})
  // }
  dispatch => {
    let creators = {
      add: () => ({type: 'ADD'}),
      minus: () => ({type: 'MINUS'}),
    }
    creators = bindActionCreators(creators, dispatch)
    return {
      dispatch,
      ...creators
    }
  }
)(ReduxPageMy)
