import React from 'react';
import classes from './Burger.module.css'
import BurgerIngridients from './BurgerIngridients/BurgerIngridients'

const Burger = (props) => {

    let transIngridients = Object.keys(props.ingridients)
        .map(igKey => {
            return [...Array(props.ingridients[igKey])].map((_, i) => {
                return <BurgerIngridients key={igKey + i} type={igKey} />
            });
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
       
       if(transIngridients.length === 0) {
           transIngridients = <p> Please start adding ingridients!</p>
       }

    return (
        <div className={classes.Burger}>
            <BurgerIngridients type="bread-top"/>
            {transIngridients}
            <BurgerIngridients type="bread-bottom"/>
        </div>
    )
}

export default Burger