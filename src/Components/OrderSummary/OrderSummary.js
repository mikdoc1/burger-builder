import React from 'react';
import Button from '../UI/Button/Button'


const OrderSummary = (props) => {


    const ingridientsSummary = Object.keys(props.ingridients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={ {textTransform: 'capitalize'} }>{igKey}</span>:{props.ingridients[igKey]}
                    </li>
                )
            })

    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingridients:</p>
            <ul>
                {ingridientsSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>

        </>
    )
}

export default OrderSummary