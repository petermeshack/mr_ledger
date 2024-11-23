import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import Navs from "./Navs";
import M from "materialize-css";

const AddEntry = () => {
    const [inputLedgerName_data, setInputLedgerName_data] = useState("");
    const [inputEntryName_data, setInputEntryName_data] = useState("");
    const [inputDate_data, setInputDate_data] = useState("");
    const [inputAmount_data, setInputAmount_data] = useState("");

    const saveData = async () => {
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
        const newDocRef = push(ref(db, "Mr_ledger/ledgers"));

        try {
            await set(newDocRef, {
                ledger_name: inputLedgerName_data,
                entry_name: inputEntryName_data,
                date: inputDate_data,
                amount: inputAmount_data,
            });

            M.toast({
                html: "Ledger information saved successfully!",
                classes: "green",
            });

            // Clear inputs on success
            setInputLedgerName_data("");
            setInputEntryName_data("");
            setInputDate_data("");
            setInputAmount_data("");
        } catch (error) {
            M.toast({
                html: "Failed to save ledger information!",
                classes: "red",
            });
        }
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
                    color:"white",
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
                        Add Entry
                    </h3>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "black" }}>Ledger Name:</label>
                        <input
                            type="text"
                            value={inputLedgerName_data}
                            onChange={(e) => setInputLedgerName_data(e.target.value)}
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
                            onChange={(e) => setInputEntryName_data(e.target.value)}
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
                        onClick={saveData}
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
                        Save Entry
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEntry;
