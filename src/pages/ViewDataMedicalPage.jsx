import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService} from "../services/firebase.js";
import { collection, getFirestore, setDoc,doc } from "firebase/firestore";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ViewDataMedicalPage() {
    const firestore = getFirestore();
    const medicalDataRef = collection(firestore, "cedulamedica");
    const location = useLocation();

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [medicalData, setMedicalData] = useState({
        name: "",
        lastName: "",
        age: "",
        gender: "",
        bloodType: "",
        bloodTypePositive: "",
        allergies: "",
        diseases: "",
        medications: "",
        documentType: "",
        document: "",

    });
    const getMedicalData = async (email) => {
        try {
            const response = await axios.get(`https://avvplvfar6.execute-api.us-east-1.amazonaws.com/Despliegue/findByEmail?email=${email}`);
            return response.data;
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data;
                if (errorData && typeof errorData === 'object') {
                    const errorMessage = errorData.message || 'Error desconocido';
                    console.error(errorMessage);
                    // Maneja el error de la API aquí
                    return null;
                }
            }
            console.error(error);
            // Maneja otros errores aquí
            return null;
        }
    };

    const saveMedicalData = async (uid, medicalData) => {
        try {
            await setDoc(doc(medicalDataRef, uid), medicalData);
        } catch (error) {
            console.error(error);
        }
    };
    const [isHidden, setIsHidden] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {

        const checkUser = async () => {

            const user = await authService.getCurrentUser();
            if (!user) {
                navigate("/");
            } else {
                setUser(user);
            }
        };

        checkUser();

        const getData = async () => {
            const data = await getMedicalData(user.email);
            if (data) {
                setMedicalData(data);
            }

        }

        if (user) {

            getData();

        }

    }, [navigate, user]);

    const handleSaveMedicalData = async () => {
        try {
            await saveMedicalData(user.uid, medicalData);
            navigate("/homepage");
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleHidden = () => {
        setIsHidden(!isHidden);
    };

    const handleEdit = () => {
        setIsEditable(true);
    };

    return (

        <div>

            <h1>Datos médicos</h1>

            {isHidden ? (

                <p>Datos médicos ocultos</p>

            ) : (

                <form>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={medicalData.name}
                        onChange={(e) => setMedicalData({...medicalData, name: e.target.value})}
                        disabled={!isEditable}
                    />
                    <br/>
                    <label>Apellidos:</label>
                    <input
                        type="text"
                        value={medicalData.lastName}
                        onChange={(e) => setMedicalData({...medicalData, lastName: e.target.value})}
                        disabled={!isEditable}
                    />
                    <br/>
                    <label>Edad:</label>
                    <input
                        type="number"
                        value={medicalData.age}
                        onChange={(e) => setMedicalData({...medicalData, age: e.target.value})}
                        disabled={!isEditable}
                    />
                    <br/>
                    <label>Género:</label>
                    <input
                        type="text"
                        value={medicalData.gender}
                        onChange={(e) => setMedicalData({...medicalData, gender: e.target.value})}
                        disabled={!isEditable}
                    />
                    <br/>
                    <label>Tipo de sangre:</label>
                    <input
                        type="text"
                        value={medicalData.bloodType}
                        onChange={(e) => setMedicalData({...medicalData, bloodType: e.target.value})}
                        disabled={!isEditable}
                    />
                    <br/>
                    <label>Positivo:</label>
                    <input
                        type="text"
                        value={medicalData.bloodTypePositive}
                        onChange={(e) => setMedicalData({...medicalData, bloodTypePositive: e.target.value})}
                        disabled={!isEditable}
                    />
                    <br/>
                    <label>Alergias:</label>
                    <textarea
                        value={medicalData.allergies}
                        onChange={(e) => setMedicalData({...medicalData, allergies: e.target.value})}
                        disabled={!isEditable}
                    />
                    <br/>
                    <label>Enfermedades:</label>
                    <textarea
                        value={medicalData.diseases}
                        onChange={(e) => setMedicalData({...medicalData, diseases: e.target.value})}
                        disabled={!isEditable}
                    />
                    <br/>
                    <label>Medicamentos:</label>
                    <textarea
                        value={medicalData.medications}
                        onChange={(e) => setMedicalData({...medicalData, medications: e.target.value})}
                        disabled={!isEditable}
                    />
                    <br/>
                    <label>Tipo de documento:</label>
                    <input
                        type="text"
                        value={medicalData.documentType}
                        onChange={(e) => setMedicalData({...medicalData, documentType: e.target.value})}
                        disabled={!isEditable}
                    />
                    <br/>
                    <label>Documento:</label>
                    <input
                        type="text"
                        value={medicalData.document}
                        onChange={(e) => setMedicalData({...medicalData, document: e.target.value})}
                        disabled={!isEditable}
                    />
                    <br/>
                    {isEditable ? (
                        <button type="button" onClick={handleSaveMedicalData}>
                            Guardar cambios
                        </button>
                    ) : (
                        <button type="button" onClick={handleEdit}>
                            Editar datos
                        </button>
                    )}
                </form>

            )}

        </div>

    );
}

export default ViewDataMedicalPage;