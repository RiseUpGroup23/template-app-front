import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { arrowIco } from '../Sections/MainEditor';
import CloseIcon from '@mui/icons-material/Close';
import { style } from "./EditTextModal"
import CircularProgress from '@mui/material/CircularProgress';
import "./Modals.css"
import uploadImage from '../utils/uploadImage';
import { useConfig } from '../../../context/AdminContext';
import EditIcon from '@mui/icons-material/Edit';
import { Alert } from '@mui/material';

interface Props {
    initialImg: string;
    prop: string;
    customTrigger?: any;
}

const ImageEditModal = ({ initialImg, prop, customTrigger }: Props) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [src, setSrc] = useState(initialImg)
    const [errorMessage, setErrorMessage] = React.useState("")
    const { editProp } = useConfig()

    const handleOpen = () => setOpen(true);
    const handleClose = (reason?: string) => {
        if (reason === "backdropClick") return
        setSrc(initialImg)
        setSelectedImage(null)
        setErrorMessage("")
        setLoading(false)
        setOpen(false)
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const maxSize = 2 * 1024 * 1024;
        if (file) {
            if (file.size > maxSize) {
                return setErrorMessage("La imagen supera los 2MB, por favor seleccione una más pequeña")
            }
            setErrorMessage("")
            setSelectedImage(file);
            const imageUrl = URL.createObjectURL(file);
            setSrc(imageUrl);
        }
    };

    const handleDrag = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const handleSave = async () => {
        if (!selectedImage) {
            return handleClose()
        }
        setLoading(true)
        try {
            const imageUrl = await uploadImage(selectedImage)
            await editProp(prop, imageUrl)
            handleClose()
        } catch (error) {
            console.error("Error al guardar imagen", error);
            handleClose()
        }
    };

    return (
        <>
            {customTrigger ?
                <div onClick={handleOpen}>
                    {customTrigger}
                </div>
                :
                <div className="rowButtonAction" onClick={handleOpen}>
                    <EditIcon style={{ width: "37", height: "37" }} />
                </div>
            }
            <Modal
                open={open}
                onClose={(e, reason) => handleClose(reason)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="closeIcon" onClick={() => handleClose()}><CloseIcon /></div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Editar imagen
                    </Typography>
                    <div className='dragContainer'>
                        <img className='editBoxImage' src={src as string} alt="editImagePreview" />
                        <label
                            htmlFor="images"
                            className="drop-container"
                            id="dropcontainer"
                            onDragOver={handleDrag}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={(event) => {
                                handleDrag(event)
                                const file = event.dataTransfer.files[0];
                                if (file) {
                                    setSelectedImage(file);
                                    const imageUrl = URL.createObjectURL(file);
                                    setSrc(imageUrl);
                                }
                            }}
                        >
                            <span className="drop-title">Arrastrar un archivo aquí</span>
                            o
                            <input type="file" id="images" accept="image/*" required onChange={handleImageChange} />
                        </label>
                    </div>
                    {errorMessage !== "" && <div className="avaAlert">
                        <Alert severity="error">{errorMessage}</Alert>
                    </div>}
                    <div className="modalButtons">
                        <button className="backModal" onClick={() => handleClose()}>{arrowIco(90)}Volver</button>
                        <button className={`confirmModal ${!selectedImage ? "buttonDisabled" : ""}`} onClick={handleSave}>
                            {!loading ? "Guardar" : <CircularProgress size={20} sx={{ color: "black" }} />}
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ImageEditModal