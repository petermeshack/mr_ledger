import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import Navs from "./Navs";
import M from "materialize-css"; // Import Materialize

const Ledger = () => {
    let [Ledger_dataArray, setLedger_dataArray] = useState([]);

    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "Mr_ledger/ledgers");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            setLedger_dataArray(Object.values(snapshot.val()));
        } else {
            M.toast({ html: "Error fetching data", classes: "red" });
            console.log("Error fetching data");
        }
    };

    return (
        <div>
            <Navs />
            <div className="container" style={{ paddingTop: "20px" }}>
                <h3 className="center-align">Ledger</h3>
                
                <div className="center-align">
                    <button
                        onClick={fetchData}
                        className="btn waves-effect waves-light blue darken-2"
                        style={{ marginBottom: "20px" }}
                    >
                        Fetch Entries
                    </button>
                </div>
                
                <table className="highlight responsive-table centered">
                    <thead>
                        <tr>
                            <th>Ledger Name</th>
                            <th>Entry Name</th>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Ledger_dataArray.map((item, index) => (
                            <tr key={index}>
                                <td>{item.ledger_name}</td>
                                <td>{item.entry_name}</td>
                                <td>{item.date}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ledger;
