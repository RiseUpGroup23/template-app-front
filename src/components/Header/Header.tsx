import React from "react";
import "./header.css"
import MenuTurnos from "./MenuTurnos";
import { Link, useLocation } from "react-router-dom";
import { useConfig } from "../../context/AdminContext";
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuDrawer from "./MenuDrawer";
import hexToRgb from "../../modules/hexToRgb";

const Header = () => {
    const { config, invertColors } = useConfig()
    const isMobile = useMediaQuery('(max-width:1024px)');
    const location = useLocation()
    if (!config) return <></>

    return (
        <div className="headerContainer" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color, .5)}` }}>
            <Link to={"/"}>
                <div className="logoHeader">
                    <img src={config.logoImage} alt="logoImage" />
                </div>
            </Link>

            {!isMobile ?
                <div className="botonHeaderCont">
                    {location.pathname === "/gestion-turnos" ? (
                        <button onClick={() => window.location.href = `${window.location.origin}/admin`}>
                            <button className="botonHeader">Admin</button>
                        </button>
                    ) : (
                        <>
                            <Link to={"/"}>
                                <button style={{ color: `${config.customization.primary.text}` }} className={`botonHeader ${location.pathname === '/' ? 'active' : ''}`}>Inicio</button>
                            </Link>
                            <MenuTurnos />
                            <button onClick={invertColors} style={{ color: `${config.customization.primary.text}` }} className={`botonHeader`}>Invertir</button>
                        </>
                    )}
                </div>
                :
                <MenuDrawer />
            }
        </div>
    )
}

export default Header