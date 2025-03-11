import React from "react";
import EditTextModal from "../Modals/EditTextModal";
import ImageEditModal from "../Modals/ImageEditModal";
import ServiceModal from "../Modals/ServiceModal";
import { TypeOfService } from "../../../typings/TypeOfServices";
import ProfessionalModal from "../Modals/ProfessionalModal";
import { Professional } from "../../../typings/Professional";
import DeleteModal from "../Modals/DeleteModal";
import { useConfig } from "../../../context/AdminContext";
import axios from "axios";
import { BannedDay } from "../../../typings/ConfigFile";
import BansModal from "../Modals/BansModal";
import ReactMarkdown from "react-markdown";
import ModalConflicts from "../Modals/ModalConflicts";
import ArticleModal from "../Modals/ArticleModal";

export function RenderTextRow(label: string, valor: string, prop: string, noMD?: boolean, limit?: number): JSX.Element {
    return (
        <div className="rowContainer">
            <div className="rowItem" style={{ width: '35%' }}>
                <span>{label}</span>
            </div>
            <div className="rowItem markdown" style={{ width: '45%' }}>
                <ReactMarkdown>{valor}</ReactMarkdown>
            </div>
            <div className="rowItem" style={{ width: '20%' }}>
                <div className="actionsContainer">
                    <EditTextModal initialTitle={valor} prop={prop} noMD={noMD || false} limit={limit || false} />
                </div>
            </div>
        </div>
    );
}

export function RenderImageRow(label: string, valor: string, prop: string): JSX.Element {
    return (
        <div className="rowContainer">
            <div className="rowItem" style={{ width: '35%' }}>
                <span>{label}</span>
            </div>
            <div className="rowItem" style={{ width: '45%' }}>
                <img src={valor} alt={label} />
            </div>
            <div className="rowItem" style={{ width: '20%' }}>
                <div className="actionsContainer">
                    <ImageEditModal initialImg={valor} prop={prop} />
                </div>
            </div>
        </div>
    );
}

export function RenderServiceRow(service: TypeOfService, conflicts: any, setConflicts: React.Dispatch<React.SetStateAction<any[]>>): JSX.Element {
    const { fetchServices, setAlert, dbUrl } = useConfig()

    const handleSave = async (conflictSolution?: string) => {
        if (conflictSolution === "close") {
            return setConflicts((prev) => ({
                ...prev,
                [service._id]: []
            }))
        }
        await axios.delete(`${dbUrl}/typesOfServices/${service._id}${conflictSolution ? `?action=${conflictSolution}` : ""}`).then(() => {
            fetchServices()
            setAlert({
                type: "success",
                msg: "Se eliminó el servicio con éxito"
            })
        }).catch((err) => {
            if (err?.response?.data?.conflicts?.length) {
                setConflicts((prev) => ({
                    ...prev,
                    [service._id]: (err.response.data.conflicts)
                }))
            } else {
                setAlert({
                    type: "error",
                    msg: "Hubo un error al eliminar el servicio"
                })
            }
        })
    }

    return (
        <div className="rowContainer">
            <div className="rowItem" style={{ width: '35%' }}>
                <span>{service.name}</span>
            </div>
            <div className="rowItem" style={{ width: '40%' }}>
                <img src={service.image} alt={service.name} />
            </div>
            <div className="rowItem" style={{ width: '25%' }}>
                <div className="actionsContainer">
                    <DeleteModal message="¿Desea eliminar este servicio?" action={handleSave} />
                    <ServiceModal service={service} />
                    <ModalConflicts variant="service" conflicts={conflicts[service._id] ?? []} saveFunction={handleSave} />
                </div>
            </div>
        </div>
    );
}

export function RenderProfessionalRow(professional: Professional, conflicts: any, setConflicts: React.Dispatch<React.SetStateAction<any[]>>): JSX.Element {
    const { fetchProfessionals, setAlert, dbUrl } = useConfig()

    const handleSave = async (conflictSolution?: string) => {
        if (conflictSolution === "close") {
            return setConflicts((prev) => ({
                ...prev,
                [professional._id]: []
            }))
        }
        await axios.delete(`${dbUrl}/professionals/${professional._id}${conflictSolution ? `?action=${conflictSolution}` : ""}`).then(() => {
            fetchProfessionals()
            setAlert({
                type: "success",
                msg: "Se eliminó el profesional con éxito"
            })
        }).catch((err) => {
            if (err?.response?.data?.conflicts?.length) {
                setConflicts((prev) => ({
                    ...prev,
                    [professional._id]: (err.response.data.conflicts)
                }))
            } else {
                setAlert({
                    type: "error",
                    msg: "Hubo un error al eliminar el profesional"
                })
            }
        })
    }

    return (
        <div className="rowContainer" key={professional._id}>
            <div className="rowItem" style={{ width: '35%' }}>
                <span>{professional.name} {professional.lastname}</span>
            </div>
            <div className="rowItem" style={{ width: '40%' }}>
                <img src={professional.image} alt={professional.name} />
            </div>
            <div className="rowItem" style={{ width: '25%' }}>
                <div className="actionsContainer">
                    <DeleteModal message="¿Desea eliminar este profesional?" action={handleSave} />
                    <ProfessionalModal professional={professional} />
                    <ModalConflicts variant="professional" conflicts={conflicts[professional._id] ?? []} saveFunction={handleSave} />
                </div>
            </div>
        </div>
    );
}

export function RenderBanRow(ban: BannedDay, index: number): JSX.Element {
    const { editProp, config } = useConfig()
    return (
        <div className="rowContainer" key={ban.title}>
            <div className="rowItem" style={{ width: '35%' }}>
                <span>{new Intl.DateTimeFormat('es', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).format(new Date(ban.date))}</span>
            </div>
            <div className="rowItem" style={{ width: '40%' }}>
                <span>{ban.title}</span>
            </div>
            <div className="rowItem" style={{ width: '25%' }}>
                <div className="actionsContainer">
                    <DeleteModal action={() => {
                        editProp("appointment.bannedDays", config?.appointment.bannedDays.filter((day, i) => index !== i))
                    }} message="¿Desea eliminar esta excepción?" />
                    <BansModal ban={ban} index={index} />
                </div>
            </div>
        </div>
    );
}



export function RenderArticleRow(item: any, index: number, type: 'articles' | 'about'): JSX.Element {
    const { editProp, config } = useConfig();

    const deleteRow = () => {
        const updatedArray = [...config?.[type]?.items ?? []];
        updatedArray.splice(index, 1);
        editProp(`${type}.items`, updatedArray);
    };

    return (
        <div className="rowContainer" key={item.title}>
            <div className="rowItem" style={{ width: '35%' }}>
                <span>{item.title}</span>
            </div>
            <div className="rowItem" style={{ width: '40%' }}>
                <img src={item.image} alt={item.title} />
            </div>
            <div className="rowItem" style={{ width: '25%' }}>
                <div className="actionsContainer">
                    <DeleteModal message="¿Desea eliminar este elemento?" action={deleteRow} />
                    <ArticleModal type={type} item={item} index={index} />
                </div>
            </div>
        </div>
    );
}