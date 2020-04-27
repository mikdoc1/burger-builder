import React, { useState } from 'react';
import classes from './Layout.module.css'; 
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = (props) => {
    const [showSideDrawer, setState] = useState(false);

    const sideDrawerClosedHandler = () => {
        setState(false)
    };

    const sideDrawerToggle = () => {
        setState(prevState => ({
            showSideDrawer: !showSideDrawer
        }))
    };


    return (
        <>
         <Toolbar 
            isAuth={props.isAuthenticated}
            toggleHandler={sideDrawerToggle}/>
         <SideDrawer    closed={sideDrawerClosedHandler}
                        isAuth={props.isAuthenticated}
                        open={showSideDrawer}/>
         <main className={classes.Content}>
             {props.children}
         </main>
        </>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)