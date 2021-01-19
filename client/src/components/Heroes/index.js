import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import styles from './Heroes.module.sass'
import HeroPages from '../HeroPages'
import ModalWindow from '../ModalWindow'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ImageUploading from "react-images-uploading"

const http = axios.create({
    baseURL: 'http://localhost:3001',
    responseType: "json",
    timeout: 10000,
})
//функция получения списка героев


const Heroes = () => {
    const [heroList,setHeroList]=useState([])
    const [isHeroAdd,setIsHeroAdd]=useState(false)
    const [isImagesAdd,setIsImagesAdd]=useState(false)
    const [isAddReady,setIsAddReady]=useState(false)
    const [nickname,setNickname]=useState('')
    const [realName,setRealName]=useState('')
    const [originDescription,setOriginDescription]=useState('')
    const [superpowers,setSuperpowers]=useState('')
    const [catchPhrase,setCatchPhrase]=useState('')
    const [heroImageArray,setHeroImageArray]=useState([])
    useEffect(()=>{
        getHeroes()
    },[])
    const getHeroes= ()=>{
        http.get(`/heroes`)
        .then(res=>{
            setHeroList(res.data)
            console.log(res.data)
        })
        .catch(error=>{
            console.error(error)
        })
    }
    const clearInputs=()=>{
        setNickname('')
        setRealName('')
        setOriginDescription('')
        setSuperpowers('')
        setCatchPhrase('')
        setHeroImageArray([])
        setIsHeroAdd(false)
        setIsImagesAdd(false)
    }
    const createHero=()=>{
        return new Promise((resolve,reject)=>{
            http.post(`/heroes/create`,{
                "nickname": nickname,
                "realName": realName,
                "originDescription": originDescription,
                "superpowers": superpowers,
                "catchPhrase": catchPhrase,
                "imageArray": heroImageArray
            })
            .then(res=>{
                resolve(res.data)
                setIsAddReady(true)
                clearInputs()
            })
            .catch(error=>{
                console.error(error)
                reject(error)
            })
        })
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.heroesContainer}>
                <div className={styles.createHero}>
                    <div className={styles.buttonCreateHero} onClick={()=>setIsHeroAdd(true)}>
                        Добавить Героя
                    </div>
                    <ModalWindow isVisible={isHeroAdd}>
                        <div className={styles.addHeroContainer}>
                            <div className={styles.inputArea}>
                                <span>Прозвище</span>
                                <input type="text" value={nickname} onChange={(event)=>setNickname(event.target.value)}/>
                            </div>
                            <div className={styles.inputArea}>
                                <span>Настоящее имя</span>
                                <input type="text" value={realName} onChange={(event)=>setRealName(event.target.value)}/>
                            </div>
                            <div className={styles.inputArea}>
                                <span>Описание происхождения</span>
                                <textarea name="description" rows='4' value={originDescription} onChange={(event)=>setOriginDescription(event.target.value)}></textarea>
                            </div>
                            <div className={styles.inputArea}>
                                <span>Суперсилы</span>
                                <textarea name="superpowers" rows='4' value={superpowers} onChange={(event)=>setSuperpowers(event.target.value)}></textarea>
                            </div>
                            <div className={styles.inputArea}>
                                <span>Крылатая фраза</span>
                                <textarea name="phrase" rows='4' value={catchPhrase} onChange={(event)=>setCatchPhrase(event.target.value)}></textarea>
                            </div>
                        </div>
                        <div className={styles.buttonsAddHero}>
                            <div className={styles.closeButton} onClick={()=>clearInputs()}>Отмена</div>
                            <div className={styles.acceptButton} onClick={()=>{
                                setIsHeroAdd(false)
                                setIsImagesAdd(true)
                            }}>Далее</div>
                        </div>
                    </ModalWindow>
                    <ModalWindow isVisible={isImagesAdd}>
                        <div className={styles.addHeroContainer}>
                            <ImageUploading
                                multiple
                                value={heroImageArray}
                                onChange={(imageList,index) => setHeroImageArray(imageList)}
                                dataURLKey="dataUrl"
                            >
                                {({onImageUpload, isDragging, dragProps}) => (
                                    <div className={styles.addImageButton+' '+ styles.imageBlock}
                                        style={isDragging ? {backgroundColor:"lightgreen"} : {backgroundColor:""}}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        <span>Добавить картинку</span>
                                        <FontAwesomeIcon icon={faPlusCircle} style={{color: 'white', fontSize: '4em'}}/>
                                    </div>
                                )}
                            </ImageUploading>
                            {
                                heroImageArray.map(el=>{
                                    return(
                                        <div className={styles.imageBlock}>
                                            <img src={el.dataUrl} alt="картинка"/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.buttonsAddHero}>
                            <div className={styles.closeButton} onClick={()=>clearInputs()}>Отмена</div>
                            <div className={styles.acceptButton} onClick={()=>createHero()}>Готово</div>
                        </div>
                    </ModalWindow>
                    <ModalWindow isVisible={isAddReady}>
                            <span>Герой успешно добавился</span>
                            <div className={styles.buttonsAddHero}>
                                <div className={styles.acceptButton} onClick={()=>setIsAddReady(false)}>Ок</div>
                            </div>
                    </ModalWindow>
                </div>
                <HeroPages heroes={heroList}/>
            </div>
        </div>
    );
};

Heroes.propTypes = {};

export default Heroes;