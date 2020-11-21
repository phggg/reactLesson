import {useRef} from 'react'

// 自定义hook
class FormStore {
  constructor(props) {
    // 存储form要处理的数据
    this.store = {}
    // 源码当中用的是数组
    this.fieldEntities = {} //[];
    this.callBacks = {}
  }

  setCallBacks = callback => {
    this.callBacks = {
      ...this.callBacks,
      ...callback,
    }
  }

  registerEntity = entity => {
    this.fieldEntities = {
      ...this.fieldEntities,
      [entity.props.name]: entity,
    }

    return () => {
      // 取消注册
      delete this.fieldEntities[entity.props.name]
    }
  }

  getFieldsValue = name => {
    return this.store[name]
  }

  setFieldsValue = newStore => {
    this.store = {
      ...this.store,
      ...newStore,
    }
    Object.keys(newStore).forEach(item => {
      console.log(this.fieldEntities)
      this.fieldEntities[item].onStoreChange()
    })
  }

  validate = () => {
    let err = []
    // todo 遍历this.store
    Object.keys(this.fieldEntities).forEach(key => {
      const entity = this.fieldEntities[key]
      const {rules} = entity.props
      const rule = rules && rules[0]
      const value = this.getFieldsValue(key)
      if (rule && rule.required && !value && value !== 0) {
        err.push({
          value,
          [key]: rule.message,
        })
      }
    })
    return err
  }

  submit = () => {
    const {onFinish, onFinishFailed} = this.callBacks
    let err = this.validate()
    if (err.length === 0) {
      onFinish && onFinish({...this.store})
      return
    }
    onFinishFailed && onFinishFailed(err, {...this.store})
  }

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      registerEntity: this.registerEntity,
      submit: this.submit,
      setCallBacks: this.setCallBacks,
    }
  }
}

export default function useForm(form) {
  const formRef = useRef()
  if (!formRef.current) {
    if(form){
      formRef.current = form
    } else {
      const formStore = new FormStore()
      formRef.current = formStore.getForm()
    }
  }

  return [formRef.current]
}