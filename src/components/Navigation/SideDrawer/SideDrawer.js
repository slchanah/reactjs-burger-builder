import React from 'react'
import { connect } from 'react-redux'

import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Aux from '../../../hoc/aux'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = props => {
    let sideDrawerClasses = [classes.SideDrawer, classes.Open]
    if (!props.show) {
        sideDrawerClasses = [classes.SideDrawer, classes.Close]
    }

    return (
        <Aux>
            <Backdrop show={props.show} click={props.closeSideDrawer} />
            <div className={sideDrawerClasses.join(' ')} onClick={props.closeSideDrawer}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(sideDrawer)
