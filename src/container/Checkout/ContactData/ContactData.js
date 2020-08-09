import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
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
        },
        formValid: false,
        loading: false
    }

    orderSumbitHandler = event => {
        event.preventDefault()
        this.setState({ loading: true })
        const formData = {}
        for (const [k, v] of Object.entries(this.state.orderForm)) {
            formData[k] = v.value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        axios.post('/order.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(error => this.setState({ loading: false }))
    }

    inputChangeHandler = (event, key) => {
        const updatedOrderForm = { ...this.state.orderForm }
        const updatedElement = { ...updatedOrderForm[key] }
        updatedElement.value = event.target.value
        updatedElement.valid = this.checkValid(event.target.value, updatedElement.validation)
        updatedElement.touched = true
        updatedOrderForm[key] = updatedElement

        let formValid = true
        for (const v of Object.values(this.state.orderForm)) {
            formValid = v.valid && formValid
        }

        this.setState({ orderForm: updatedOrderForm, formValid: formValid })
    }

    checkValid = (value, rules) => {
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

    render = () => {
        const inputElements = []
        for (const [k, v] of Object.entries(this.state.orderForm)) {
            inputElements.push(
                <Input
                    key={k}
                    elementType={v.elementType}
                    elementConfig={v.elementConfig}
                    value={v.value}
                    changed={(event) => this.inputChangeHandler(event, k)}
                    valid={v.valid}
                    touched={v.touched}
                    shouldValidate={v.validation} />)
        }

        let form = (
            <form onSubmit={this.orderSumbitHandler}>
                {inputElements}
                <Button disable={!this.state.formValid} btnType="Success">ORDER</Button>
            </form>)
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData