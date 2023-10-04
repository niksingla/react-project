import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserData from "../blocks/userlist";

const Profile = () => {
    const navigate = useNavigate()
    return(
        <div className="profile-wrapper">
            <UserData />
            <h1>Profile Component</h1>
        </div>
    )
}

export default Profile