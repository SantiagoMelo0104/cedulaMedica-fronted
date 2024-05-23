import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/firebase.js";
import "./UserDataMedicalPage.css";

function UserDataMedicalPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const user = await authService.getCurrentUser();
            if (!user) {
                navigate("/");
            }
        };

        checkUser();
    }, [navigate]);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        bloodType: "",
        allergies: "",
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSelectChange = (event) => {
        setFormData({
            ...formData,
            bloodType: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Aquí puedes enviar los datos del formulario al servidor
        console.log(formData);
    };

    return (
        <div>
            <h1>Registro de datos médicos</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <br />

                <label htmlFor="age">Edad:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                />
                <br />

                <label htmlFor="gender">Género:</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value=""></option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
                <br />

                <label htmlFor="bloodType">Tipo de sangre:</label>
                <select id="bloodType" name="bloodType" value={formData.bloodType} onChange={handleSelectChange}>
                    <option value=""></option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                <br />

                <label htmlFor="allergies">Alergias:</label>
                <textarea id="allergies" name="allergies" value={formData.allergies} onChange={handleInputChange}></textarea>
                <br />

                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default UserDataMedicalPage;