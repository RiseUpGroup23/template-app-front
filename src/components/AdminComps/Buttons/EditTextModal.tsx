import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MDEditor, { commands } from "@uiw/react-md-editor";
import { arrowIco } from '../Sections/MainEditor';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import "./Modals.css"
import { useConfig } from '../../../context/AdminContext';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
    initialTitle: string;
    prop: string;
    noMD?: boolean;
}

export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "75vw",
    maxWidth: "600px",
    bgcolor: '#2E2E2E;',
    color: "#fff",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    alignItems: "center",
    borderRadius: "1rem",
    maxHeight: "75vh",
    overflowY: "auto",
    overflowX: "hidden"
};

const EditTextModal = ({ initialTitle, prop, noMD = false }: Props) => {
    const [value, setValue] = React.useState(initialTitle);
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
            <div className="rowButtonAction" onClick={handleOpen}>
                <EditIcon style={{ width: "37", height: "37" }} />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="closeIcon" onClick={handleClose}><CloseIcon /></div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Editar título
                    </Typography>
                    <div data-color-mode="light" style={{ width: "100%" }}>
                        <MDEditor
                            height={200}
                            value={value}
                            onChange={(text) => setValue(text ?? "")}
                            commands={noMD ? [] : [commands.bold, commands.italic, commands.strikethrough]}
                            extraCommands={[]}
                        />
                    </div>
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

export default EditTextModal