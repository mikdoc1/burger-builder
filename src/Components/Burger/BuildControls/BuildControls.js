import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
     { label: 'Salad', type: 'salad'},
     { label: 'Bacon', type: 'bacon'},
     { label: 'Cheese', type: 'cheese'},
     { label: 'Meat', type: 'meat'}
]

const BuildControls = (props) => {

     return (
          <div className={classes.BuildControls}>
               <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
               {controls.map(item  => {
               return <BuildControl     label={item.label}
                                        key={item.label}
                                        added={props.ingridientAdded.bind(null, item.type)}
                                        removed={props.ingridientRemoved.bind(null, item.type)}
                                        disabled={props.disabled[item.type]}/>
               })}
               <button className={classes.OrderButton} 
                         onClick={props.purchaseHandler} 
                         disabled={!props.purchasable}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
          </div>
     )
}

export default BuildControls