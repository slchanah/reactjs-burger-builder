import React, { useState } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../../store/actions/index'

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' },
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    })
    const [formValid, setFormValid] = useState(false)

    const orderSumbitHandler = event => {
        event.preventDefault()

        const formData = {}
        for (const [k, v] of Object.entries(orderForm)) {
            formData[k] = v.value
        }

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        }
        props.onOrder(order, props.token)
    }

    const inputChangeHandler = (event, key) => {
        const updatedOrderForm = { ...orderForm }
        const updatedElement = { ...updatedOrderForm[key] }
        updatedElement.value = event.target.value
        updatedElement.valid = checkValid(event.target.value, updatedElement.validation)
        updatedElement.touched = true
        updatedOrderForm[key] = updatedElement

        let formValid = true
        for (const v of Object.values(orderForm)) {
            formValid = v.valid && formValid
        }

        setOrderForm(updatedOrderForm)
        setFormValid(formValid)
    }

    const checkValid = (value, rules) => {
        let isValid = true

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }

    const inputElements = []
    for (const [k, v] of Object.entries(orderForm)) {
        inputElements.push(
            <Input
                key={k}
                elementType={v.elementType}
                elementConfig={v.elementConfig}
                value={v.value}
                changed={(event) => inputChangeHandler(event, k)}
                valid={v.valid}
                touched={v.touched}
                shouldValidate={v.validation} />)
    }

    let form = (
        <form onSubmit={orderSumbitHandler}>
            {inputElements}
            <Button disable={!formValid} btnType="Success">ORDER</Button>
        </form>)
    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios)) 