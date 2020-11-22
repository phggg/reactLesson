import React, {Component} from 'react'
// import {createForm} from 'rc-form'
import createForm from '../components/private-rc-form'

const nameRules = {required: true, message: "请输入姓名！"};
const passwordRules = {required: true, message: "请输入密码！"};

@createForm
class MyRcForm extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.form.setFieldsValue({username: 'default'})
  }

  submit = () => {
    const {getFieldsValue, validateFields} = this.props.form
    validateFields((err,val) => {
      if(err){
        console.log(err)
      } else {
        console.log('校验成功')
      }
    })
    // console.log(getFieldsValue())
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        {getFieldDecorator('username', {rules: [nameRules]})(<input placeholder={'Username'} />)}
        {getFieldDecorator('password', {rules: [passwordRules]})(<input placeholder={'Password'} />)}
        <button onClick={this.submit}>submit</button>
      </div>
    )
  }
}

export default MyRcForm