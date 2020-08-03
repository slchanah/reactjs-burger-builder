import React from 'react'

import Aux from '../../../hoc/aux'
import Button from '../../UI/Button/Button'

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map(k =>
        <li key={k}><span style={{ textTransform: 'capitalize' }}>{k}</span>: {props.ingredients[k]}</li>)

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" click={props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" click={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary