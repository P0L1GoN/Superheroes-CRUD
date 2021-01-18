import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalWindow.module.sass'
const ModalWindow = (props) => {
    return (
        <div style={props.isVisible?{visibility:'visible'}:{visibility:'hidden'}}>
            <div className={styles.background}>
            </div>
            <div className={styles.modalWindow}>
                {props.children}
            </div>
        </div>
    );
};

ModalWindow.propTypes = {
    children: PropTypes.any,
    isVisible: PropTypes.bool
};

export default ModalWindow;