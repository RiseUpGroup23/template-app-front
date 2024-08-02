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
import { Professional } from '../../../typings/Professional';
import axios from 'axios';
import uploadImage from '../utils/uploadImage';
import { Alert, useMediaQuery } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
    professional: Professional;
    customTrigger?: any;
}

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const mock = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const defaultTimeAvailabilities: any = {};

mock.forEach(day => {
    defaultTimeAvailabilities[day] = {
        initialHour: "08:00",
        finalHour: "13:00",
        secondInitialHour: "15:00",
        secondFinalHour: "21:00",
        active: true
    };
});

const hourToNumber = (hour: string) => {
    return Number(hour.replace(":", ""))
}

const ProfessionalModal = ({ professional, customTrigger }: Props) => {
    const { setAlert, fetchProfessionals, services, dbUrl } = useConfig()
    const [prof, setProf] = React.useState(professional)
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
    const [src, setSrc] = React.useState(professional.image || "https://static-00.iconduck.com/assets.00/profile-default-icon-512x511-v4sw4m29.png")
    const [disabled, setDisabled] = React.useState(true)
    const isMobile = useMediaQuery('(max-width:600px)');
    const [error, setError] = React.useState<any>({})
    const [errorMessage, setErrorMessage] = React.useState("")


    const handleOpen = () => {
        setProf({
            ...professional,
            timeAvailabilities: professional?.timeAvailabilities?.monday ? professional.timeAvailabilities : defaultTimeAvailabilities
        })
        setOpen(true)
    };

    const handleClose = () => {
        setProf({} as Professional)
        setOpen(false)
    };

    React.useEffect(() => {
        setDisabled(Object.values(prof).length < 6 || Object.values(prof).some((e) => e === ""))
        prof?.timeAvailabilities && Object.keys(prof.timeAvailabilities).forEach(day => {
            const thisDay = prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities]
            const inicioM = hourToNumber(thisDay.initialHour)
            const finM = hourToNumber(thisDay.finalHour)
            const inicioT = hourToNumber(thisDay.secondInitialHour)
            const finT = hourToNumber(thisDay.secondFinalHour)
            setError((prev: any) => ({
                ...prev,
                [day]: {
                    ...prev[day],
                    initialHour: false
                }
            }))
            if (thisDay.initialHour.length !== 5 || thisDay.finalHour.length !== 5 || thisDay.secondInitialHour.length !== 5 || thisDay.secondFinalHour.length !== 5) return setDisabled(true)
            if (inicioM >= finM || inicioM >= inicioT || inicioM >= finT || finM >= inicioT || finM >= finT || inicioT >= finT) {
                setError((prev: any) => ({
                    ...prev,
                    [day]: true
                }))
                setErrorMessage(`El día ${diasSemana[mock.indexOf(day)]} tiene errores, revisar que los horarios vayan de menor a mayor`)
            }
            if (inicioM >= 2400 || finM >= 2400 || inicioT >= 2400 || finT >= 2400) {
                setError((prev: any) => ({
                    ...prev,
                    [day]: true
                }))
                setErrorMessage(`El día ${diasSemana[mock.indexOf(day)]} tiene errores, revisar que los horarios sean válidos`)
            }
        })
    }, [prof])

    const handleSave = async () => {
        setLoading(true)
        const newData = { ...prof, image: selectedImage ? await uploadImage(selectedImage).catch(() => prof.image) : (prof.image || src) }
        if (customTrigger) { // Creando nuevo
            await axios.post(`${dbUrl}/professionals`, newData).then(() => {
                fetchProfessionals()
                setAlert({
                    type: "success",
                    msg: "Se creó el profesional con éxito"
                })
            }).catch(() => {
                setAlert({
                    type: "error",
                    msg: "Hubo un error al crear el profesional"
                })
            })
        } else {
            await axios.put(`${dbUrl}/professionals/${prof._id}`, newData).then(() => {
                fetchProfessionals()
                setAlert({
                    type: "success",
                    msg: "Se actualizó el profesional con éxito"
                })
            }).catch(() => {
                setAlert({
                    type: "error",
                    msg: "Hubo un error al actualizar el profesional"
                })
            })
        }
        setLoading(false)
        setOpen(false)
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

    const handleCheck = (serviceId: string) => {
        setProf((prev) => {
            const serviceExists = prev.typesOfServices?.some(ser => ser._id === serviceId);

            if (serviceExists) {
                return ({
                    ...prev,
                    typesOfServices: prev.typesOfServices.filter(ser => ser._id !== serviceId)
                } as Professional)
            } else {
                return ({
                    ...prev,
                    typesOfServices: [...prev.typesOfServices || [], services!.find(ser => ser._id === serviceId)]
                } as Professional)
            }
        });
    };

    const changeAvailability = (value: string, day: string, prop: string) => {
        let newValue = value
        if (value.length > 5) return
        setErrorMessage("")
        if (value.length === 3 && !value.includes(":")) {
            newValue = newValue.slice(0, 2) + ":" + value.charAt(2)
        }
        if (newValue.length >= 1 && newValue !== "0" && !Number(newValue.slice(0, 2))) return
        setProf(prev => (
            {
                ...prev,
                timeAvailabilities: {
                    ...prev.timeAvailabilities,
                    [day]: {
                        ...prev.timeAvailabilities[day as keyof typeof prev.timeAvailabilities],
                        [prop]: newValue
                    }
                }
            }
        ))
    }

    return (
        <>
            <div className="rowButtonAction" onClick={handleOpen}>
                {!customTrigger ?
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
                        Editar profesional
                    </Typography>

                    <div className="textInModal">
                        <span>Nombre: </span>
                        <input type='text' value={prof.name} onChange={(e) => setProf((prev) => ({ ...prev, name: e.target.value }))} />
                    </div>

                    <div className="textInModal">
                        <span>Apellido: </span>
                        <input type='text' value={prof.lastname} onChange={(e) => setProf((prev) => ({ ...prev, lastname: e.target.value }))} />
                    </div>

                    <div className="textInModal">
                        <span>Especialidad: </span>
                        <input type='text' value={prof.profession} onChange={(e) => setProf((prev) => ({ ...prev, profession: e.target.value }))} />
                    </div>

                    <div className="textInModal">
                        <span>Teléfono: </span>
                        <input type='text' value={prof.phoneNumber} onChange={(e) => setProf((prev) => ({ ...prev, phoneNumber: Number(e.target.value) || e.target.value === "" ? e.target.value : prev.phoneNumber }))} />
                    </div>

                    <div className="textInModal">
                        <span>Email: </span>
                        <input type='text' value={prof.email} onChange={(e) => setProf((prev) => ({ ...prev, email: e.target.value }))} />
                    </div>

                    <div className="textInModal">
                        <span>Turnos cada (min): </span>
                        <input type='text' value={prof.appointmentInterval} onChange={(e) => setProf((prev) => ({ ...prev, appointmentInterval: Number(e.target.value) || e.target.value === "" ? e.target.value : prev.appointmentInterval }))} />
                    </div>

                    <div className="textInModal">
                        <span>Tipos de servicio: </span>
                        <div className="editToS">
                            {services?.map((service, index) => (
                                <div key={index}>
                                    <input checked={prof.typesOfServices?.some(ser => ser._id === service._id)} onChange={() => handleCheck(service._id)} type='checkbox' id={`service-${index}`} />
                                    <label htmlFor={`service-${index}`}>{service.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="availabilityEditor">
                        <div className="title">Horario laborable (Formato 24 hs)</div>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: `${isMobile ? "10%" : "20%"}` }}>Laborable</th>
                                    <th style={{ width: `${isMobile ? "10%" : "20%"}` }}>Día</th>
                                    <th style={{ width: `${isMobile ? "80%" : "60%"}` }}>
                                        <div className='tableHeader'>
                                            <span>Mañana</span>
                                            <span>Tarde</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            {prof?.timeAvailabilities && Object.keys(prof?.timeAvailabilities)?.map((day, index) => (
                                <tr key={day}>
                                    <td style={{ width: "10%", textAlign: "center" }}>
                                        <input checked={prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].active ?? false} onChange={(e) => {
                                            setProf(prev => (
                                                {
                                                    ...prev,
                                                    timeAvailabilities: {
                                                        ...prev.timeAvailabilities,
                                                        [day]: {
                                                            ...prev.timeAvailabilities[day as keyof typeof prev.timeAvailabilities],
                                                            active: !prev.timeAvailabilities[day as keyof typeof prev.timeAvailabilities].active
                                                        }
                                                    }
                                                }
                                            ))
                                        }} type='checkbox' />
                                    </td>
                                    <td style={{ width: "10%", textAlign: "center" }}>
                                        {diasSemana[index].slice(0, isMobile ? 3 : diasSemana[index].length)}
                                    </td>
                                    <td style={{ width: "80%", textAlign: "center" }}>
                                        <div className="inputSchedule">
                                            <input className={error[day] === true ? "availabilityError" : (prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].active !== true ? "dayDisabled" : "")}
                                                type='text' value={prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].initialHour} onChange={(e) => changeAvailability(e.target.value, day, "initialHour")} />
                                            <input className={error[day] === true ? "availabilityError" : (prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].active !== true ? "dayDisabled" : "")}
                                                type='text' value={prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].finalHour} onChange={(e) => changeAvailability(e.target.value, day, "finalHour")} />
                                            <input className={error[day] === true ? "availabilityError" : (prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].active !== true ? "dayDisabled" : "")}
                                                type='text' value={prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].secondInitialHour} onChange={(e) => changeAvailability(e.target.value, day, "secondInitialHour")} />
                                            <input className={error[day] === true ? "availabilityError" : (prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].active !== true ? "dayDisabled" : "")}
                                                type='text' value={prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].secondFinalHour} onChange={(e) => changeAvailability(e.target.value, day, "secondFinalHour")} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </table>
                        {errorMessage !== "" && <div className="avaAlert">
                            <Alert severity="error">{errorMessage}</Alert>
                        </div>}

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
                        <button className={`confirmModal ${disabled || errorMessage !== "" ? "buttonDisabled" : ""}`} onClick={handleSave}>
                            {!loading ? "Guardar" : <CircularProgress size={20} sx={{ color: "black" }} />}
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ProfessionalModal