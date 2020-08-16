import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../store/actions/order'

const Orders = props => {

    useEffect(() => {
        props.fetchOrder(props.token, props.userId)
    }, [])

    let orders = <Spinner />
    if (props.loading === false) {
        orders = props.orders.map(order =>
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price} />)
    }

    return (
        <div>
            {orders}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrder: (token, userId) => dispatch(orderActions.fetchOrder(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))