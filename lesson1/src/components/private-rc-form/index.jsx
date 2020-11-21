import React, {Component} from 'react'

export default function createForm(Cmp) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    handleChange = (e) => {
      const {name, value} = e.target
      this.setState({
        [name]: value
      })
    }

    getFieldDecorator = (field) => InputCmp => {
      return React.cloneElement(InputCmp, {
        name: field,
        value: this.state[field] || '',
        onChange: this.handleChange,
      })
    }

    setFieldsValue = (newStore) => {
      this.setState(newStore)
    }

    getFieldsValue = () => {
      return this.state
    }

    getForm = () => {
      return {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          setFieldsValue: this.setFieldsValue,
          getFieldsValue: this.getFieldsValue,
        },
      }
    }

    render() {
      return <Cmp {...this.props} {...this.getForm()}/>
    }
  }
}