import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './HeroPages.module.sass'
import HeroInfo from '../HeroInfo'
const HeroPages = (props) => {
    const [heroBeautyArray,setHeroBeautyArray]=useState([])
    const [activePage,setActivePage]=useState()
    useEffect(()=>{
        let pageArray=[],
        heroesArray=[]
        console.log(props.heroes)
        if(props.heroes!==[]){
            props.heroes.map((hero,index)=>{
                pageArray.push(hero)
                if(pageArray.length==5 || (index+1)==props.heroes.length){
                    heroesArray.push(pageArray)
                    pageArray=[]    
                }
            })
            setHeroBeautyArray(heroesArray)
            setActivePage(0)
        }
    },[props.heroes])
    return (
        <div className={styles.heroPages}>
            <div className={styles.heroList}>
                {heroBeautyArray[0] && heroBeautyArray[activePage].map((hero,index)=>{
                    return(
                        <div className={styles.hero} key={index} onClick={()=>{
                            props.setActiveHero(hero)
                        }}>
                            {hero.imageArray[0]?
                            (<>
                            <img src={hero.imageArray[0]} alt="Изображение героя"/>
                            <div className={styles.heroName}>{hero.nickname}</div>
                            </>):
                            (<span>Изображение отсутствует</span>)}
                        </div>
                    )
                })}
            </div>
            <div className={styles.numberButtons}>
                {heroBeautyArray.length>=2 && heroBeautyArray.map((hero,index)=>{
                    return(
                        <div className={activePage==index?styles.pageButton + ' ' + styles.activePageButton:styles.pageButton} 
                        key={index} onClick={()=>setActivePage(index)}>{index+1}</div>
                    )
                })
                }
            </div>
            {props.activeHero != null &&
                <HeroInfo hero={props.activeHero}/>
            }
            
        </div>
    );
};

HeroPages.propTypes = {
    heroes: PropTypes.array,
    setActiveHero: PropTypes.func,
    activeHero: PropTypes.object
};

export default HeroPages;