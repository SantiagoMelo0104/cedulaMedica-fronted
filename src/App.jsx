import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import UserDataMedicalPage from "./pages/UserDataMedicalPage.jsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage/>} />
                <Route path="/medical-data" element={<UserDataMedicalPage/>} />
            </Routes>
        </Router>
    );
}

export default App;