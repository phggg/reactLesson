import React, {useEffect,useImperativeHandle} from 'react'
import useForm from './useForm'
import FieldContext from './fieldContext'

const Form = ({children, onFinish, onFinishFailed, form}, ref) => {
  const [formInstance] = useForm(form)
  useImperativeHandle(ref, () => formInstance)
  useEffect(() => {
    formInstance.setCallBacks({
      onFinish,
      onFinishFailed
    })
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    formInstance.submit()
  }
  return (
    <form onSubmit={handleSubmit}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}

export default Form