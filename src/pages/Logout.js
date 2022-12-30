import React from "react";
import Navbar from "../components/Navbar/index";


const Logout = () => {
    localStorage.clear();
    return (
        <React.Fragment>
            <Navbar />
        </React.Fragment>
    );
}

export default Logout;