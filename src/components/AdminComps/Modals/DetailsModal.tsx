import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./Modals.css"
import { style } from "./EditTextModal"
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useConfig } from '../../../context/AdminContext';
import { CircularProgress } from "@mui/material";
import { arrowIco } from '../Sections/MainEditor';
import DeleteModal from './DeleteModal';
import EditAppointment from './EditAppointment';

interface Props {
    children: any;
    appointment: any;
}

const DetailsModal = ({ children, appointment }: Props) => {
    const [open, setOpen] = React.useState(false);
    const { dbUrl, cancelAppointment } = useConfig()
    const [appointmentData, setAppointmentData] = React.useState<any>();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (reason?: string) => {
        if (reason === "backdropClick") return
        setOpen(false)
    };

    React.useEffect(() => {
        if (open) {
            axios(`${dbUrl}/appointments/${appointment}`).then((response) => {
                setAppointmentData(response.data);
            }).catch((error) => {
                console.error(error);
            });
        }
        //eslint-disable-next-line
    }, [open]);

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
                    <div className="closeIcon" onClick={() => handleClose()}><CloseIcon /></div>
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
                                <span>Nombre: </span>
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
                            <div className="modalButtons">
                                <button className="backModal" onClick={() => handleClose()}>{arrowIco(90)}Volver</button>
                                <div className="detailsButtons">
                                    <DeleteModal message="¿Desea cancelar este turno?" action={() => cancelAppointment(appointmentData._id)} />
                                    <EditAppointment id={appointmentData._id} />
                                </div>
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
