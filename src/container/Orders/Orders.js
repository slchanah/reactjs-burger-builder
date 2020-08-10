import React, { Component } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../store/actions/order'

class Orders extends Component {

    componentDidMount = () => {
        this.props.fetchOrder()
    }

    render = () => {
        let orders = <Spinner />
        if (this.props.loading === false) {
            orders = this.props.orders.map(order =>
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
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrder: () => dispatch(orderActions.fetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))