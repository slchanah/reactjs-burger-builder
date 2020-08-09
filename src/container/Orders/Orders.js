import React, { Component } from 'react'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = {
        loading: true,
        orders: []
    }

    componentDidMount = () => {
        axios.get('/order.json')
            .then(res => {
                const tempOrders = []
                for (let k in res.data) {
                    tempOrders.push({
                        ...res.data[k],
                        id: k
                    })
                }
                this.setState({ loading: false, orders: tempOrders })
            })
    }

    render = () => {
        let orders = <Spinner />
        if (this.state.loading === false) {
            orders = this.state.orders.map(order =>
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

export default withErrorHandler(Orders, axios)