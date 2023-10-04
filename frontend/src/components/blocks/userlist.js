import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

let show_users = false  
const UserData = () => {
    const [users, setSidebar] = useState([]) 
    const [admins, setAdmins] = useState([]) 
    useEffect(()=>{
        getUsers()
    },[])

    const filterArray1 = (arr1, arr2) => {
        const filteredArray1 = arr1.filter(item1 => {
          // Check if item1.id is not present in any item in array2
          return !arr2.some(item2 => item2._id === item1._id);
        });
      
        return filteredArray1;
    };
    const getUsers = async () =>{
        let users = await fetch('http://localhost:5000/users', {
            headers:{
                'authorization':"bearer: "+localStorage.getItem('token')
            }
        }).catch(err =>{})
        if(users){
            users = await users.json()
            const admins = users.admin
            const uniqueadmins = Array.from(new Set(admins.map(obj => obj._id)))
            .map(id => {
                return admins.find(obj => obj._id === id);
            });
            setAdmins(uniqueadmins)
            
            const users2 = filterArray1(users.users, users.admin);
            if(users2){
                setSidebar(users2)    
                show_users = true    
            }
        }
    }   
    if(show_users)
    return (
        <aside className="aside-right">  
            <div className="recent-users">
                <h2>Users</h2>
                <ul className="users-ul">
                    {
                        users.map((item,index)=><li key={item._id}><Link to={`/profile/${item._id}`}>{item.name}</Link></li>)  
                    }
                </ul>
            </div>
            <div className="recent-users">
                <h2>Admin</h2>
                <ul className="users-ul">
                    {
                        admins.map((item,index)=><li key={item._id}><Link to={`/profile/${item._id}`}>{item.name}</Link></li>)  
                    }
                </ul>
            </div>
        </aside>
            
    )
    else return (<></>)
}

export default UserData