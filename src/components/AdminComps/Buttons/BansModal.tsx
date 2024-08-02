import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { arrowIco } from '../Sections/MainEditor';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import "./Modals.css"
import { useConfig } from '../../../context/AdminContext';
import { style } from "./EditTextModal"
import { BannedDay } from '../../../typings/ConfigFile';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
    ban: BannedDay;
    index?: number;
    customTrigger?: any
}

function replaceValueAtIndex(array: BannedDay[], index: number, value: any) {
    if (index >= 0 && index < array.length) {
        const newArray = [...array];
        newArray[index] = value;
        return newArray;
    } else {
        return array;
    }
}


const BansModal = ({ ban, index, customTrigger }: Props) => {
    const [value, setValue] = React.useState({
        ...ban,
        date: ban.date ? new Intl.DateTimeFormat('es', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date(ban.date)) : ""
    });
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const { editProp, config } = useConfig()


    const handleOpen = () => {
        setValue({
            ...ban,
            date: ban.date ? new Intl.DateTimeFormat('es', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date(ban.date)) : ""
        })
        setOpen(true)
    };
    const handleClose = (reason?: string) => reason !== "backdropClick" && setOpen(false);

    const handleSave = () => {
        setLoading(true)
        setTimeout(() => {
            const parts = value.date.split("/")
            if (customTrigger) {
                editProp("appointment.bannedDays", config?.appointment.bannedDays.concat({
                    ...value,
                    date: new Date(`${parts[1]}/${parts[0]}/${parts[2]}`)
                }))
            } else {
                if (!config || index === undefined) return;
                const oldArray = config.appointment.bannedDays
                const newData = replaceValueAtIndex(oldArray, index, {
                    ...value,
                    date: new Date(`${parts[1]}/${parts[0]}/${parts[2]}`)
                })
                editProp("appointment.bannedDays", newData)
            }
            setLoading(false)
            setOpen(false)
        }, 2000)
    }

    const handleDate = (e: any) => {
        let newValue = e.target.value
        const regexFecha = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
        if (newValue.length < 10) setError(false)
        if (value.date.length < newValue.length) {
            if (newValue.length > 10) return
            if (newValue.length === 3 && !newValue.includes(":")) {
                newValue = newValue.slice(0, 2) + "/" + newValue.charAt(2)
            }
            if (newValue.length === 5 && !newValue.includes(":")) {
                newValue = newValue.slice(0, 5) + "/" + newValue.charAt(5)
            }
            if (newValue.length >= 1 && newValue !== "0" && !Number(newValue.slice(0, 2))) return
        }
        if (newValue.length >= 10) {
            setError(!regexFecha.test(newValue))
        }
        setValue((prev) => ({
            ...prev,
            date: newValue
        }))
    }

    return (
        <>
            <div className="rowButtonAction" onClick={handleOpen}>
                {!customTrigger ?
                    <EditIcon style={{width: "37", height: "37"}}/>
                    :
                    customTrigger}
            </div>
            <Modal
                open={open}
                onClose={(e, reason) => handleClose(reason)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="closeIcon" onClick={() => handleClose()}><CloseIcon /></div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Editar excepción
                    </Typography>
                    <div className="textInModal">
                        <span>Fecha: (DD/MM/AAAA)</span>
                        <input className={error ? "availabilityError" : ""} type='text' value={value.date} onChange={(e) => handleDate(e)} />
                    </div>
                    <div className="textInModal">
                        <span>Título/nombre: </span>
                        <input type='text' value={value.title} onChange={(e) => setValue(prev => ({ ...prev, title: e.target.value }))} />
                    </div>
                    <div className="modalButtons">
                        <button className="backModal" onClick={() => handleClose()}>{arrowIco(90)}Volver</button>
                        <button className={`confirmModal ${error || !(value?.date?.length >= 10) || !(value?.title?.length >= 1) ? "buttonDisabled" : ""}`} onClick={handleSave}>
                            {!loading ? "Guardar" : <CircularProgress size={20} sx={{ color: "black" }} />}
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default BansModal