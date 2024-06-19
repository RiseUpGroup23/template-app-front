import React, { useState } from "react"
import { useConfig } from "../../../context/AdminContext"
import { renderImageRow, renderTextRow } from "../Rows/rows"
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

                {renderTextRow("Titulo 1", newConfig.presentationTitle, "presentationTitle")}
                {renderTextRow("Texto de presentación", newConfig.presentationText, "presentationText")}

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
                {renderImageRow("Fondo del inicio", newConfig.customization.background.backgroundImage, "customization.background.backgroundImage")}
                {renderImageRow("Fondo para turnos", newConfig.customization.background.backgroundTurno, "customization.background.backgroundTurno")}
                {renderImageRow("Imagen de presentación", newConfig.imagePresentation, "imagePresentation")}
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

                {renderTextRow("Nombre", newConfig.customization.shopName, "customization.shopName", true)}
                {renderTextRow("Dirección", newConfig.contact.address, "contact.address", true)}
                {renderTextRow("Ciudad", newConfig.contact.city, "contact.city", true)}
                {renderTextRow("Provincia", newConfig.contact.state, "contact.state", true)}
                {renderTextRow("Número de contacto", newConfig.contact.phone, "contact.phone", true)}
                {renderTextRow("Correo", newConfig.contact.email, "contact.email", true)}
                {renderTextRow("Facebook", newConfig.contact.facebook, "contact.facebook", true)}
                {renderTextRow("Instagram", newConfig.contact.instagram, "contact.instagram", true)}

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