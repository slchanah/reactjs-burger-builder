import * as actionTypes from '../actions/actionTypes'

const INGREDIENT_PRICES = {
    salad: 2.99,
    bacon: 33.99,
    cheese: 11.29,
    meat: 44.99
}

const initState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                building: false
            }

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        default:
            return state
    }
}

export default reducer