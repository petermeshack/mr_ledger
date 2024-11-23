/*import { useNavigate } from "react-router-dom";

const Navs =() =>{
    const navigate = useNavigate();
    return(
        
        <div>
            <div>
                <button className="button1" onClick={()=>navigate("/")}>Dashboard</button>|
                <button className="button1" onClick={()=>navigate("/add-entry")}>Entry</button>|
                <button className="button1" onClick={()=>navigate("/ledger")}>Ledger</button>|
                <button className="button1" onClick={()=>navigate("/view-entry")}>View Entries</button>|
                <button className="button1" onClick={()=>navigate("/report")}>Report</button>|
                <button className="button1" onClick={()=>navigate("/version")}>Version</button><br/>

            </div>
            {            
            console.log("Navs")
            }
        </div>
    );
};
export default Navs;
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import M from "materialize-css";

const Navs = () => {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const elems = document.querySelectorAll(".carousel");
        M.Carousel.init(elems, { fullWidth: true, indicators: true });
    }, []);

    // Toggle between light and dark mode
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={isDarkMode ? "dark-mode" : "light-mode"}>
            {/* Navigation Bar */}
            <nav className="nav-extended">
                <div className={`nav-wrapper ${isDarkMode ? "grey darken-4 white-text" : "grey lighten-1 black-text"}`}>
                    <ul className="right ">
                        <li>
                            <button className="button-link" onClick={() => navigate("/")}>
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button className="button-link" onClick={() => navigate("/add-entry")}>
                                Entry
                            </button>
                        </li>
                        <li>
                            <button className="button-link" onClick={() => navigate("/ledger")}>
                                Ledger
                            </button>
                        </li>
                        <li>
                            <button className="button-link" onClick={() => navigate("/view-entry")}>
                                View Entries
                            </button>
                        </li>
                        <li>
                            <button className="button-link" onClick={() => navigate("/report")}>
                                Report
                            </button>
                        </li>
                        <li>
                            <button className="button-link" onClick={() => navigate("/version")}>
                                Version
                            </button>
                        </li>
                        <li>
                            <button className="button-link" onClick={toggleTheme}>
                                {isDarkMode ? "Light Mode" : "Dark Mode"}
                            </button>
                        </li>
                    </ul>
                </div>

                <div className={`nav-content ${isDarkMode ? "grey darken-4 white-text" : "grey darken-3 white-text"}`}>
                    <span className="nav-title">MR LEDGER</span>
                </div>
            </nav>
        </div>
    );
};

export default Navs;
