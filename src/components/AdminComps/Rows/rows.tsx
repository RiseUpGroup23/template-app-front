import React from "react";
import EditTextModal from "../Buttons/EditTextModal";
import ImageEditModal from "../Buttons/ImageEditModal";
import ServiceModal from "../Buttons/ServiceModal";
import { TypeOfService } from "../../../typings/TypeOfServices";
import ProfessionalModal from "../Buttons/ProfessionalModal";
import { Professional } from "../../../typings/Professional";
import DeleteModal from "../Buttons/DeleteModal";
import { useConfig } from "../../../context/AdminContext";
import axios from "axios";
import { BannedDay } from "../../../typings/ConfigFile";
import BansModal from "../Buttons/BansModal";

export function RenderTextRow(label: string, valor: string, prop: string, noMD?: boolean): JSX.Element {
    return (
        <div className="rowContainer">
            <div className="rowItem" style={{ width: '35%' }}>
                <span>{label}</span>
            </div>
            <div className="rowItem" style={{ width: '45%' }}>
                <span>{valor}</span>
            </div>
            <div className="rowItem" style={{ width: '20%' }}>
                <div className="actionsContainer">
                    <EditTextModal initialTitle={valor} prop={prop} noMD={noMD || false} />
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

export function RenderServiceRow(service: TypeOfService): JSX.Element {
    const { fetchServices, setAlert, dbUrl } = useConfig()
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
                    <DeleteModal message="¿Desea eliminar este servicio?" action={async () => {
                        await axios.delete(`${dbUrl}/typesOfServices/${service._id}`).then(() => {
                            fetchServices()
                            setAlert({
                                type: "success",
                                msg: "Se eliminó el servicio con éxito"
                            })
                        }).catch(() => {
                            setAlert({
                                type: "error",
                                msg: "Hubo un error al eliminar el servicio"
                            })
                        })
                    }} />
                    <ServiceModal service={service} />
                </div>
            </div>
        </div>
    );
}

export function RenderProfessionalRow(professional: Professional): JSX.Element {
    const { fetchProfessionals, setAlert, dbUrl } = useConfig()
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
                    <DeleteModal message="¿Desea eliminar este profesional?" action={async () => {
                        await axios.delete(`${dbUrl}/professionals/${professional._id}`).then(() => {
                            fetchProfessionals()
                            setAlert({
                                type: "success",
                                msg: "Se eliminó el profesional con éxito"
                            })
                        }).catch(() => {
                            setAlert({
                                type: "error",
                                msg: "Hubo un error al eliminar el profesional"
                            })
                        })
                    }} />
                    <ProfessionalModal professional={professional} />
                </div>
            </div>
        </div>
    );
}

export function RenderBanRow(ban: BannedDay, index: number): JSX.Element {
    return (
        <div className="rowContainer" key={ban.title}>
            <div className="rowItem" style={{ width: '35%' }}>
                <span>{new Date(ban.date).toLocaleDateString()}</span>
            </div>
            <div className="rowItem" style={{ width: '40%' }}>
                <span>{ban.title}</span>
            </div>
            <div className="rowItem" style={{ width: '25%' }}>
                <div className="actionsContainer">
                    <BansModal ban={ban} index={index} />
                </div>
            </div>
        </div>
    );
}