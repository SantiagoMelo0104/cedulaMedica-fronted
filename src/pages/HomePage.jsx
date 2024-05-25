import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/firebase.js";
import "./HomePage.css";
import Sidebar from "../components/Sidebar.jsx";

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
        navigate('/ViewDataMedical', { state: { email: user.email } });
    };

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Bienvenido, {user?.displayName || "usuario"}</h1>
                <div className="header-right">
                    <img src={user?.photoURL || ""} alt="Foto de perfil" />
                    <Sidebar isOpen={showSidebar} onClose={toggleSidebar} />

                </div>
            </header>



            <main className="content">
                <h2>Contenido principal</h2>
                <p>Aquí puedes mostrar el contenido principal de la página.</p>
                <img src="qr.png" alt="Código QR" />
            </main>

            <div className="actions">
                <button onClick={handleSignOut}>Cerrar sesión</button>
                <button onClick={handleRegister}>Registro</button>
            </div>
        </div>
    );
}

export default Homepage;