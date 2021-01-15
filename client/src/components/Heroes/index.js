import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
const http = axios.create({
    baseURL: 'http://localhost:3001',
    responseType: "json",
    timeout: 10000,
})
const Heroes = () => {
useEffect(()=>{
    http.get(`/heroes`)
    .then(res=>{
        console.log(res.data)
    })
    .catch(error=>{
        console.log(error)
    })
},[])
    return (
        <div>
            
        </div>
    );
};

Heroes.propTypes = {};

export default Heroes;