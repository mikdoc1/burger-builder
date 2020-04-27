import React, { useState, useEffect } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject } from '../../shared/utility';
import { checkValidity } from '../../shared/utility';


const Auth = (props) => {
    console.log(props)
    const [state, setState] = useState({
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
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
            },
        },
        isSignUp: true
    });

    const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props
 
    useEffect(() => {
        if(!buildingBurger && authRedirectPath !== '/') {      
            onSetAuthRedirectPath()
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(state.controls, {
            [controlName]: updateObject(state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, state.controls[controlName].validation),
                touched: true
            })
        });
        setState(prevState => ({
            ...prevState,
            controls: updatedControls
        }))
    }



    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(state.controls.email.value, state.controls.password.value, state.isSignUp)
    }

    const switchAuthModeHandler = () => {
        setState(prevState => ({
            ...prevState,
            isSignUp: !state.isSignUp
        }));
    }

    const formElementsArray = []; 
    for (let key in state.controls) {
        formElementsArray.push({
            id: key,
            config: state.controls[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input 
            key={formElement.id}
            changed={(event) => inputChangedHandler(event, formElement.id)}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}/>      
    ));

    if(props.loading) {
        form = <Spinner/>
    }

    let errorMessage = null;
     if(props.error) {
         errorMessage = (
            <p>{props.error.message}</p>
         );
     }

     let authRedirect = null;
     if(props.isAuthenticated) {
         authRedirect = <Redirect to={props.authRedirectPath}/>
     }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button 
                clicked={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
         onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
         onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)