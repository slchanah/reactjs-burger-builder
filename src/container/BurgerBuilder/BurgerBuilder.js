import React, { useState, useEffect } from 'react'
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

const BurgerBuilder = props => {
    const [purchaseMode, setPurchaseMode] = useState(false)

    useEffect(() => {
        props.initIngredients()
    }, [])

    const updatePurchaseState = updatedIngredients => {
        const ingredients = { ...updatedIngredients }
        const sum = Object.values(ingredients).reduce((sum, el) => sum + el)
        return sum > 0
    }

    const turnOnPurchaseMode = () => {
        if (props.isAuth) {
            setPurchaseMode(true)
        }
        else {
            props.setRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseCancel = () => {
        setPurchaseMode(false)
    }

    const purchaseContinue = () => {
        props.initPurchase()
        props.history.push('/checkout')
    }

    const disabledIngredients = { ...props.ingredients }
    for (let key in disabledIngredients) {
        disabledIngredients[key] = disabledIngredients[key] <= 0
    }

    let orderSummary = null

    let burger = <Spinner />
    if (props.ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    ingredientAdded={props.addIngredient}
                    ingredientRemoved={props.removeIngredient}
                    disabledIngredients={disabledIngredients}
                    totalPrice={props.totalPrice}
                    purchaseable={updatePurchaseState(props.ingredients)}
                    turnOnPurchaseMode={turnOnPurchaseMode}
                    isAuth={props.isAuth} />
            </Aux>)

        orderSummary = <OrderSummary
            ingredients={props.ingredients}
            purchaseCancel={purchaseCancel}
            purchaseContinue={purchaseContinue}
            totalPrice={props.totalPrice} />
    }

    // if (state.loading) {
    //     orderSummary = <Spinner />
    // }

    if (props.error) {
        burger = <p>Get Ingredients Error</p>
    }

    return (
        < Aux >
            <Modal show={purchaseMode} modalClose={purchaseCancel}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux >
    )
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