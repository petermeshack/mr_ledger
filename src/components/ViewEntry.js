import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import Navs from "./Navs";
import { useNavigate } from "react-router-dom";
import M from "materialize-css"; // Import Materialize

const ViewEntry = () => {
    const navigate = useNavigate();

    let [Ledger_dataArray, setLedger_dataArray] = useState([]);

    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "Mr_ledger/ledgers");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const myData = snapshot.val();
            const temporaryArray = Object.keys(myData).map((myFirebaseID) => {
                return {
                    ...myData[myFirebaseID],
                    entryId: myFirebaseID
                };
            });

            setLedger_dataArray(temporaryArray);
        } else {
            M.toast({ html: "Error fetching data", classes: "red" });
            console.log("Error fetching data");
        }
    };

    const deleteEntry = async (entryIdParam) => {
        const db = getDatabase(app);
        const dbRef = ref(db, "Mr_ledger/ledgers/" + entryIdParam);
        await remove(dbRef);
        M.toast({ html: "Entry deleted successfully", classes: "green" });
        fetchData();  // Refresh the table after deletion
    };

    return (
        <div>
            <Navs />
            <div className="container" style={{ paddingTop: "20px" }}>
                <h3 className="center-align">View Ledger Entries</h3>
                
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
                            <th colSpan={2}>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Ledger_dataArray.map((item, index) => (
                            <tr key={index}>
                                <td>{item.ledger_name}</td>
                                <td>{item.entry_name}</td>
                                <td>{item.date}</td>
                                <td>{item.amount}</td>
                                <td>
                                    <button
                                        className="btn waves-effect waves-light orange"
                                        onClick={() => navigate(`/update-entry/${item.entryId}`)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn waves-effect waves-light red"
                                        onClick={() => deleteEntry(item.entryId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewEntry;
