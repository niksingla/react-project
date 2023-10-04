import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserData from "../blocks/userlist";


const Home = () => {
    return (
        <div className="homepage">
            <UserData />
            <h1>Home Component</h1>
        </div>
    )
}

export default Home;