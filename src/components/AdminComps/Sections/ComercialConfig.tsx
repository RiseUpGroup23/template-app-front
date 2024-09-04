import { useEffect, useState } from "react";
import { useConfig } from "../../../context/AdminContext"
import { RenderBanRow } from "../Rows/rows";
import { arrowIco } from "./MainEditor";
import AddIcon from '@mui/icons-material/Add';
import BansModal from "../Modals/BansModal";
import { BannedDay } from "../../../typings/ConfigFile";
import { MenuItem, Select, Stack, Switch } from "@mui/material";

const ComercialConfig = () => {
    const pageStep = 4
    const { config, newConfig, editProp, isMpConfigured } = useConfig()
    const [visibleItems, setVisibleItems] = useState(pageStep);
    const [mpEnabled, setMpEnabled] = useState(config?.appointment.mercadoPago || false)

    useEffect(() => {
        document.querySelector(".editorContainer")?.scrollTo(0, 0)
    }, [])

    const handleSeeMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + pageStep);
    };

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

    if (!config || !newConfig) return <></>
    return (
        <div className="mainContainer">
            {style()}
            <span className="initialTitle">¡Hola, <strong>{config.customization.shopName}!</strong></span>
            <span className="proxApo">
                Editar fechas no laborables
            </span>
            <div className="blackLayout">
                <div className="proxApoHeader rowContainer">
                    <div className="rowItem" style={{ width: "35%" }}><span>Fecha</span></div>
                    <div className="rowItem" style={{ width: "40%" }}><span>Nombre</span></div>
                    <div className="rowItem" style={{ width: "25%" }}><span>Editar</span></div>
                </div>
                {
                    newConfig.appointment.bannedDays.length ?
                        newConfig.appointment.bannedDays.slice(0, visibleItems).map((e, index) => RenderBanRow(e, index))
                        :
                        <div className="noData">
                            No hay excepciones configuradas
                        </div>
                }
            </div>
            <div className="addSection">
                {newConfig?.appointment?.bannedDays?.length > visibleItems && (
                    <button className="seeAllButton" onClick={handleSeeMore}>
                        Ver más
                        {arrowIco(0)}
                    </button>
                )}
                <BansModal ban={{} as BannedDay} customTrigger={
                    <button className="newProfButton">
                        <AddIcon />
                    </button>
                } />
            </div>
            <span className="proxApo">
                Cobros
            </span>
            <div className="blackLayout">
                <div className="mpSwitcher">
                    <span>Cobro por MercadoPago</span>
                    {isMpConfigured && <Stack className="mpSwitch" direction="row" spacing={1} alignItems="center">
                        <span className="mpSwitchText">Habilitar</span>
                        <Switch checked={mpEnabled} onChange={() => {
                            setMpEnabled((prev) => {
                                editProp("appointment.mercadoPago", !prev)
                                return !prev
                            })
                        }} />
                    </Stack>}
                </div>
                <div className="mpInfo">
                    {isMpConfigured ?
                        "(Si deshabilitas esta opción, los turnos se reservarán sin costo)"
                        :
                        "No está asociada su cuenta de MercadoPago, comunicarse con soporte para activarlo"
                    }
                </div>
            </div>
            <span className="proxApo">
                Turnos
            </span>
            <div className="blackLayout">
                <div className="nextMonthsCont">
                    <span>Selecciona cuántos meses en el futuro los usuarios tienen permitido hacer reservas.</span>
                    <Select
                        labelId="disabled-option"
                        id="disabled-select"
                        value={newConfig?.appointment?.nextMonths ?? 2}
                        onChange={(e) => {
                            e.preventDefault()
                            editProp("appointment.nextMonths", e.target.value)
                        }}
                        variant='outlined'
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) =>
                            <MenuItem key={month} value={month}>{month} {month === 1 ? "mes" : "meses"}</MenuItem>
                        )}
                    </Select>
                </div>

                <div className="nextMonthsCont">
                    <span>Selecciona cuánto tiempo antes pueden cancelar o reprogramar la reserva los usuarios</span>
                    <Select
                        labelId="disabled-option"
                        id="disabled-select"
                        value={newConfig?.appointment?.cancellationWindow ?? 24}
                        onChange={(e) => {
                            e.preventDefault()
                            editProp("appointment.cancellationWindow", e.target.value)
                        }}
                        variant='outlined'
                    >
                        {[2, 4, 6, 12, 24, 48, 72, "No cancelar", "Libre"].map((timeOption: string | number) =>
                            <MenuItem key={timeOption} value={timeOption}>{timeOption} {typeof timeOption === "number" ? "horas" : ""}</MenuItem>
                        )}
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default ComercialConfig