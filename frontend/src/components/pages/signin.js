import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Signin  = () =>{
    const navigate = useNavigate()
    useEffect(()=>{
        const auth = localStorage.getItem("user")
        if(auth) navigate('/')
    },[])
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const login = async() =>{
        let data = await fetch('http://localhost:5000/signin',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        data = await data.json()
        if(data.user && data.auth){
            localStorage.setItem("user",JSON.stringify(data.user))
            localStorage.setItem("token",data.auth)
            navigate('/profile')
        }
        else if(data.error){
            alert(data.error)
        }
    }
    return(
        <div className="signin-form">
            <h1>Sign In</h1>
            <input className="inputBox" type="email" placeholder="Enter email" 
            value={email} onChange={(e)=>setEmail(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="Enter password" 
            value={password} onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={login} className="appButton" type="button">Sign In</button>
            <Link to="/register"><p>Not having an account?</p></Link>
        </div>
    )
}

export default Signin