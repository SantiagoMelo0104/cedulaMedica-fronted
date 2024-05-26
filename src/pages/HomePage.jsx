import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/firebase.js";
import "./HomePage.css";
import Sidebar from "../components/Sidebar.jsx";
import QRCode from "qrcode.react";

function Homepage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

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
    }, [navigate]);

    const handleSignOut = async () => {
        try {
            await authService.signOut();
            setUser(null);
            setShowSidebar(false);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegister = () => {
        const userData = JSON.stringify(user);
        navigate("/ViewDataMedical", { state: { userData } });
    };

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    const generateUserDataUrl = () => {
        const userData = JSON.stringify(user);
        return `/ViewDataMedical?userData=${userData}`;
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Bienvenido, {user?.displayName || "usuario"}</h1>
                {user?.photoURL && <img src={user.photoURL} alt="Foto de perfil" className="profile-picture" />}
                <div className="header-right">
                    <button onClick={handleSignOut}>Cerrar sesión</button>
                </div>
            </header>

            <main className="content">
                <h2>Contenido principal</h2>
                <p>Aquí puedes mostrar el contenido principal de la página.</p>
                <QRCode value={generateUserDataUrl()} size={400} />
            </main>

            <div className="actions">

                <button onClick={handleRegister}>Registro</button>
            </div>
        </div>
    );
}

export default Homepage;