import React, {Component,useMemo, useContext, useState} from 'react'
import FieldContext from './fieldContext'

export default class Field extends Component{

  static contextType = FieldContext;

  componentDidMount() {
    const {registerEntity} = this.context
    this.unregisterEntity = registerEntity(this)
  }

  componentWillUnmount() {
    this.unregisterEntity && this.unregisterEntity()
  }

  getControlled = () => {
    const {getFieldsValue, setFieldsValue} = this.context;
    const {name} = this.props;
    return ({
      value: getFieldsValue(name),
      onChange: (e) => {
        setFieldsValue({[name]: e.target.value})
      }
    })
  }

  onStoreChange = () => {
    this.forceUpdate()
  }

  render() {
    const {children} = this.props
    return React.cloneElement(children, this.getControlled())
  }
}


// const Field = ({children, name}) => {
//
//   const {getFieldValue, setFieldValue} = useContext(FieldContext)
//   const [value, setValue] = useState(0)
//
//   const getControlled = useMemo(() => ({
//     value: getFieldValue(name), // 从formStore中读取数据
//     onChange: (e) => {
//       setFieldValue({[name]: e.target.value}) // 设置formStore重的数据
//       setValue((value) => value + 1)
//       console.log(value)
//     },
//   }), [value])
//
//   return React.cloneElement(children, getControlled)
// }
//
// export default Field