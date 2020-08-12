import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as authActions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/aux'

class Auth extends Component {
    state = {
        control: {
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
        },
        formValid: false,
        isSignUp: true
    }

    componentDidMount = () => {
        if (!this.props.building && this.props.path !== '/') {
            this.props.setRedirectPath()
        }
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

    inputChangeHandler = (event, key) => {
        const updatedControl = {
            ...this.state.control,
            [key]: {
                ...this.state.control[key],
                value: event.target.value,
                valid: this.checkValid(event.target.value, this.state.control[key].validation),
                touched: true
            }
        }

        let formValid = true
        for (const v of Object.values(updatedControl)) {
            formValid = v.valid && formValid
        }

        this.setState({ control: updatedControl, formValid: formValid })
    }

    submitHandler = event => {
        event.preventDefault()
        this.props.onAuth(this.state.control.email.value, this.state.control.password.value, this.state.isSignUp)
    }

    switchIsSignUpHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render = () => {
        const inputElements = []
        for (const [k, v] of Object.entries(this.state.control)) {
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

        let error = null
        if (this.props.error) {
            error = <p>{this.props.error.message}</p>
        }

        let form = (
            <Aux>
                {error}
                <form onSubmit={this.submitHandler}>
                    {inputElements}
                    <Button disable={!this.state.formValid} btnType="Success">SUBMIT</Button>
                </form>
                <Button click={this.switchIsSignUpHandler} btnType="Danger">Switch To {this.state.isSignUp ? 'Sign In' : 'Sign Up'}</Button>
            </Aux>
        )

        if (this.props.loading) {
            form = <Spinner />
        }

        let redirect = null
        if (this.props.isAuth) {
            redirect = <Redirect to={this.props.path} />
        }

        return (
            <div className={classes.Auth}>
                {redirect}
                {form}
            </div>
        )
    }
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