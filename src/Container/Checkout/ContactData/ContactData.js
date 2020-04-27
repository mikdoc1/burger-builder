import React, { useState } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../Components/UI/Spinner/Spinner'; 
import axios from '../../../axios-order';
import Input from '../../../Components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'
import withErrorHandler from '../../../withErrorHandler/withErrorHandler';
import { updateObject } from '../../../shared/utility';
import { checkValidity } from '../../../shared/utility';

const ContactData = (props) => {
    const [state, setState] = useState({
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },        
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            },
        },
        formIsvalid: false
    })


    const orderHandler = (e) => {

        e.preventDefault();

        const formData = {};
        for (let formElementId in state.orderForm) {
            formData[formElementId] = state.orderForm[formElementId].value
        }  

        const order = {
            ingridients: {...props.ings},
            price: props.price,
            orderData: formData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token)
    }

    const formElementsArray = [];
    for (let key in state.orderForm) {
        formElementsArray.push({
            id: key,
            config: state.orderForm[key]
        });
    }



    const inputChangedHandler = (inputID, e) => {

         let updatedFormElement = updateObject(state.orderForm[inputID], {
            value: e.target.value,
            valid: checkValidity(e.target.value, state.orderForm[inputID].validation),
            touched: true
         });
         let updatedOrderForm = updateObject(state.orderForm, {
            [inputID]: updatedFormElement,
         });


         let formIsvalid = true;
         for(let inputID in updatedOrderForm) {
             formIsvalid = updatedOrderForm[inputID].valid && formIsvalid
         }

         setState(prevState => ({
             ...prevState,
             orderForm: updatedOrderForm,
             formIsvalid
         }))
    }

    let form = (
        
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}

                    changed={inputChangedHandler.bind(null, formElement.id)}/>
            ))}
            <Button clicked={orderHandler} disabled={!state.formIsvalid}btnType="Success">ORDER</Button>
        </form>
    )
    if(props.loading) {
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));