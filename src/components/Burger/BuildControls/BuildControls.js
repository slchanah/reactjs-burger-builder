import React from 'react'

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
            {controls.map(control =>
                <BuildControl
                    label={control.label}
                    key={control.label}
                    ingredientAdded={() => props.ingredientAdded(control.type)}
                    ingredientRemoved={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabledIngredients[control.type]} />
            )}
            <button
                className={classes.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.turnOnPurchaseMode}>
                ORDER NOW
            </button>
        </div>
    )
}

export default buildControls