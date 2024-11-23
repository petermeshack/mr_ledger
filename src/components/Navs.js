import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link here
import M from "materialize-css";

const Navs = () => {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        // Initialize MaterializeCSS sidenav
        const sidenavElems = document.querySelectorAll(".sidenav");
        M.Sidenav.init(sidenavElems, { edge: "left" });
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
                    {/* Sidenav Trigger */}
                    <a
                        href="#"
                        data-target="mobile-menu"
                        className="sidenav-trigger hide-on-large-only left"
                    >
                        <i className="material-icons">menu</i>
                    </a>

                    {/* Desktop Navigation */}
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <button
                                className="btn-flat white-text"
                                onClick={() => navigate("/")}
                            >
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn-flat white-text"
                                onClick={() => navigate("/add-entry")}
                            >
                                Entry
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn-flat white-text"
                                onClick={() => navigate("/ledger")}
                            >
                                Ledger
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn-flat white-text"
                                onClick={() => navigate("/view-entry")}
                            >
                                View Entries
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn-flat white-text"
                                onClick={() => navigate("/report")}
                            >
                                Report
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn-flat white-text"
                                onClick={() => navigate("/version")}
                            >
                                Version
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn-flat white-text"
                                onClick={toggleTheme}
                            >
                                {isDarkMode ? "Light Mode" : "Dark Mode"}
                            </button>
                        </li>
                    </ul>
                </div>

                <div className={`nav-content ${isDarkMode ? "grey darken-4 white-text" : "grey darken-3 white-text"}`}>
                    <span className="nav-title">MR LEDGER</span>
                </div>
            </nav>

            {/* Sidenav for Mobile */}
            <ul className="sidenav"  id="mobile-menu">
                <li>
                    <Link to="/" onClick={() => navigate("/")}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/add-entry" onClick={() => navigate("/add-entry")}>
                        Entry
                    </Link>
                </li>
                <li>
                    <Link to="/ledger" onClick={() => navigate("/ledger")}>
                        Ledger
                    </Link>
                </li>
                <li>
                    <Link to="/view-entry" onClick={() => navigate("/view-entry")}>
                        View Entries
                    </Link>
                </li>
                <li>
                    <Link to="/report" onClick={() => navigate("/report")}>
                        Report
                    </Link>
                </li>
                <li>
                    <Link to="/version" onClick={() => navigate("/version")}>
                        Version
                    </Link>
                </li>
                <li>
                    <Link to="#" onClick={toggleTheme}>
                        {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navs;
