import React, { useState } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/aux'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const closeSideDrawer = () => {
        setShowSideDrawer(false)
    }

    const toggleSideDrawer = () => {
        setShowSideDrawer(prevState => {
            return !prevState
        })
    }

    return (
        <Aux>
            <Toolbar isAuth={props.isAuth} toggleSideDrawer={toggleSideDrawer} />
            <SideDrawer isAuth={props.isAuth} show={showSideDrawer} closeSideDrawer={closeSideDrawer} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)