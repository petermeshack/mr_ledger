import React, { useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";
import Navs from "./Navs";
import M from "materialize-css"; // For toast notifications
import { useParams } from "react-router-dom";

const UpdateEntries = () => {
    const { myFirebaseID } = useParams();

    let [inputLedgerName_data, setinputLedgerName_data] = useState("");
    let [inputEntryName_data, setinputEntryName_data] = useState("");
    let [inputDate_data, setInputDate_data] = useState("");
    let [inputAmount_data, setInputAmount_data] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "Mr_ledger/ledgers/" + myFirebaseID);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const targetObject = snapshot.val();
                setinputLedgerName_data(targetObject.ledger_name);
                setinputEntryName_data(targetObject.entry_name);
                setInputDate_data(targetObject.date);
                setInputAmount_data(targetObject.amount);
            } else {
                M.toast({ html: "Error fetching data!", classes: "red" });
                console.log("Error fetching data");
            }
        };
        fetchData();
    }, [myFirebaseID]);

    const overwriteData = async () => {
        // Input validation
        if (
            !inputLedgerName_data ||
            !inputEntryName_data ||
            !inputDate_data ||
            !inputAmount_data
        ) {
            M.toast({ html: "Please fill all fields!", classes: "red" });
            return;
        }

        const db = getDatabase(app);
        const newDocRef = ref(db, "Mr_ledger/ledgers/" + myFirebaseID);
        set(newDocRef, {
            ledger_name: inputLedgerName_data,
            entry_name: inputEntryName_data,
            date: inputDate_data,
            amount: inputAmount_data
        })
            .then(() => {
                M.toast({ html: "Ledger information updated successfully!", classes: "green" });
                console.log("Ledger information updated successfully!");
            })
            .catch(() => {
                M.toast({ html: "Ledger information was not updated!", classes: "red" });
                console.log("Ledger information was not updated!");
            });
    };

    return (
        <div>
            <Navs />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "inherit",
                    color: "white",
                }}
            >
                <div
                    style={{
                        width: "500px",
                        padding: "20px",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h3 style={{ textAlign: "center", marginBottom: "20px", color: "black" }}>
                        Edit Entry
                    </h3>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "black" }}>Ledger Name:</label>
                        <input
                            type="text"
                            value={inputLedgerName_data}
                            onChange={(e) => setinputLedgerName_data(e.target.value)}
                            style={{
                                width: "90%",
                                padding: "10px",
                                marginTop: "5px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "black" }}>Entry Name:</label>
                        <input
                            type="text"
                            value={inputEntryName_data}
                            onChange={(e) => setinputEntryName_data(e.target.value)}
                            style={{
                                width: "90%",
                                padding: "10px",
                                marginTop: "5px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "black" }}>Date:</label>
                        <input
                            type="date"
                            value={inputDate_data}
                            onChange={(e) => setInputDate_data(e.target.value)}
                            style={{
                                width: "90%",
                                padding: "10px",
                                marginTop: "5px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "black" }}>Amount:</label>
                        <input
                            type="number"
                            value={inputAmount_data}
                            onChange={(e) => setInputAmount_data(e.target.value)}
                            style={{
                                width: "90%",
                                padding: "10px",
                                marginTop: "5px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <button
                        onClick={overwriteData}
                        style={{
                            width: "90%",
                            padding: "10px",
                            backgroundColor: "#007bff",
                            color: "white",
                            fontWeight: "bold",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Update Entry
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateEntries;
