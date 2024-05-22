import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import UserDataMedical from "./pages/UserDataMedical.jsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage/>} />
                <Route path="/medical-data" element={<UserDataMedical />} />
            </Routes>
        </Router>
    );
}

export default App;