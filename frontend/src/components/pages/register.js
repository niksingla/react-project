import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Register  = () =>{
    const navigate = useNavigate()
    useEffect(()=>{
        const auth = localStorage.getItem("user")
        if(auth) navigate('/')
    },[])
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    
    const collectData = async() =>{
        let data = await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        let result = await data.json()
        if(result.error){
            alert(result.error)
        }
        if(result.user && result.auth){
            localStorage.setItem("user",JSON.stringify(result.user))
            localStorage.setItem("token",result.auth)
            navigate('/profile')
        }        
    }
    return(
        <div className="register-form">
            <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter name" 
            value={name} onChange={(e)=>setName(e.target.value)}
            />
            <input className="inputBox" type="email" placeholder="Enter email" 
            value={email} onChange={(e)=>setEmail(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="Enter password" 
            value={password} onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={collectData} className="appButton" type="button">Sign In</button>
            <Link to="/signin"><p>Already having an account?</p></Link>
        </div>
    )
}

export default Register