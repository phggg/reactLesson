import React, {useEffect, useState} from 'react'
import store from '../store/indexT'

const ReduxPageMy = () => {
  const [num, setNum] = useState(0)
  const add = () => {
    store.dispatch({
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
    store.dispatch((dispatch, getState) => {
      // console.log(11111111)
      console.log(store.dispatch)
      console.log(dispatch)
      // console.log(11111111)
      setTimeout(() => {
        dispatch({type: 'ADD'})
      }, 1000)
    })
  }

  const add2 = () => {
    store.dispatch({
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
  return (
    <div>
      <h3>ReduxPage</h3>
      {/*<div>{store.getState()}</div>*/}
      <p>{store.getState().count}</p>
      <button onClick={add}>add</button>
      <button onClick={asyncAdd}>asyncAdd</button>

      <p>{store.getState().count2.num}</p>
      <button onClick={add2}>add2</button>
    </div>
  )
}

export default ReduxPageMy

// export default class ReduxPageMy extends React.Component{
//   add = () => {
//     store.dispatch({
//       type: 'Add',
//       payload: 2
//     })
//   }
//   componentDidMount() {
//     store.subscribe(() => {
//       this.forceUpdate()
//     })
//   }
//
//   render() {
//     return (
//       <div>
//         <h3>ReduxPage</h3>
//         <div>{store.getState()}</div>
//         <button onClick={this.add}>add</button>
//       </div>
//     )
//   }
// }