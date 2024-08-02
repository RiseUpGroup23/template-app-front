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
<<<<<<< HEAD
import EditIcon from '@mui/icons-material/Edit';
=======
import { Alert } from '@mui/material';
>>>>>>> 1fbbe7436b8a1f96e52111e0c310067342b72945

interface Props {
    initialTitle: string;
    prop: string;
    noMD?: boolean;
    limit?: false | number;
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

const EditTextModal = ({ initialTitle, prop, noMD = false, limit = false }: Props) => {
    const [value, setValue] = React.useState(initialTitle);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("")
    const { editProp } = useConfig()

    const handleOpen = () => setOpen(true);

    const handleClose = (reason?: string) => {
        if (reason === "backdropClick") return
        setValue(initialTitle || "")
        setErrorMessage("")
        setOpen(false)
    };

    const handleSave = () => {
        setLoading(true)
        setTimeout(() => {
            editProp(prop, value)
            setLoading(false)
            setOpen(false)
        }, 2000)
    }

    const handleText = (text: string) => {
        setValue(text ?? "")
        if (limit && text.length > limit) {
            setErrorMessage(`Este texto solo puede tener hasta ${limit} caractéres`)
        } else {
            setErrorMessage("")
        }
    }

    return (
        <>
            <div className="rowButtonAction" onClick={handleOpen}>
                <EditIcon style={{ width: "37", height: "37" }} />
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
                        Editar texto
                    </Typography>
                    <div data-color-mode="light" style={{ width: "100%" }}>
                        <MDEditor
                            height={200}
                            value={value}
                            onChange={(text) => handleText(text || "")}
                            commands={noMD ? [] : [commands.bold, commands.italic, commands.strikethrough]}
                            extraCommands={[]}
                        />
                    </div>
                    {errorMessage !== "" && <div className="avaAlert">
                        <Alert severity="error">{errorMessage}</Alert>
                    </div>}
                    <div className="modalButtons">
                        <button className="backModal" onClick={() => handleClose()}>{arrowIco(90)}Volver</button>
                        <button className={`confirmModal ${limit && value.length > limit ? "buttonDisabled" : ""}`} onClick={handleSave}>
                            {!loading ? "Guardar" : <CircularProgress size={20} sx={{ color: "black" }} />}
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default EditTextModal