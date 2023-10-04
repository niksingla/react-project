import React, { useEffect, useState } from "react";
import UserData from "../blocks/userlist";

const About = () => {
    return (
        <div className="about-wrapper">
            <UserData />
            <h1>About Component</h1>
        </div>
    )
}

export default About;