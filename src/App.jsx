import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import UserDataMedicalPage from "./pages/UserDataMedicalPage.jsx";
import Homepage from "./pages/HomePage.jsx";
import ViewDataMedicalPage from "./pages/ViewDataMedicalPage.jsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage/>} />
                <Route path="/medical-data" element={<UserDataMedicalPage />} />
                <Route path="/HomePage" element={<Homepage/>} />
                <Route path="/ViewDataMedical" element={<ViewDataMedicalPage/>} />
            </Routes>
        </Router>
    );
}

export default App;