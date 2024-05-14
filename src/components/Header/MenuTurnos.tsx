import React from "react";
import "./header.css"
import { Link, useLocation } from "react-router-dom";
import { useConfig } from "../../context/AdminContext";

const MenuTurnos = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const location = useLocation()
    const { config } = useConfig()

    if (!config) return <></>

    const handleClick = () => {
        setOpen((prev) => !prev)
        setTimeout(() => {
            setOpen(false)
        }, 5000)
    };

    return (
        <div className="containerHeaderButton">
            <button style={{ color: `${config.customization.primary.text}` }} className={`botonHeader ${location.pathname === '/reprogramar' || location.pathname === '/reservar' ? 'active' : ''}`} onClick={handleClick}>Turnos</button>
            {open &&
                <div className="listHeader">
                    <Link to={"/reservar"}>
                        <button className="botonHeader buttonGreen">
                            Solicitar turno
                        </button>
                    </Link>
                    <Link to={"/reprogramar"}>
                        <button className="botonHeader buttonBlue">
                            Reprogramar
                        </button>
                    </Link>
                    <Link to={"/reprogramar"}>
                        <button className="botonHeader buttonRed">
                            Cancelar turno
                        </button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default MenuTurnos