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
import { HexColorPicker } from 'react-colorful';

interface Props {
    initialColor: string;
    prop: string;
}

const EditColorModal = ({ initialColor, prop }: Props) => {
    const [value, setValue] = React.useState(initialColor);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { editProp } = useConfig()

    const handleSave = () => {
        setLoading(true)
        setTimeout(() => {
            editProp(prop, value)
            setLoading(false)
            setOpen(false)
        }, 2000)
    }

    return (
        <>
            <div onClick={handleOpen} className="colorDemo" style={{ background: `${initialColor}` }}></div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="closeIcon" onClick={handleClose}><CloseIcon /></div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Editar color
                    </Typography>
                    <HexColorPicker color={value} onChange={setValue} />
                    <div className="modalButtons">
                        <button className="backModal" onClick={handleClose}>{arrowIco(90)}Volver</button>
                        <button className="confirmModal" onClick={handleSave}>
                            {!loading ? "Guardar" : <CircularProgress size={20} sx={{ color: "black" }} />}
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default EditColorModal