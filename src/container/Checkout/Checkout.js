import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'

class Checkout extends Component {

    cancelCheckoutHandler = () => {
        this.props.history.goBack()
    }

    continueOrderHandler = () => {
        this.props.history.replace({
            pathname: '/checkout/contact-data',
            search: this.props.location.search
        })
    }

    render = () => {
        let checkoutSummary = <Redirect to="/" />
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            checkoutSummary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        cancelClick={this.cancelCheckoutHandler}
                        continueClick={this.continueOrderHandler} />
                </div>)
        }

        return (
            <div>
                {checkoutSummary}
                <Route
                    path={`${this.props.match.path}/contact-data`}
                    component={ContactData} />
            </div>)
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)