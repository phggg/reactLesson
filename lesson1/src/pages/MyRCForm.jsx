import React, {Component} from 'react'
// import {createForm} from 'rc-form'
import createForm from '../components/private-rc-form'

@createForm
class MyRcForm extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.form.setFieldsValue({username: 'default'})
  }

  submit = () => {
    const {getFieldsValue} = this.props.form
    console.log(getFieldsValue())
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        {getFieldDecorator('username')(<input placeholder={'Username'} />)}
        {getFieldDecorator('password')(<input placeholder={'Password'} />)}
        <button onClick={this.submit}>submit</button>
      </div>
    )
  }
}

export default MyRcForm