import { useState } from "react";
import "./header.css"
import MenuTurnos from "./MenuTurnos";
import MenuDrawer from "./MenuDrawer";
import hexToRgb from "../../modules/hexToRgb";
import { Link, useLocation } from "react-router-dom";
import { useConfig } from "../../context/AdminContext";
import useMediaQuery from '@mui/material/useMediaQuery';
import LightModeIcon from '@mui/icons-material/LightMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import FloatButtons from "./FloatButtons";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const Header = () => {
    const { config, invertColors, isAuthenticated } = useConfig()
    const isMobile = useMediaQuery('(max-width:1024px)');
    const location = useLocation()
    const [inverted, setInverted] = useState(localStorage?.getItem("inverted") ?? false)
    if (!config) return <></>

    return (
        <div className="headerContainer">
            {isAuthenticated && <div className="modeAdminAd">
                {!isMobile && <div className="modeAdminAd25"></div>}
                <span className="modeAdminAd50">{isMobile ? "" : "Hola, BarberShop. "}
                    Entraste en modo administrador
                    <Tooltip title="En este modo podrás crear turnos salteando los pasos de pago si los tienes configurados en el sitio.">
                        <HelpOutlineOutlinedIcon />
                    </Tooltip>
                </span>
                <a className={isMobile ? "modeAdminAd50" : "modeAdminAd25"} href="/admin">
                    Ir al <span style={{ textDecoration: "underline" }}>editor de página</span>
                    <ArrowCircleRightOutlinedIcon />
                </a>

            </div>}
            <div className="headerContent" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color, .75)}` }}>
                <FloatButtons />
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
        </div>
    )
}

export default Header