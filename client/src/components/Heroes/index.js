import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import styles from './Heroes.module.sass'
import HeroPages from '../HeroPages'
import ModalWindow from '../ModalWindow'

const http = axios.create({
    baseURL: 'http://localhost:3001',
    responseType: "json",
    timeout: 10000,
})
//функция получения списка героев
const getHeroes= async()=>{
    return new Promise((resolve,reject)=>{
        http.get(`/heroes`)
        .then(res=>{
            resolve(res.data)
        })
        .catch(error=>{
            console.error(error)
            reject(null)
        })
    })
}
const addHero=async(heroData)=>{
    return new Promise((resolve,reject)=>{
        http.post(`/heroes`,heroData)
        .then(res=>{
            resolve(res.data)
        })
        .catch(error=>{
            console.error(error)
            reject(null)
        })
    })
}
const Heroes = () => {
    const [heroList,setHeroList]=useState([])
    const [isHeroAdd,setIsHeroAdd]=useState(false)
    useEffect(()=>{
        getHeroes().then((res)=>{
            if(res!==null)
                setHeroList(res)
            console.log(res)
        })
    },[])
    return (
        <div className={styles.mainContainer}>
            <div className={styles.heroesContainer}>
                <div className={styles.createHero}>
                    <div className={styles.buttonCreateHero} onClick={()=>setIsHeroAdd(true)}>
                        Добавить Героя
                    </div>
                    <ModalWindow isVisible={isHeroAdd}>
                        <div className={styles.addHeroContainer}>
                            <input type="text"/>
                            <input type="text"/>
                            <textarea name="description" rows='4'></textarea>
                            <textarea name="superpowers" rows='4'></textarea>
                            <textarea name="phrase" rows='4'></textarea>
                            <div className={styles.buttonsAddHero}>
                                <div className={styles.closeButton} onClick={()=>setIsHeroAdd(false)}>Отмена</div>
                                <div className={styles.acceptButton}>Принять</div>
                            </div>
                        </div>
                    </ModalWindow>
                </div>
                <div className={styles.heroPages}>
                    <HeroPages></HeroPages>
                </div>
            </div>
        </div>
    );
};

Heroes.propTypes = {};

export default Heroes;