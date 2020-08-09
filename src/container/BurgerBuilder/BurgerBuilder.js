import React, { Component } from 'react'

import Aux from '../../hoc/aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 2.99,
    bacon: 33.99,
    cheese: 11.29,
    meat: 44.99
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchaseMode: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(err => {
                this.setState({ error: true })
            })
    }

    updatePurchaseState = updatedIngredients => {
        const ingredients = { ...updatedIngredients }
        const sum = Object.values(ingredients).reduce((sum, el) => sum + el)
        return sum > 0
    }

    addIngredientHandler = type => {
        this.setState((state, props) => {
            const oldCount = state.ingredients[type]
            const updatedCount = oldCount + 1
            const updatedIngredients = { ...state.ingredients }

            updatedIngredients[type] = updatedCount
            const updatedPrice = state.totalPrice + INGREDIENT_PRICES[type]

            const updatedPurchaseable = this.updatePurchaseState(updatedIngredients)

            return { ingredients: updatedIngredients, totalPrice: updatedPrice, purchaseable: updatedPurchaseable }
        })
    }

    removeIngredientHandler = type => {
        this.setState((state, props) => {
            const oldCount = state.ingredients[type]
            if (oldCount <= 0) {
                return;
            }
            const updatedIngredients = { ...state.ingredients }
            updatedIngredients[type] = oldCount - 1

            const updatedPrice = state.totalPrice - INGREDIENT_PRICES[type]

            const updatedPurchaseable = this.updatePurchaseState(updatedIngredients)

            return { ingredients: updatedIngredients, totalPrice: updatedPrice, purchaseable: updatedPurchaseable }
        })
    }

    turnOnPurchaseMode = () => {
        this.setState((state, props) => {
            return { purchaseMode: true }
        })
    }

    purchaseCancel = () => {
        this.setState((state, props) => {
            return { purchaseMode: false }
        })
    }

    purchaseContinue = () => {
        const queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`)
        }
        queryParams.push(`${encodeURIComponent('totalPrice')}=${this.state.totalPrice}`)

        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryParams.join('&')}`
        })
    }

    render() {
        const disabledIngredients = { ...this.state.ingredients }
        for (let key in disabledIngredients) {
            disabledIngredients[key] = disabledIngredients[key] <= 0
        }

        let orderSummary = null

        let burger = <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabledIngredients={disabledIngredients}
                        totalPrice={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        turnOnPurchaseMode={this.turnOnPurchaseMode} />
                </Aux>)

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancel={this.purchaseCancel}
                purchaseContinue={this.purchaseContinue}
                totalPrice={this.state.totalPrice} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        if (this.state.error) {
            burger = <p>Get Ingredients Error</p>
        }

        return (
            <Aux>
                <Modal show={this.state.purchaseMode} modalClose={this.purchaseCancel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)