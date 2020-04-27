import React, { useState, useEffect } from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-order';
import {useCallback} from 'react';



export const BurgerBuilder = (props) => {
    const [{purchasing}, setState] = useState({
        purchasing: false,
    });
    
    const dispatch = useDispatch();
    
    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients
    });
    const price = useSelector(state => {
        return state.burgerBuilder.totalPrice
    });
    const error = useSelector(state => {
        return state.burgerBuilder.error
    });
    const isAuthenticated = useSelector(state => {
        return state.auth.token !== null
    });

    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const updatePurchaseState = (ingridientsCopy) => {
        const sum = Object.values(ingridientsCopy)
            .reduce((prevValue, nextValue) => {
                return prevValue + nextValue
            }, 0); 

        return sum > 0
    }

    const purchaseHandler = () => {
        if(isAuthenticated) {
            setState(currentState => ({ 
                ...currentState,
                purchasing: true
            }))
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    };

    const purchaseCancelHandler = () => {     
        setState(currentState => ({
            ...currentState,
            purchasing: false,
        }))
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    };
 

    const disabledInfo = {
        ...ings
    };
    for(let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;
    let orderSummary = null;
    if(ings) {
        burger = (
            <>
                <Burger ingridients={ings}/>
                <BuildControls  ingridientAdded={onIngredientAdded}
                                ingridientRemoved={onIngredientRemoved}
                                disabled={disabledInfo}
                                price={price}
                                isAuth={isAuthenticated}
                                purchasable={updatePurchaseState(ings)}
                                purchaseHandler={purchaseHandler}/>
            </>
        ) 
        orderSummary = <OrderSummary ingridients={ings}
                            price={price}
                            purchaseCancel={purchaseCancelHandler}
                            purchaseContinue={purchaseContinueHandler}/>;
    }
  
    return (
        <>  
            <Modal show={purchasing} modalClosed={purchaseCancelHandler} >
                {orderSummary}
            </Modal>
            {burger}

        </>
    )   
}


export default withErrorHandler(BurgerBuilder, axios)