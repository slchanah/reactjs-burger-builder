import React, { Component } from 'react'

import classes from './Modal.module.css'
import Aux from '../../../hoc/aux'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.purchaseMode !== this.props.purchaseMode
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.purchaseMode} click={this.props.modalClose} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.purchaseMode ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.purchaseMode ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal