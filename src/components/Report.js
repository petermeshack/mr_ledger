import React, { useEffect, useState } from "react";
import Navs from "./Navs";
import { getDatabase, ref, get } from "firebase/database";
import app from "../firebaseConfig";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the plugin
import M from "materialize-css"; // Import Materialize

const Report = () => {
    const [ledgerData, setLedgerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "Mr_ledger/ledgers");
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const data = Object.values(snapshot.val());
                setLedgerData(data);
                M.toast({ html: "Data fetched succesfully!", classes: "green rounded" });
            } else {
                console.error("Error fetching data"); 
                M.toast({ html: "Error fetching data!", classes: "red rounded" });
            }
        };
        fetchData();
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();

        // Table headers and data
        const columns = ["Ledger Name", "Entry Name", "Date", "Amount"];
        const rows = ledgerData.map(item => [
            item.ledger_name,
            item.entry_name,
            item.date,
            item.amount
        ]);

        // Generate the table in PDF
        doc.autoTable({
            head: [columns],
            body: rows,
        });

        // Save the generated PDF
        doc.save("report.pdf");
        M.toast({ html: "Report PDF generated succesfully!", classes: "green rounded" });
    };

    const generateExcel = () => {
        const XLSX = require('xlsx');
        const ws = XLSX.utils.json_to_sheet(ledgerData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Ledger Data");
        XLSX.writeFile(wb, "report.xlsx");
        M.toast({ html: "Report SPREADSHEET generated succesfully!", classes: "green rounded" });
    };

    return (
        <div>
            <Navs />
            <h2>Report</h2>

            <button style={{ margin: "10px",  fontSize: "16px" }} className="btn waves-effect waves-light blue darken-2" onClick={generatePDF}>Download PDF</button>
            <button style={{ margin: "10px", fontSize: "16px" }} className="btn waves-effect waves-light blue darken-2" onClick={generateExcel}>Download Excel</button>

     {/* Table for display (optional) */}
     <div style={{ textAlign: "center", marginTop: "40px" }}>
                <h2>Ledger Data</h2>
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
                        {ledgerData.length > 0 ? (
                            ledgerData.map((item, index) => (
                                <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.ledger_name}</td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.entry_name}</td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.date}</td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                                    No Data Available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Report;
