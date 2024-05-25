import { useNavigate } from "react-router-dom";
import { authService } from "../services/firebase.js";
import './LoginPage.css';
// import { collection, getDocs, query, where } from "firebase/firestore";

function LoginCard() {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const user = await authService.signInWithPopup();
            if (user) {
                const userId = user.uid;
                const token = await user.getIdToken();
                const email = user.email;
                const hasRegister = await hasUserRegister(userId, token, email);
                // const hasMedicalData = await hasMedicalDataCheck(userId, token);
                 const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                };
                navigate(hasRegister ? "/Homepage" : "/medical-data", { state: { userData } });
                console.error(email)
            } else {
                console.error("No se pudo autenticar con Google");
            }
        } catch (error) {
            console.error(error);
        }
    };
    const hasUserRegister = async (email) => {
        try {
            const jsonBody = JSON.stringify({ email });

            const response = await fetch('https://avvplvfar6.execute-api.us-east-1.amazonaws.com/Despliegue/findByEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonBody
            });
            
            if (response.ok) {
                const data = await response.text();
                console.log(data);
                if (data.exists) {
                    return true;
                } else {
                    return false;
                }
            } else {
                const errorMessage = await response.text();
                console.error("Error al verificar el registro del usuario:", errorMessage);
                return null;
            }
        } catch (error) {
            console.error("Error al verificar el registro del usuario:", error);
            return null;
        }
    };
    // const checkMedicalData = async (userId) => {
    //     const medicalDataRef = collection(db, "cedulamedica");
    //     const medicalDataQuery = query(medicalDataRef, where("userId", "==", userId));
    //     const querySnapshot = await getDocs(medicalDataQuery);
    //     return querySnapshot.size > 0;
    // };

    //https://avvplvfar6.execute-api.us-east-1.amazonaws.com/Despliegue/createUser


    return (
        <div className="card login-card">
            <div className="card-body">
                <h5 className="card-title">Iniciar sesión</h5>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" className="form-control" id="email" placeholder="Correo electrónico"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" className="form-control" id="password" placeholder="Contraseña"/>
                    </div>
                    <button type="button" onClick={handleGoogleLogin} className="btn btn-block btn-google">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="google-logo">
                            <path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" />
                        </svg>
                        <span>Iniciar sesión con Google</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginCard;