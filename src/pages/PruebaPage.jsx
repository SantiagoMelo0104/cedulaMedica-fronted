import { useState, useEffect } from "react";
import axios from "axios";
import UserDataMedicalPage from "./UserDataMedicalPage";

function PruebaPage() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://avvplvfar6.execute-api.us-east-1.amazonaws.com/Despliegue/findByEmailEnc"); // Reemplaza con la URL de tu API
                const userData = response.data;
                setUserData(userData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Cargando datos del usuario...</p>;
    }

    if (error) {
        return <p>Error al cargar datos del usuario: {error}</p>;
    }

    return (
        <div>
            <h1>Datos médicos del usuario</h1>
            <UserDataMedicalPage formData={userData} readOnly={true} />
        </div>
    );
}

export default PruebaPage;