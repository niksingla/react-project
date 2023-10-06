import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserData from "../blocks/userlist";


const Profile  = () =>{
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(()=>{
        const auth = localStorage.getItem("user")
        if(!auth) navigate('/signin')
        getUserDetails()
    },[])
    const getUserDetails = async () =>{
        const localuser = JSON.parse(localStorage.getItem('user'))
        let id = params.id ? params.id:localuser._id
        console.log(localuser._id)
        const user = await fetch(`http://localhost:5000/users/${id}`,{
            headers:{
                authorization:`bearer: ${localStorage.getItem("token")}`
            }
        })
        if(user.status === 200){
            let userDetails = await user.json()
            
            let displayDetails = {...userDetails}
            delete displayDetails._id

            setName(userDetails.name)
            setEmail(userDetails.email)
        }
    }
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password1,setPassword1] = useState("")
    const [password2,setPassword2] = useState("")
    
    const updateData = async() =>{
        // console.log(JSON.stringify({name,email,password1,password2,_id:params.id}))
        // return
        let data = await fetch('http://localhost:5000/update',{
            method:'put',
            body:JSON.stringify({name,email,password1,password2,_id:params.id}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer: ${localStorage.getItem("token")}`
            }
        })
        let result = await data.json()
        console.log(result)
        return
        if(result.error){
            alert(result.error)
        }
        else if(result._id){
            alert("profile updated succesfully")
        }
             
    }
    return(
        <div className="profile-page-wrapper">
            <UserData />
            <h1>Profile Information</h1>
            <input className="inputBox" type="text" placeholder="Enter name" 
            value={name} onChange={(e)=>setName(e.target.value)}
            />
            <input className="inputBox" type="email" placeholder="Enter email" 
            value={email} onChange={(e)=>setEmail(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="Enter old password" 
            value={password1} onChange={(e)=>setPassword1(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="Enter new password" 
            value={password2} onChange={(e)=>setPassword2(e.target.value)}
            />
            <button onClick={updateData} className="appButton" type="button">Update</button>
        </div>
    )
}

export default Profile