import React from 'react';
import PropTypes from 'prop-types';
import styles from './HeroPages.module.sass'
const HeroPages = (props) => {
    return (
        <div className={styles.heroPages}>
            {props.heroes.map(hero=>{
                //code
            })}
        </div>
    );
};

HeroPages.propTypes = {
    heroes: PropTypes.array
};

export default HeroPages;