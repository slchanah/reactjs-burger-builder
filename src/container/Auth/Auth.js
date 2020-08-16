import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as authActions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/aux'

const Auth = props => {
    const [control, setControl] = useState({
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
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })

    const [formValid, setFormValid] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)

    useEffect(() => {
        if (!props.building && props.path !== '/') {
            props.setRedirectPath()
        }
    }, [])

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

    const inputChangeHandler = (event, key) => {
        const updatedControl = {
            ...control,
            [key]: {
                ...control[key],
                value: event.target.value,
                valid: checkValid(event.target.value, control[key].validation),
                touched: true
            }
        }

        let formValid = true
        for (const v of Object.values(updatedControl)) {
            formValid = v.valid && formValid
        }

        setControl(updatedControl)
        setFormValid(formValid)
    }

    const submitHandler = event => {
        event.preventDefault()
        props.onAuth(control.email.value, control.password.value, isSignUp)
    }

    const switchIsSignUpHandler = () => {
        setIsSignUp(prevState => {
            return !prevState
        })
    }

    const inputElements = []
    for (const [k, v] of Object.entries(control)) {
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

    let error = null
    if (props.error) {
        error = <p>{props.error.message}</p>
    }

    let form = (
        <Aux>
            {error}
            <form onSubmit={submitHandler}>
                {inputElements}
                <Button disable={!formValid} btnType="Success">SUBMIT</Button>
            </form>
            <Button click={switchIsSignUpHandler} btnType="Danger">Switch To {isSignUp ? 'Sign In' : 'Sign Up'}</Button>
        </Aux>
    )

    if (props.loading) {
        form = <Spinner />
    }

    let redirect = null
    if (props.isAuth) {
        redirect = <Redirect to={props.path} />
    }

    return (
        <div className={classes.Auth}>
            {redirect}
            {form}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(authActions.auth(email, password, isSignUp)),
        setRedirectPath: () => dispatch(authActions.authRedirectPath('/'))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        path: state.auth.authRedirectPath,
        building: state.burgerBuilder.building
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)