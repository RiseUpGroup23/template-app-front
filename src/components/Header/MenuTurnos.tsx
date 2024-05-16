import React from "react";
import "./header.css"
import { Link, useLocation } from "react-router-dom";
import { useConfig } from "../../context/AdminContext";
import hexToRgb from "../../modules/hexToRgb";

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
            <style>{`
                .botonHeader:hover {
                    border: 3px solid ${hexToRgb(config.customization.secondary.color)};
                    border-width: 0 0 3px 0;
                    transition: border-color 0.5s ease;
                } 

                .botonHeader.active {
                    border-bottom: 3px solid ${hexToRgb(config.customization.secondary.color)};
                }

                .listHeader .botonHeader:hover {
                    border-color: transparent;
                    background: linear-gradient(90deg, ${hexToRgb(config.customization.primary.color, 1, .5)} 0%, ${hexToRgb(config.customization.primary.color, 1, .35)} 100%);
                }
            `}</style>
            <button style={{ color: `${config.customization.primary.text}` }} className={`botonHeader ${location.pathname === '/reprogramar' || location.pathname === '/reservar' ? 'active' : ''}`} onClick={handleClick}>Turnos</button>
            {open &&
                <div className="listHeader" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color, 1, .3)}` }}>
                    <Link to={"/reservar"}>
                        <button className="botonHeader" style={{ color: `${config.customization.primary.text}` }}>
                            Solicitar turno
                        </button>
                    </Link>
                    <Link to={"/reprogramar"}>
                        <button className="botonHeader" style={{ color: `${config.customization.primary.text}` }}>
                            Reprogramar
                        </button>
                    </Link>
                    <Link to={"/reprogramar"}>
                        <button className="botonHeader" style={{ color: `${config.customization.primary.text}` }}>
                            Cancelar turno
                        </button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default MenuTurnos