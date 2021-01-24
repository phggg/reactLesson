import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import HomePage from "./pages/HomePage"
import UserPage from "./pages/UserPage"
import LoginPage from "./pages/LoginPage"
import _404Page from "./pages/_404Page"

/*
* Route三种方式：children={() => <div>childrenPage</div>} component={HomePage} render={() => <div>renderPage</div>}
* 优先级：children > component > render
* 区别：children和render都是接收function，component和render必须在路径匹配的情况下才能渲染，而children任何情况都会渲染
*/
const App = () => {
  return (
    <div>
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Link to="/product/123">商品</Link>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/user' component={UserPage}/>
          <Route exact path='/login' component={LoginPage}/>
          <Route component={_404Page}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App