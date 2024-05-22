import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/firebase.js";

function UserDataMedical() {
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

    // Aquí puedes renderizar el formulario de registro de datos médicos
    return <div>Tu acabas de entrar 🥵🥵🔥🔥 </div>;
}

export default UserDataMedical;