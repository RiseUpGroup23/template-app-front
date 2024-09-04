import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./Modals.css"
import { style } from "./EditTextModal"
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useConfig } from '../../../context/AdminContext';
import { CircularProgress, IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { arrowIco } from '../Sections/MainEditor';
import DeleteModal from './DeleteModal';
import EditAppointment from './EditAppointment';

interface Props {
    children: any;
    appointment: any;
    refetch: () => void;
}

const DetailsModal = ({ children, appointment, refetch }: Props) => {
    const [open, setOpen] = React.useState(false);
    const { dbUrl, cancelAppointment } = useConfig()
    const [appointmentData, setAppointmentData] = React.useState<any>();
    const [note, setNote] = React.useState({
        edit: false,
        value: appointment?.note ?? ""
    });
    const [edited, setEdited] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const handleOpen = () => {
        setEdited(false)
        setOpen(true);
    };

    const handleClose = (reason?: string) => {
        if (reason === "backdropClick" || loading) return
        edited && refetch()
        setOpen(false)
    };

    React.useEffect(() => {
        if (open) {
            axios(`${dbUrl}/appointments/${appointment}`).then((response) => {
                setAppointmentData(response.data);
                setNote({ edit: false, value: response.data.note ?? "" })
            }).catch((error) => {
                console.error(error);
            });
        }
        //eslint-disable-next-line
    }, [open]);

    const saveNote = () => {
        setLoading(true)
        setEdited(true)
        axios.put(`${dbUrl}/appointments/${appointmentData._id}`, { ...appointmentData, note: note.value }).then(() => {
            setLoading(false)
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <>
            <div onClick={handleOpen} className='detailsModalTrigger'>
                {children}
            </div>
            <Modal
                open={open}
                onClose={(e, reason) => handleClose(reason)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {!loading && <div className="closeIcon" onClick={() => handleClose()}><CloseIcon /></div>}
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Datos del turno
                    </Typography>
                    {appointmentData ?
                        <>
                            <div className="detailsText">
                                <span>Nombre: </span>
                                <strong>{appointmentData.customer.name} {appointmentData.customer.lastname ?? ""}</strong>
                            </div>
                            <div className="detailsText">
                                <span>Teléfono: </span>
                                <strong>{appointmentData.customer.phoneNumber}</strong>
                            </div>
                            <div className="detailsText">
                                <span>Fecha: </span>
                                <strong>{new Date(appointmentData.date).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })}</strong>
                            </div>
                            <div className="detailsText">
                                <span>Hora: </span>
                                <strong>{appointmentData.date.split("T")[1].slice(0, 5)}</strong>
                            </div>
                            <div className="detailsText">
                                <span>Sevicio: </span>
                                <strong>{appointmentData.typeOfService.name}</strong>
                            </div>
                            <div className="detailsText">
                                <span>Profesional: </span>
                                <strong>{appointmentData.professional.name} {appointmentData.professional.lastname ?? ""}</strong>
                            </div>
                            <div className="detailsText">
                                <span>Nota: </span>
                                <div className="detailsNote">
                                    {note.edit ?
                                        <input
                                            type="text"
                                            className="noteInput"
                                            value={note.value}
                                            onChange={(e) => setNote({ ...note, value: e.target.value })}
                                        />
                                        :
                                        <strong>{note.value !== "" ? note.value : "-"}</strong>
                                    }
                                    <IconButton sx={{ p: '10px' }} onClick={() => {
                                        setNote((prev) => {
                                            if (prev.edit) {
                                                saveNote()
                                            }
                                            return ({ ...prev, edit: !prev.edit })
                                        })
                                    }}>
                                        {note.edit ?
                                            <CheckIcon sx={{ color: '#C2E36D' }} /> : <EditNoteIcon sx={{ color: '#C2E36D' }} />
                                        }
                                    </IconButton>
                                </div>
                            </div>
                            <div className="modalButtons">
                                <button className="backModal" onClick={() => handleClose()}>{
                                    loading ?
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 75 }}>
                                            <CircularProgress size={30} sx={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center" }} />
                                        </div>
                                        :
                                        <>
                                            {arrowIco(90)} Volver
                                        </>
                                }</button>
                                {!appointmentData.disabled && <div className="detailsButtons">
                                    <DeleteModal message="¿Desea cancelar este turno?" action={() => cancelAppointment(appointmentData._id)} />
                                    <EditAppointment id={appointmentData._id} />
                                </div>}
                            </div>
                        </>
                        :
                        <div style={{ minHeight: 200, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <CircularProgress size={40} sx={{ color: "white" }} />
                        </div>}
                </Box>
            </Modal>
        </>
    );
}

export default DetailsModal;
