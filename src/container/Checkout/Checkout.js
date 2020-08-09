import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import ContactData from '../Checkout/ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentDidMount = () => {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let totalPrice = 0
        for (let param of query.entries()) {
            if (param[0] === 'totalPrice') {
                totalPrice = +param[1]
            }
            else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: totalPrice })
    }

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
        let checkoutSummary = <Spinner />
        if (this.state.ingredients) {
            checkoutSummary = <CheckoutSummary
                ingredients={this.state.ingredients}
                cancelClick={this.cancelCheckoutHandler}
                continueClick={this.continueOrderHandler} />
        }

        return (
            <div>
                {checkoutSummary}
                <Route
                    path={`${this.props.match.path}/contact-data`}
                    render={(props) => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice} {...props} />)} />
            </div>)
    }
}

export default Checkout