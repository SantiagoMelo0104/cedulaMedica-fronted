
import { useNavigate } from "react-router-dom";
import authService from "../services/firebase.js";

function LoginPage() {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await authService.signInWithPopup();
            navigate("/medical-data", { state: { user: result.user } });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button type="button" onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
        </div>
    );
}

export default LoginPage;