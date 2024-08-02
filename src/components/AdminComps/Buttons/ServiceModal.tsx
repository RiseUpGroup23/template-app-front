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
<<<<<<< HEAD
import { duration } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

=======
import { Alert } from '@mui/material';
>>>>>>> 1fbbe7436b8a1f96e52111e0c310067342b72945

interface Props {
    service: TypeOfService;
    customTrigger?: any
}

const ServiceModal = ({ service, customTrigger }: Props) => {
    const defaultImg = service.image || "https://iconape.com/wp-content/png_logo_vector/settings.png"
    const [srvc, setSrvc] = React.useState(service)
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
    const [src, setSrc] = React.useState(defaultImg)
    const { editService, fetchServices, setAlert, dbUrl } = useConfig()
    const [disabled, setDisabled] = React.useState(true)
    const [errorMessage, setErrorMessage] = React.useState({
        duration: "",
        image: ""
    })

    const handleOpen = () => setOpen(true);

    const handleClose = (reason?: string) => {
        if (reason === "backdropClick") return
        setSrvc(service ?? ({} as TypeOfService))
        setErrorMessage({
            duration: "",
            image: ""
        })
        setSrc(defaultImg)
        setSelectedImage(null)
        setOpen(false)
    };

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
        const maxSize = 2 * 1024 * 1024;
        if (file) {
            if (file.size > maxSize) {
                return setErrorMessage(prev => ({ ...prev, image: "La imagen supera los 2MB, por favor seleccione una más pequeña" }))
            }
            setErrorMessage(prev => ({ ...prev, image: "" }))
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
                onClose={(e, reason) => handleClose(reason)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="closeIcon" onClick={() => handleClose()}><CloseIcon /></div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Editar servicio
                    </Typography>

                    <div className="textInModal">
                        <span>Nombre: </span>
                        <input type='text' value={srvc.name} onChange={(e) => setSrvc((prev) => ({ ...prev, name: e.target.value }))} />
                    </div>

                    <div className="textInModal">
                        <span>Duracion (min): </span>
                        <input type='number' value={srvc.duration === 0 ? "" : srvc.duration}
                            onChange={(e) => {
                                if (Number(e.target.value) && (Number(e.target.value) < 5 || Number(e.target.value) > 480)) {
                                    setErrorMessage((prev) => ({ ...prev, duration: "La duración de un servicio solo puede ser un valor entre 5min y 480min" }))
                                } else {
                                    setErrorMessage((prev) => ({ ...prev, duration: "" }))
                                }
                                setSrvc((prev) => ({ ...prev, duration: Number(e.target.value) }))
                            }
                            }
                        />
                    </div>

                    <div className="textInModal">
                        <span>Precio: </span>
                        <input type='number' value={srvc.price === 0 ? "" : srvc.price}
                            onChange={(e) => {
                                if (!Number(e.target.value)) {
                                    setErrorMessage((prev) => ({ ...prev, price: "El precio debe ser un número válido" }))
                                } else {
                                    setErrorMessage((prev) => ({ ...prev, price: "" }))
                                }
                                setSrvc((prev) => ({ ...prev, price: Number(e.target.value) }))
                            }
                            }
                        />
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

                    {Object.values(errorMessage).some(e => e !== "") ?
                        <div className="avaAlert">
                            <Alert severity="error">{Object.values(errorMessage).find(e => e !== "")}</Alert>
                        </div>
                        :
                        (Object.values(srvc).length < 3 ?
                            <div className="avaAlert">
                                <Alert severity="error">Todos los campos deben ser completados</Alert>
                            </div>
                            :
                            <></>
                        )
                    }

                    <div className="modalButtons">
                        <button className="backModal" onClick={() => handleClose()}>{arrowIco(90)}Volver</button>
                        <button className={`confirmModal ${disabled || Object.values(errorMessage).some(e => e !== "") ? "buttonDisabled" : ""}`} onClick={handleSave}>
                            {!loading ? "Guardar" : <CircularProgress size={20} sx={{ color: "black" }} />}
                        </button>
                    </div>
                </Box>
            </Modal >
        </>
    )
}

export default ServiceModal