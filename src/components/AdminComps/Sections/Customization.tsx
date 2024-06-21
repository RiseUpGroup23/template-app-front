import React, { useState } from "react"
import { useConfig } from "../../../context/AdminContext"
import { RenderImageRow, RenderTextRow } from "../Rows/rows"
import EditColorModal from "../Buttons/ColorModal"
import ImageEditModal from "../Buttons/ImageEditModal"
import Switch from '@mui/material/Switch';
import { Stack } from "@mui/material"

const Customization = () => {
    const { newConfig } = useConfig()
    const [oneColorMode, setOneColorMode] = useState(false)
    if (!newConfig) return (<></>)

    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{newConfig.customization.shopName}!</strong></span>
            <span className="proxApo">
                Personalizar textos
            </span>
            <div className="blackLayout">
                <div className="proxApoHeader rowContainer">
                    <div className="rowItem" style={{ width: "35%" }}><span>Textos</span></div>
                    <div className="rowItem" style={{ width: "45%" }}><span>Vista Previa</span></div>
                    <div className="rowItem" style={{ width: "20%" }}><span>Editar</span></div>
                </div>

                {RenderTextRow("Titulo 1", newConfig.presentationTitle, "presentationTitle")}
                {RenderTextRow("Texto de presentación", newConfig.presentationText, "presentationText")}

            </div>
            <span className="proxApo">
                Personalizar imágenes
            </span>
            <div className="blackLayout">
                <div className="proxApoHeader rowContainer">
                    <div className="rowItem" style={{ width: "35%" }}><span>Imágenes</span></div>
                    <div className="rowItem" style={{ width: "45%" }}><span>Vista Previa</span></div>
                    <div className="rowItem" style={{ width: "20%" }}><span>Editar</span></div>
                </div>
                {RenderImageRow("Fondo del inicio", newConfig.customization.background.backgroundImage, "customization.background.backgroundImage")}
                {RenderImageRow("Fondo para turnos", newConfig.customization.background.backgroundTurno, "customization.background.backgroundTurno")}
                {RenderImageRow("Imagen de presentación", newConfig.imagePresentation, "imagePresentation")}
            </div>
            <span className="proxApo">
                Información del negocio
            </span>
            <div className="blackLayout">
                <div className="proxApoHeader rowContainer">
                    <div className="rowItem" style={{ width: "35%" }}><span>Textos</span></div>
                    <div className="rowItem" style={{ width: "45%" }}><span>Vista Previa</span></div>
                    <div className="rowItem" style={{ width: "20%" }}><span>Editar</span></div>
                </div>

                {RenderTextRow("Nombre", newConfig.customization.shopName, "customization.shopName", true)}
                {RenderTextRow("Dirección", newConfig.contact.address, "contact.address", true)}
                {RenderTextRow("Ciudad", newConfig.contact.city, "contact.city", true)}
                {RenderTextRow("Provincia", newConfig.contact.state, "contact.state", true)}
                {RenderTextRow("Número de contacto", newConfig.contact.phone, "contact.phone", true)}
                {RenderTextRow("Correo", newConfig.contact.email, "contact.email", true)}
                {RenderTextRow("Facebook", newConfig.contact.facebook, "contact.facebook", true)}
                {RenderTextRow("Instagram", newConfig.contact.instagram, "contact.instagram", true)}

            </div>
            <span className="proxApo">
                <div className="switchColorMode">
                    <span>Paleta de colores</span>
                    <Stack className="switchOptions" direction="row" spacing={1} alignItems="center">
                        <span>Simple</span>
                        <Switch checked={!oneColorMode} onChange={() => setOneColorMode((prev) => !prev)} />
                        <span>Doble</span>
                    </Stack>
                </div>
                <div className="blackLayout">
                    <div className="colorsContainer">
                        <span className="colorGroupName">Paleta principal</span>
                        <EditColorModal initialColor={newConfig.customization.primary.color} prop={"customization.primary.color"} />
                        <EditColorModal initialColor={newConfig.customization.primary.text} prop={"customization.primary.text"} />
                        <ImageEditModal initialImg={newConfig.customization.logo.primary} prop="customization.logo.primary" customTrigger={<img src={newConfig.customization.logo.primary} className="colorDemo" alt="logoPrimary" />} />
                    </div>
                    {!oneColorMode && <div className="colorsContainer">
                        <span className="colorGroupName">Paleta secundaria</span>
                        <EditColorModal initialColor={newConfig.customization.secondary.color} prop={"customization.secondary.color"} />
                        <EditColorModal initialColor={newConfig.customization.secondary.text} prop={"customization.secondary.text"} />
                        <ImageEditModal initialImg={newConfig.customization.logo.secondary} prop="customization.logo.secondary" customTrigger={<img src={newConfig.customization.logo.secondary} className="colorDemo" alt="logoSecondary" />} />
                    </div>}
                </div>
            </span>
        </div>
    )
}

export default Customization