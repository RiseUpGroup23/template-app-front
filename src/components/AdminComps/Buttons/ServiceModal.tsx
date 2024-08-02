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
import { TypeOfService } from '../../../typings/TypeOfServices';
import axios from 'axios';
import uploadImage from '../utils/uploadImage';
import { duration } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


interface Props {
    service: TypeOfService;
    customTrigger?: any
}

const ServiceModal = ({ service, customTrigger }: Props) => {
    const [srvc, setSrvc] = React.useState(service)
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
    const [src, setSrc] = React.useState(service.image || "https://iconape.com/wp-content/png_logo_vector/settings.png")
    const { editService, fetchServices, setAlert, dbUrl } = useConfig()
    const [disabled, setDisabled] = React.useState(true)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        setDisabled(Object.values(srvc).length < 3 || Object.values(srvc).some((e) => e === ""))
    }, [srvc])

    const handleSave = async () => {
        setLoading(true)
        const newData = { ...srvc, image: selectedImage ? await uploadImage(selectedImage).catch(() => srvc.image) : (srvc.image || src) }

        if (!customTrigger) {
            editService(service._id, newData).then(() => {
                setLoading(false)
                setOpen(false)
            })
        } else {
            await axios.post(`${dbUrl}/typesOfServices`, newData).then(() => {
                fetchServices()
                setAlert({
                    type: "success",
                    msg: "Se creó el servicio con éxito"
                })
            }).catch(() => {
                setAlert({
                    type: "error",
                    msg: "Hubo un error al crear el servicio"
                })
            })
            setLoading(false)
            setOpen(false)
        }
    }

    const handleDrag = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const imageUrl = URL.createObjectURL(file);
            setSrc(imageUrl);
        }
    };

    return (
        <>
            <div className="rowButtonAction" onClick={handleOpen}>
                {
                    !customTrigger ?
                        <EditIcon style={{ width: "37", height: "37" }} />
                        :
                        customTrigger
                }
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
                        Editar servicio
                    </Typography>

                    <div className="textInModal">
                        <span>Nombre: </span>
                        <input type='text' value={srvc.name} onChange={(e) => setSrvc((prev) => ({ ...prev, name: e.target.value }))} />
                    </div>

                    <div className="textInModal">
                        <span>Duracion (min): </span>
                        <input type='text' value={srvc.duration} onChange={(e) => setSrvc((prev) => ({ ...prev, duration: Number(e.target.value) || e.target.value === "" ? Number(e.target.value) : prev.duration }))} />
                    </div>

                    <div className="textInModal">
                        <span>Precio: </span>
                        <input type='text' value={srvc.price} onChange={(e) => setSrvc((prev) => ({ ...prev, price: Number(e.target.value) || e.target.value === "" ? Number(e.target.value) : prev.price }))} />
                    </div>

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

                    <div className="modalButtons">
                        <button className="backModal" onClick={handleClose}>{arrowIco(90)}Volver</button>
                        <button className={`confirmModal ${disabled ? "buttonDisabled" : ""}`} onClick={handleSave}>
                            {!loading ? "Guardar" : <CircularProgress size={20} sx={{ color: "black" }} />}
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ServiceModal