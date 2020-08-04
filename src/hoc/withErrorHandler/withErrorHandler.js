import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../aux'

const withErrorHandler = (WrappedComponent, axios) =>
    class extends Component {
        state = {
            error: null
        }

        componentWillMount = () => {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            }, err => {
                this.setState({ error: err })
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({ error: err })
            })
        }

        componentWillUnmount = () => {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        modalCloseHandler = () => {
            this.setState({ error: null })
        }

        render = () => {
            return (<Aux>
                <Modal show={this.state.error} modalClose={this.modalCloseHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
                {this.state.error ? <p>Error</p> : null}
            </Aux>)
        }
    }

export default withErrorHandler