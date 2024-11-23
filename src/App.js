import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddEntry from "./components/AddEntry";
import Ledger from "./components/Ledger";
import ViewEntry from "./components/ViewEntry";
import Dashboard from "./components/Dashboard";
import UpdateEntries from "./components/UpdateEnries";
import Report from "./components/Report";
import Version from "./components/Version";
function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                {
                /*<Route path="/" element={<Dashboard />} />
                <Route path="/add-entry" element={<AddEntry />} />
                <Route path="/ledger" element={<Ledger />} />
                <Route path="/view-entry" element={<ViewEntry />} />
                <Route path="/report" element={<Report />} />
                <Route pathA="/version" element={<Version />} />
                */
                }
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-entry" element={<AddEntry />} />
                <Route path="/ledger" element={<Ledger />} />
                <Route path="/view-entry" element={<ViewEntry />} />
                <Route path="/report" element={<Report />} />
                <Route path="/version" element={<Version />} />

                <Route path="/update-entry/:myFirebaseID" element={<UpdateEntries />} />


            </Routes>
        </Router>
    </div>
  );
}

export default App;
