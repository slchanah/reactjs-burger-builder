import React from 'react'

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
            <div className={sideDrawerClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer
