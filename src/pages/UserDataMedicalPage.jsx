import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/firebase.js";
import axios from "axios";
import "./UserDataMedicalPage.css"

function UserDataMedicalPage() {
    const navigate = useNavigate();
    const [formIsValid, setFormIsValid] = useState(false);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const checkUser = async () => {
            const user = await authService.getCurrentUser();
            if (!user) {
                navigate("/");
            } else {
                setUserId(user.uid);
            }
        };

        checkUser();
    }, [navigate]);

    const [formData, setFormData] = useState({
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
        document: ""
    })

    const handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        if (name === "age") {
            const parsedValue = parseInt(value);
            if (parsedValue >= 1 && Number.isInteger(parsedValue) && parsedValue <=100) {
                setFormData({
                    ...formData,
                    [name]: parsedValue,
                });
            } else {
                setFormData({
                    ...formData,
                    [name]: "",
                });
            }
        } else if (event.target.tagName === "SELECT") {
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }


        const isSelectValid = name === "documentType" && name === "bloodType" && name === "sex" ? value !== "" : true;
        const areRequiredFieldsValid = ["name","lastName","document", "documentType", "bloodType", "age", "sex"].every((field) => formData[field] !== "");
        setFormIsValid(isSelectValid && areRequiredFieldsValid);
    };

    const handleSaveClick = async (event) => {
        event.preventDefault();
        try {
            const dataToSend ={...formData};
            dataToSend._id = formData.document
            dataToSend.userId = userId;
            const user = await authService.getCurrentUser();
            const token = await user.getIdToken();
            dataToSend.email = user.email;
            // const jsonData = JSON.stringify(formData);
            const response = await axios.post('https://avvplvfar6.execute-api.us-east-1.amazonaws.com/Despliegue/createUser',
                dataToSend,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            });
            console.log(response.data);
            navigate('/Homepage');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h1>Registro de datos médicos</h1>
            <form onSubmit={handleSaveClick}>
                <div className="row">
                    <div className="col-1">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-2 col-2">
                    <label htmlFor="name">Apellidos:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="left-align"
                    />
                    </div>
                </div>

                <div className="row">
                    <div className="col-1">
                        <label htmlFor="documentType">Tipo de documento:</label>
                        <select id="documentType" name="documentType" value={formData.documentType}
                                onChange={handleInputChange} className="required">
                            <option value="">seleccione una opción</option>
                            <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
                            <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                            <option value="Pasaporte">Pasaporte</option>
                        </select>
                    </div>
                    <div className="col-2 ">
                        <label htmlFor="document">Documento:</label>
                        <input
                            type="text"
                            id="document"
                            name="document"
                            value={formData._document}
                            onChange={handleInputChange}
                            className="required"
                        />
                    </div>
                </div>

                <div className="row">

                    <div className="col-1 ">
                        <label htmlFor="sex">Sexo:</label>
                        <select id="sex" name="sex" value={formData.sex} onChange={handleInputChange} className="required">
                            <option value="">seleccione una opción</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-1">
                        <label htmlFor="bloodType">Tipo de sangre:</label>
                        <select id="bloodType" name="bloodType" value={formData.bloodType} className="required" onChange={handleInputChange}>
                            <option value="">seleccione una opción</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className="col-2 col-2">
                        <label htmlFor="age">Edad:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="required"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-1">
                        <label htmlFor="allergies">Alergias:</label>
                        <textarea
                            id="allergies"
                            name="allergies"
                                value={formData.allergies}
                                onChange={handleInputChange}
                                className="large-textarea"
                            />
                    </div>
                </div>

                <div className="row">
                    <div className="col-1">
                        <label htmlFor="chronicDiseases">Enfermedades crónicas:</label>
                        <textarea
                            id="chronicDiseases"
                            name="chronicDiseases"
                            value={formData.chronicDiseases}
                            onChange={handleInputChange}
                            className="large-textarea"
                        />
                    </div>
                </div>

                    <button type="submit" disabled={!formIsValid}>Guardar</button>
            </form>
        </div>
);
}

export default UserDataMedicalPage;