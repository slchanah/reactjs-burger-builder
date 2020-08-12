import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderAction from '../../store/actions/index'
import * as orderActions from '../../store/actions/order'
import * as authActions from '../../store/actions/auth'

class BurgerBuilder extends Component {
    state = {
        purchaseMode: false,
        // loading: false
    }

    componentDidMount = () => {
        this.props.initIngredients()
    }

    updatePurchaseState = updatedIngredients => {
        const ingredients = { ...updatedIngredients }
        const sum = Object.values(ingredients).reduce((sum, el) => sum + el)
        return sum > 0
    }

    turnOnPurchaseMode = () => {
        if (this.props.isAuth) {
            this.setState((state, props) => {
                return { purchaseMode: true }
            })
        }
        else {
            this.props.setRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancel = () => {
        this.setState((state, props) => {
            return { purchaseMode: false }
        })
    }

    purchaseContinue = () => {
        this.props.initPurchase()
        this.props.history.push('/checkout')
    }

    render() {
        const disabledIngredients = { ...this.props.ingredients }
        for (let key in disabledIngredients) {
            disabledIngredients[key] = disabledIngredients[key] <= 0
        }

        let orderSummary = null

        let burger = <Spinner />
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        disabledIngredients={disabledIngredients}
                        totalPrice={this.props.totalPrice}
                        purchaseable={this.updatePurchaseState(this.props.ingredients)}
                        turnOnPurchaseMode={this.turnOnPurchaseMode}
                        isAuth={this.props.isAuth} />
                </Aux>)

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseCancel={this.purchaseCancel}
                purchaseContinue={this.purchaseContinue}
                totalPrice={this.props.totalPrice} />
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        if (this.props.error) {
            burger = <p>Get Ingredients Error</p>
        }

        return (
            < Aux >
                <Modal show={this.state.purchaseMode} modalClose={this.purchaseCancel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux >
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: ingredientName => dispatch(burgerBuilderAction.addIngredient(ingredientName)),
        removeIngredient: ingredientName => dispatch(burgerBuilderAction.removeIngredient(ingredientName)),
        initIngredients: () => dispatch(burgerBuilderAction.initIngredients()),
        initPurchase: () => dispatch(orderActions.initPurchase()),
        setRedirectPath: path => dispatch(authActions.authRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))