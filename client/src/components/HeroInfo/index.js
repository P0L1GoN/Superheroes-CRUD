import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './HeroInfo.module.sass'
const HeroInfo = (props) => {
    return (
        <div className={styles.heroInfo}>
            <h1>{props.hero.nickname}</h1>
            <span>{props.hero.realName}</span>
            <h2>Крылатая фраза:</h2>
            <p>"{props.hero.catchPhrase}"</p>
            <h2>Суперсилы:</h2>
            <p>{props.hero.superpowers}</p>
            <h2>Происхождение</h2>
            <p>{props.hero.originDescription}</p>
            <div className={styles.heroImages}>
            {props.hero.imageArray.map((image,index)=>{
                    return(
                        <div className={styles.imageBlock} key={index}>
                            <img src={image} alt=""/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

HeroInfo.propTypes = {
    hero: PropTypes.object
};

export default HeroInfo;