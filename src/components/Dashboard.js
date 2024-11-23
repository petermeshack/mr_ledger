import React, { useState, useEffect } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import Navs from "./Navs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import M from "materialize-css";

const Dashboard = () => {
    const [Ledger_dataArray, setLedger_dataArray] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);

    // Show toast notifications
    const showToast = (message, type) => {
        const classes = type === "success" || type === "info" ? "green darken-2" : "red darken-2";
        M.toast({ html: message, classes });
    };

    // Fetch data from Firebase on mount
    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "Mr_ledger/ledgers");
            try {
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    const data = Object.values(snapshot.val());
                    setLedger_dataArray(data);

                    // Group data by ledger name and sum the amounts
                    const ledgerSums = data.reduce((acc, item) => {
                        const ledger = item.ledger_name;
                        acc[ledger] = (acc[ledger] || 0) + parseFloat(item.amount);
                        return acc;
                    }, {});

                    // Calculate total sum
                    const totalAmount = Object.values(ledgerSums).reduce((sum, value) => sum + value, 0);

                    // Prepare pie chart data with percentages
                    const pie = Object.entries(ledgerSums).map(([name, total]) => ({
                        name,
                        value: total,
                        percentage: ((total / totalAmount) * 100).toFixed(2), // Calculate percentage
                    }));

                    setPieData(pie);

                    // Prepare bar chart data
                    const bar = data.map(item => ({
                        name: item.entry_name,
                        amount: parseFloat(item.amount),
                    }));
                    setBarData(bar);

                    // Show welcome toast
                    showToast("Welcome to the Dashboard! Data loaded successfully.", "success");
                } else {
                    showToast("No data found in the database.", "warning");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                showToast("Error loading data. Please try again later.", "error");
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navs />
            {/* Bar Chart */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
                <div style={{ textAlign: "center" }}>
                    <h5>Items Spent On (Bar Chart)</h5>
                    <BarChart
                        width={600}
                        height={300}
                        data={barData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>

            {/* Ledger Table */}
            <div style={{ textAlign: "center" }}>
                <h5>All Items</h5>
                <table style={{ width: "80%", margin: "0 auto", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Ledger Name</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Entry Name</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Ledger_dataArray.length > 0 ? (
                            Ledger_dataArray.map((item, index) => (
                                <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.ledger_name}</td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.entry_name}</td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.date}</td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>No Data Available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* New Table: Totals Spent per Ledger */}
            <div style={{ textAlign: "center", marginTop: "40px" }}>
                <h5>Total Spent Per Ledger (Summed Amounts)</h5>
                <table style={{ width: "80%", margin: "0 auto", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Ledger Name</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Total Amount</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pieData.length > 0 ? (
                            pieData.map((item, index) => (
                                <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.name}</td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.value}</td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.percentage}%</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center", padding: "10px" }}>No Data Available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
