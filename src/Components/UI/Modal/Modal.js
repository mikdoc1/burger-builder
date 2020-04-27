import React from 'react';
import classes from './Modal.module.css'
import BackDrop from '../BackDrop/BackDrop'

const Modal = (props) => {

    return (
        <>
        <BackDrop show={props.show} click={props.modalClosed}/>
        <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
            {props.children}
        </div>
        </>
    )
}
const shouldUpdate = (prev, next) => {   
    return prev.show === next.show && prev.modalClosed === next.modalClosed
}

export default React.memo(Modal, shouldUpdate)
