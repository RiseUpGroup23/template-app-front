import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { style } from "./EditTextModal"
import "./Modals.css"
import { arrowIco } from '../Sections/MainEditor';
import { CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    message: string;
    action: () => void;
    customTrigger?: any;
}

const DeleteModal = ({ message, action, customTrigger }: Props) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleOpen = () => {
        setLoading(false)
        setOpen(true)
    };
    const handleClose = (reason?: string) => reason !== "backdropClick" && setOpen(false);

    return (
        <>
            <div onClick={handleOpen}>
                {!customTrigger ? <div className="rowButtonAction" >
                    <div className="rowButtonAction">
                        <DeleteIcon style={{width: "37", height: "37"}}/>
                    </div>
                </div> : customTrigger}
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
                        {message}
                    </Typography>
                    <div className="modalButtons">
                        <button className="backModal" onClick={() => handleClose()}>{arrowIco(90)}Volver</button>
                        <button className="cancelModal" onClick={async () => {
                            setLoading(true)
                            await action()
                            handleClose()
                        }}>
                            {!loading ? "Confirmar" : <CircularProgress size={20} sx={{ color: "white" }} />}
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default DeleteModal


