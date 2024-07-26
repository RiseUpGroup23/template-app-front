import React from "react"
import Menu from "./Menu"
import "./AdminModules.css"
import { Route, Routes } from "react-router-dom"
import MainEditor from "./Sections/MainEditor"
import { useConfig } from "../../context/AdminContext"
import Customization from "./Sections/Customization"
import Appointments from "./Sections/Appointments"
import Alert from '@mui/material/Alert';
import Professionals from "./Sections/Professionals"
import Services from "./Sections/Services"
import ComercialConfig from "./Sections/ComercialConfig"


const AdminModule = () => {
    const { config, alert } = useConfig()
    if (!config) return (<></>)
    return (
        <div className="adminModule">
            <Menu />
            <div className="editorContainer">
                <div className="floatLogo">
                    <img src={config.customization.logo.primary} alt="floatLogo" />
                </div>
                <Routes>
                    <Route path="/" element={<MainEditor />} />
                    <Route path="/personalizacion" element={<Customization />} />
                    <Route path="/turnos" element={<Appointments />} />
                    <Route path="/profesionales" element={<Professionals />} />
                    <Route path="/servicios" element={<Services />} />
                    <Route path="/politicas" element={<ComercialConfig />} />
                </Routes>
            </div>
            {alert && alert.type !== "hidden" && <Alert className="alertBox" severity={alert.type}>
                {alert.msg}
            </Alert>}
        </div>
    )
}

export default AdminModule