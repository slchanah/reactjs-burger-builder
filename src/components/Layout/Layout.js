import React, { Component } from 'react'

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
                <Toolbar toggleSideDrawer={this.toggleSideDrawer} />
                <SideDrawer show={this.state.showSideDrawer} closeSideDrawer={this.closeSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout