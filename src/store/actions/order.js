import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post(`/order.json?auth=${token}`, orderData)
            .then(res => {
                dispatch(purchaseBurgerSuccess(res.data.name, orderData))

            })
            .catch(err => {
                dispatch(purchaseBurgerFailed(err))
            })
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailed = error => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
        error: error
    }
}

export const fetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get(`/order.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
            .then(res => {
                const tempOrders = []
                for (let k in res.data) {
                    tempOrders.push({
                        ...res.data[k],
                        id: k
                    })
                }
                dispatch(fetchOrderSuccess(tempOrders))
            })
            .catch(err => {
                dispatch(fetchOrderFailed(err))
            })
    }
}

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    }
}