import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import "./Modals.css"
import { style } from "./EditTextModal"
import { useState } from 'react';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import downloadExcel from '../utils/downloadExcel';

interface Props {
    conflicts: any[],
    saveFunction: (solution: string) => void;
}

const ModalConflicts = ({ conflicts, saveFunction }: Props) => {
    const [loading, setLoading] = useState(false)
    const [solution, setSolution] = useState("")

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = event.target;
        setSolution(id);
    };

    const handleSave = () => {
        if (solution === "close") {
            alert("close")
        } else {
            setLoading(true)
            saveFunction(solution)
        }
    }

    return (
        <Modal
            open={conflicts.length ? true : false}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Resolver conflictos
                </Typography>
                <span className="conflictsText">
                    Hay turnos pendientes que quedan fuera del nuevo rango de horario, que desea hacer con ellos?
                </span>
                <div className="conflictsOptions">
                    <div>
                        <input checked={solution === "cancel"} onChange={handleCheck} type='checkbox' id={`cancel`} />
                        <label htmlFor={`cancel`}>Cancelar todos los turnos con conflictos</label>
                    </div>
                    <div>
                        <input checked={solution === "skip"} onChange={handleCheck} type='checkbox' id={`skip`} />
                        <label htmlFor={`skip`}>Omitir cambio de horarios y guardar el resto de cambios</label>
                    </div>
                    <div>
                        <input checked={solution === "close"} onChange={handleCheck} type='checkbox' id={`close`} />
                        <label htmlFor={`close`}>No guardar ningún cambio</label>
                    </div>
                </div>
                <div className="modalButtons">
                    <button className="backModal" onClick={() => {
                        downloadExcel(conflicts)
                    }}>
                        <BackupTableIcon />
                        Descargar excel
                    </button>
                    <button className={`confirmModal ${!solution ? "buttonDisabled" : ""}`} onClick={() => handleSave()}>
                        {!loading ? "Guardar" : <CircularProgress size={20} sx={{ color: "black" }} />}
                    </button>
                </div>
            </Box>
        </Modal>
    )
}

export default ModalConflicts