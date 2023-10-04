import React, { useEffect, useState } from "react";
import UserData from "../blocks/userlist";

const Contact = () => {
    return (
        <div className="contact-wrapper">
            <UserData />
            <h1>Contact Component</h1>
        </div>
    )
}

export default Contact;