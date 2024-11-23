import React from "react";
import Navs from "./Navs";
import M from "materialize-css"; // Import Materialize

const EULA = () => {
    return (
        <>
        <Navs />
        <div className="container">

            <h2 className="center-align teal-text">End-User License Agreement (EULA)</h2>
            <p className="flow-text center-align">
                This End-User License Agreement (EULA) is a legal agreement between you (the user) and Ouma Peter Meshack (the developer) for the use of MR LEDGER.
            </p>

            <div className="section">
                {/* Card for License Grant */}
                <div className="card">
                    <div className="card-content">
                        <span className="card-title teal-text">1. License Grant</span>
                        <p className="flow-text black-text">
                            You are granted a non-exclusive, non-transferable, and limited license to install and use MR LEDGER. The terms of use are as follows:
                        </p>
                        <ul className="browser-default flow-text black-text">
                            <li>Free for non-business, personal use.</li>
                            <li>If used for business purposes, you are encouraged to donate a reasonable amount to support ongoing development.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="section">
                {/* Card for Restrictions */}
                <div className="card">
                    <div className="card-content">
                        <span className="card-title teal-text">2. Restrictions</span>
                        <p className="flow-text black-text">
                            You may not:
                            <ul className="browser-default">
                                <li>Distribute, sell, rent, lease, or sublicense MR LEDGER.</li>
                                <li>Modify, decompile, reverse engineer, disassemble, or create derivative works based on the software.</li>
                                <li>Use MR LEDGER for any illegal purposes or to violate any local, state, or international laws.</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>

            <div className="section">
                {/* Card for Ownership */}
                <div className="card">
                    <div className="card-content">
                        <span className="card-title teal-text">3. Ownership</span>
                        <p className="flow-text black-text">
                            MR LEDGER is protected by copyright laws and international copyright treaties, as well as other intellectual property laws and treaties. The software is licensed, not sold, to you.
                        </p>
                    </div>
                </div>
            </div>

            <div className="section">
                {/* Card for Termination */}
                <div className="card">
                    <div className="card-content">
                        <span className="card-title teal-text">4. Termination</span>
                        <p className="flow-text black-text">
                            This license will terminate automatically without notice if you fail to comply with any of the terms and conditions of this EULA. Upon termination, you must destroy all copies of MR LEDGER.
                        </p>
                    </div>
                </div>
            </div>

            <div className="section">
                {/* Card for Limitation of Liability */}
                <div className="card">
                    <div className="card-content">
                        <span className="card-title teal-text">5. Limitation of Liability</span>
                        <p className="flow-text black-text">
                            In no event shall the developer or any affiliates be liable for any indirect, incidental, special, or consequential damages arising from the use of MR LEDGER.
                        </p>
                    </div>
                </div>
            </div>

            <div className="section">
                {/* Card for Support and Updates */}
                <div className="card ">
                    <div className="card-content">
                        <span className="card-title teal-text">6. Support and Updates</span>
                        <p className="flow-text black-text">
                            We may provide updates to MR LEDGER, but we are under no obligation to do so. Any support or updates will be provided at our discretion.
                        </p>
                    </div>
                </div>
            </div>

            <div className="section">
                {/* Card for Acceptance */}
                <div className="card">
                    <div className="card-content">
                        <span className="card-title teal-text">7. Acceptance</span>
                        <p className="flow-text black-text">
                            By installing and using MR LEDGER, you agree to be bound by the terms and conditions of this EULA.
                        </p>
                    </div>
                </div>
            </div>

            <div className="section">
                {/* Card for Contact */}
                <div className="card">
                    <div className="card-content">
                        <p className="flow-text black-text">
                            For queries or further information, contact:{" "} GMAIL:
                            <a href="mailto:petermeshack@gmail.com" className="teal-text">
                                petermeshack@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default EULA;
