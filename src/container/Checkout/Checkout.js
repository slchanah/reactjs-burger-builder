import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'

const Checkout = props => {

    const cancelCheckoutHandler = () => {
        props.history.goBack()
    }

    const continueOrderHandler = () => {
        props.history.replace({
            pathname: '/checkout/contact-data',
            search: props.location.search
        })
    }

    let checkoutSummary = <Redirect to="/" />
    if (props.ingredients) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null
        checkoutSummary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ingredients}
                    cancelClick={cancelCheckoutHandler}
                    continueClick={continueOrderHandler} />
            </div>)
    }

    return (
        <div>
            {checkoutSummary}
            <Route
                path={`${props.match.path}/contact-data`}
                component={ContactData} />
        </div>)
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)