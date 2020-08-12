import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './components/Layout/Layout'
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import Logout from './container/Auth/Logout/Logout'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent'

const asyncCheckout = asyncComponent(() => import('./container/Checkout/Checkout'))
const asyncOrders = asyncComponent(() => import('./container/Orders/Orders'))
const asyncAuth = asyncComponent(() => import('./container/Auth/Auth'))

class App extends Component {
  componentDidMount = () => {
    this.props.checkState()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/auth" />
      </Switch>
    )
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkState: () => dispatch(actions.authCheckState())
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);