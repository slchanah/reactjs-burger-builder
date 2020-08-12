import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/aux'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawer = () => {
        this.setState(() => {
            return { showSideDrawer: false }
        })
    }

    toggleSideDrawer = () => {
        this.setState((state, props) => {
            return { showSideDrawer: !state.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuth} toggleSideDrawer={this.toggleSideDrawer} />
                <SideDrawer isAuth={this.props.isAuth} show={this.state.showSideDrawer} closeSideDrawer={this.closeSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)