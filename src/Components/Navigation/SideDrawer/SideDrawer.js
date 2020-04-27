import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/BackDrop/BackDrop';

const SideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close]
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <>
        <Backdrop show={props.open} click={props.closed}/>
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
                <Logo />
            </div>           
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
        </>
    )
}

export default SideDrawer