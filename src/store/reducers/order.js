import * as actionTypes from '../actions/actionTypes'

const initState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            }

        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false
            }

        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.INIT_PURCHASE:
            return {
                ...state,
                purchased: false
            }

        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            }

        case actionTypes.FETCH_ORDER_FAILED:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}

export default reducer