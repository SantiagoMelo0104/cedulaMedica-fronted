import { useState } from "react";

const Sidebar = ({  onToggle }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        onToggle();
    };

    return (
        <div className="menu-button">
            <button onClick={toggleMenu}>Menú</button>
            {isOpen && (
                <ul className="menu">
                    <li><a href="#">Mi cuenta</a></li>
                    <li><a href="#">Reporte</a></li>
                    <li><a href="#">Contacto</a></li>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;