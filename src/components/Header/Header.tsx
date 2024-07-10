import React, { useState } from "react";
import "./header.css"
import MenuTurnos from "./MenuTurnos";
import MenuDrawer from "./MenuDrawer";
import hexToRgb from "../../modules/hexToRgb";
import { Link, useLocation } from "react-router-dom";
import { useConfig } from "../../context/AdminContext";
import useMediaQuery from '@mui/material/useMediaQuery';
import LightModeIcon from '@mui/icons-material/LightMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const Header = () => {
    const { config, invertColors } = useConfig()
    const isMobile = useMediaQuery('(max-width:1024px)');
    const location = useLocation()
    const [inverted, setInverted] = useState(localStorage?.getItem("inverted") ?? false)
    if (!config) return <></>

    return (
        <div className="headerContainer" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color, .75)}` }}>
            <Link to={"/"}>
                <div className="logoHeader">
                    <img src={config.customization.logo.primary} alt="logoImage" />
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
                            <button onClick={() => {
                                if (localStorage.getItem("inverted")) {
                                    localStorage.removeItem("inverted")
                                } else {
                                    localStorage.setItem("inverted", "true")
                                }
                                invertColors()
                                setInverted((prev) => !prev)
                            }} style={{ padding: `${config.customization.twoColors ? "" : "0"}`, visibility: `${config.customization.twoColors ? "visible" : "hidden"}`, color: `${config.customization.primary.text}` }} className={`botonHeader inverter`}>
                                {inverted ? <LightModeIcon /> : <LightModeOutlinedIcon />}
                            </button>
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