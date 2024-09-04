import React, { useEffect, useState } from "react"
import { useConfig } from "../../../context/AdminContext"
import { RenderImageRow, RenderTextRow } from "../Rows/rows"
import EditColorModal from "../Modals/ColorModal"
import ImageEditModal from "../Modals/ImageEditModal"
import { MenuItem, Select, Stack, Switch } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ReportIcon from '@mui/icons-material/Report';
import Color from 'color';

const checkColorContrast = (color1: string, color2: string): string => {
    const colorA = Color(color1);
    const colorB = Color(color2);
    const contrastRatio = colorA.contrast(colorB);

    const normalTextRatio = 4.5;
    const largeTextRatio = 3.0;

    if (contrastRatio >= normalTextRatio) {
        return `good`;
    } else if (contrastRatio >= largeTextRatio) {
        return `medium`;
    } else {
        return `bad`;
    }
};

const contrastInfo = (p1result: string, p2result: string, oneColorMode: boolean) => {
    if (oneColorMode) {
        switch (p1result) {
            case "good":
                return <div className="contrastAlert good">
                    <TaskAltIcon />
                    <span>La paleta principal contrasta excelente</span>
                </div>
            case "medium":
                return <div className="contrastAlert medium">
                    <InfoIcon />
                    <span>La paleta principal contrasta bien</span>
                </div>
            case "bad":
                return <div className="contrastAlert bad">
                    <ReportIcon />
                    <span>La paleta principal contrasta mal</span>
                </div>
        }
    } else {
        if (p1result === "bad" && p2result === "bad") {
            return <div className="contrastAlert bad">
                <ReportIcon />
                <span>Ambas paletas de colores contrastan mal</span>
            </div>
        } else if (p1result === "bad") {
            return <div className="contrastAlert bad">
                <ReportIcon />
                <span>La paleta principal no contrasta bien</span>
            </div>
        } else if (p2result === "bad") {
            return <div className="contrastAlert bad">
                <ReportIcon />
                <span>La paleta secundaria no contrasta bien</span>
            </div>
        }

        if (p1result === "medium" || p2result === "medium") {
            return <div className="contrastAlert medium">
                <InfoIcon />
                <span>Ambas paletas de colores contrastan bien</span>
            </div>
        }

        if (p1result === "good" && p2result === "good") {
            return <div className="contrastAlert good">
                <TaskAltIcon />
                <span>Ambas paletas de colores contrastan excelente</span>
            </div>
        }
    }
}

const Customization = () => {
    const { newConfig, editProp } = useConfig()
    const [oneColorMode, setOneColorMode] = useState(!newConfig?.customization.twoColors)

    useEffect(() => {
        document.querySelector(".editorContainer")?.scrollTo(0, 0)
    }, [])

    if (!newConfig) return (<></>)

    const style = () => {
        return (
            <style>
                {`
                        .nextMonthsCont .MuiSelect-select{
                            color:white;
                        }
                        .nextMonthsCont fieldset,
                        .nextMonthsCont .MuiInputBase-root:hover fieldset {
                            border-color:white !important;
                        }
                        .nextMonthsCont .MuiInputBase-root {
                            height:2rem !important;
                        }
                        .nextMonthsCont .MuiSvgIcon-root{
                            fill:white;
                        }
                    `}
            </style>
        )
    }

    return (
        <div className="mainContainer">
            {style()}
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

                {RenderTextRow("Título", newConfig.texts.presentationTitle, "texts.presentationTitle", false, 45)}
                {RenderTextRow("Texto de presentación", newConfig.texts.presentationText, "texts.presentationText", false, 280)}
                {RenderTextRow("Texto del Footer", newConfig.texts.footer, "texts.footer", true, 45)}

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
                Extras
            </span>
            <div className="blackLayout">
                <div className="nextMonthsCont">
                    <span>Seleccione los botones flotantes que desea ver en su página</span>
                    <Select
                        labelId="disabled-option"
                        id="disabled-select"
                        value={newConfig?.customization?.floatButtons ?? "Ninguno"}
                        onChange={(e) => {
                            e.preventDefault()
                            editProp("customization.floatButtons", e.target.value)
                        }}
                        variant='outlined'
                    >
                        {["Ninguno", "Todos", "Solo Whatsapp", "Solo turnos"].map((fButtOption: string) =>
                            <MenuItem key={fButtOption} value={fButtOption}>{fButtOption}</MenuItem>
                        )}
                    </Select>
                </div>
            </div>
            <span className="proxApo">
                <div className="switchColorMode">
                    <span>Paleta de colores</span>
                    <Stack className="switchOptions" direction="row" spacing={1} alignItems="center">
                        <span>Simple</span>
                        <Switch checked={!oneColorMode} onChange={() => {
                            editProp("customization.twoColors", oneColorMode)
                            setOneColorMode((prev) => !prev)
                        }} />
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
                {contrastInfo(checkColorContrast(newConfig.customization.primary.color, newConfig.customization.primary.text), checkColorContrast(newConfig.customization.secondary.color, newConfig.customization.secondary.text), oneColorMode)}
            </span>
        </div>
    )
}

export default Customization