import {useState, useEffect} from 'react';
import {authService} from "../services/firebase.js";
import {useNavigate} from "react-router-dom";
import "./ViewDataMedicalPage.css"

const UserDataPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    let email1;

    useEffect(() => {
        const checkUser = async () => {
            const user = await authService.getCurrentUser();
            email1 = user.email;
            if (!user) {
                navigate("/");
            } else {
                setUser(user);

                const isRegistered = await hasUserRegister(email1);
                setIsRegistered(isRegistered);
            }
        };

        checkUser();
    }, [navigate]);

    const hasUserRegister = async (email1) => {
        try {
            const jsonBody = JSON.stringify(email1);
            const response = await fetch('https://avvplvfar6.execute-api.us-east-1.amazonaws.com/Despliegue/findByEmailEnc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonBody
            });

            if (!response.ok) {
                console.error("Error while fetching user data:", response.statusText);
                return false;
            }
            const data = await response.json();
            setData(data);
            return response.ok && data.email !== null;
        } catch (error) {
            console.error("Error while verifying user registration:", error);
            return false;
        }
    };

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            setEmail(userEmail);
        }
    }, []);

    if (!isRegistered) {
        return <div>Cargando...</div>;
    }



    return (
        <div className="user-data-page">
            <h1>Datos del usuario</h1>
            <div className="row">
                <div className="col-1">
                    <label>Nombre:</label>
                    <input type="text" value={data?.name || ""} readOnly/>
                </div>
                <div className="col-2">
                    <label>Apellidos:</label>
                    <input type="text" value={data?.lastName || ""} readOnly/>
                </div>
            </div>
            <div className="row">
                <div className="col-1">
                    <label>Tipo de documento:</label>
                    <input type="text" value={data?.documentType || ""} readOnly/>
                </div>
                <div className="col-2">
                    <label>Documento:</label>
                    <input type="text" value={data?.document || ""} readOnly/>
                </div>
            </div>
            <div className="row">
                <div className="col-1">
                    <label>Sexo:</label>
                    <input type="text" value={data?.sex || ""} readOnly/>
                </div>
                <div className="col-2">
                    <label>Tipo de sangre:</label>
                    <input type="text" value={data?.bloodType || ""} readOnly/>
                </div>
            </div>
            <div className="row">
                <div className="col-1">
                        <label>Edad:</label>
                        <input type="text" value={data?.age || ""} readOnly/>
                </div>
                <div className="col-2">
                        <label>Alergias:</label>
                        <textarea value={data?.allergies || ""} readOnly/>
                </div>
            </div>
            <div className="row">
                <div className="col-1">
                    <label>Enfermedades crónicas:</label>
                    <textarea value={data?.chronicDiseases || ""} readOnly/>
                </div>
            </div>
        </div>);
            };
export default UserDataPage;