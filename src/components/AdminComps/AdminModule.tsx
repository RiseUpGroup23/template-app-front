import React from "react"
import Menu from "./Menu"
import "./AdminModules.css"
import { Route, Router, Routes } from "react-router-dom"
import MainEditor from "./Sections/MainEditor"
import { useConfig } from "../../context/AdminContext"
import Customization from "./Sections/Customization"
import Appointments from "./Sections/Appointments"

const AdminModule = () => {
    const { config } = useConfig()
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
                </Routes>
            </div>
        </div>
    )
}

export default AdminModule