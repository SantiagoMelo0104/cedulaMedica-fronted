import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDataMedicalPage.css";
import authService from "../services/firebase.js";

function UserDataMedicalPage() {
    const navigate = useNavigate();
    const [formIsValid, setFormIsValid] = useState(false);

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

        if (event.target.name === "bloodType" && event.target.value !== "") {
            setFormIsValid(true);
        } else if (event.target.name !== "bloodType" && event.target.value !== "") {
            const isFormValid = Object.values(formData).every(val => val !== "");
            setFormIsValid(isFormValid);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        fetch("/api/medical-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Los datos médicos se han guardado exitosamente.");
                navigate("/");
            })
            .catch(error => {
                console.error(error);
                alert("Ha ocurrido un error al guardar los datos médicos.");
            });
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
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="O">Otro</option>
                </select>
                <br />

                <label htmlFor="bloodType">Tipo de sangre:</label>
                <input
                    type="text"
                    id="bloodType"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                />
                <br />

                <label htmlFor="allergies">Alergias:</label>
                <textarea
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                ></textarea>
                <br />

                <button type="submit" disabled={!formIsValid}>
                    Guardar
                </button>
            </form>
        </div>
    );
}

export default UserDataMedicalPage;