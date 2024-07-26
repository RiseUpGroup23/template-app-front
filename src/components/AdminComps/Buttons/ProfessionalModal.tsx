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
    const defaultImg = professional.image || "https://static-00.iconduck.com/assets.00/profile-default-icon-512x511-v4sw4m29.png"
    const { setAlert, fetchProfessionals, services, dbUrl } = useConfig()
    const [prof, setProf] = React.useState(professional)
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
    const [src, setSrc] = React.useState(defaultImg)
    const [disabled, setDisabled] = React.useState(true)
    const isMobile = useMediaQuery('(max-width:600px)');
    const [error, setError] = React.useState<any>({})
    const [errorMessage, setErrorMessage] = React.useState({
        availability: "",
        image: "",
        inputs: ""
    })


    const handleOpen = () => {
        setProf({
            ...professional,
            timeAvailabilities: professional?.timeAvailabilities?.monday ? professional.timeAvailabilities : defaultTimeAvailabilities
        })
        setOpen(true)
        document.addEventListener("wheel", function () {
            if (document.activeElement && (document.activeElement as HTMLInputElement).type === "number") {
                (document.activeElement as HTMLInputElement).blur();
            }
        });
    };

    const handleClose = (reason?: string) => {
        if (reason === "backdropClick") return
        setProf(professional ?? ({} as Professional))
        setErrorMessage({
            availability: "",
            image: "",
            inputs: ""
        })
        setSrc(defaultImg)
        setSelectedImage(null)
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
                setErrorMessage((prev: any) => ({ ...prev, availability: `El día ${diasSemana[mock.indexOf(day)]} tiene errores, revisar que los horarios vayan de menor a mayor` }))
            }
            if (inicioM >= 2400 || finM >= 2400 || inicioT >= 2400 || finT >= 2400) {
                setError((prev: any) => ({
                    ...prev,
                    [day]: true
                }))
                setErrorMessage((prev: any) => ({ ...prev, availability: `El día ${diasSemana[mock.indexOf(day)]} tiene errores, revisar que los horarios sean válidos` }))
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
        const maxSize = 2 * 1024 * 1024;
        if (file) {
            if (file.size > maxSize) {
                return setErrorMessage((prev) => ({ ...prev, image: "La imagen supera los 2MB, por favor seleccione una más pequeña" }))
            }
            setErrorMessage((prev) => ({ ...prev, image: "" }))
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
        setErrorMessage((prev: any) => ({ ...prev, availability: "" }))
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

    const handleBlurInput = (event: React.FocusEvent<HTMLInputElement>) => {
        const day = event.target.name
        if (event.target.value.length < 5) {
            setError((prev: any) => ({
                ...prev,
                [day]: true
            }))
            setErrorMessage((prev: any) => ({ ...prev, availability: `El día ${diasSemana[mock.indexOf(day)]} tiene errores, revisar que los horarios sean válidos (Formato HH:MM)` }))
        }

    }

    return (
        <>
            <div className="rowButtonAction" onClick={handleOpen}>
                {!customTrigger ?
                    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <rect opacity="0.9" width="37" height="37" fill="url(#pattern0_191_1458)" />
                        <defs>
                            <pattern id="pattern0_191_1458" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlinkHref="#image0_191_1458" transform="scale(0.00195312)" />
                            </pattern>
                            <image id="image0_191_1458" width="512" height="512" xlinkHref="data:image/png;base64,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" />
                        </defs>
                    </svg>
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
                        <input type='number' value={prof.phoneNumber} onChange={(e) => {
                            setProf((prev) => ({ ...prev, phoneNumber: e.target.value.toString() }))
                        }}
                        />
                    </div>

                    <div className="textInModal">
                        <span>Email: </span>
                        <input type='text' value={prof.email} onChange={(e) => {
                            setProf((prev) => ({ ...prev, email: e.target.value }))
                        }}
                        />
                    </div>

                    <div className="textInModal">
                        <span>Turnos cada (min): </span>
                        <input
                            type='number'
                            value={prof.appointmentInterval}
                            onChange={(e) => {
                                if (Number(e.target.value) && (Number(e.target.value) < 5 || Number(e.target.value) > 480)) {
                                    setErrorMessage((prev) => ({ ...prev, inputs: "La ventana horaria de los turnos debe ser un valor entre 5min y 480min" }))
                                } else {
                                    setErrorMessage((prev) => ({ ...prev, inputs: "" }))
                                }
                                setProf((prev) => ({ ...prev, appointmentInterval: e.target.value.toString() }))
                            }
                            } />
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
                                            <input name={day} onBlur={handleBlurInput} className={error[day] === true ? "availabilityError" : (prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].active !== true ? "dayDisabled" : "")}
                                                type='text' value={prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].initialHour} onChange={(e) => changeAvailability(e.target.value, day, "initialHour")} />
                                            <input name={day} onBlur={handleBlurInput} className={error[day] === true ? "availabilityError" : (prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].active !== true ? "dayDisabled" : "")}
                                                type='text' value={prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].finalHour} onChange={(e) => changeAvailability(e.target.value, day, "finalHour")} />
                                            <input name={day} onBlur={handleBlurInput} className={error[day] === true ? "availabilityError" : (prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].active !== true ? "dayDisabled" : "")}
                                                type='text' value={prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].secondInitialHour} onChange={(e) => changeAvailability(e.target.value, day, "secondInitialHour")} />
                                            <input name={day} onBlur={handleBlurInput} className={error[day] === true ? "availabilityError" : (prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].active !== true ? "dayDisabled" : "")}
                                                type='text' value={prof.timeAvailabilities[day as keyof typeof prof.timeAvailabilities].secondFinalHour} onChange={(e) => changeAvailability(e.target.value, day, "secondFinalHour")} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </table>
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
                        (Object.values(prof).length <= 6 || !Object.values(prof).every(e => {
                            return typeof e !== "string" || e !== ""
                        }) ?
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
            </Modal>
        </>
    )
}

export default ProfessionalModal