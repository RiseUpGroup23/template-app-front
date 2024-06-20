import React from "react";
import EditTextModal from "../Buttons/EditTextModal";
import ImageEditModal from "../Buttons/ImageEditModal";
import ServiceModal from "../Buttons/ServiceModal";
import { TypeOfService } from "../../../typings/TypeOfServices";
import ProfessionalModal from "../Buttons/ProfessionalModal";
import { Professional } from "../../../typings/Professional";

export function renderTextRow(label: string, valor: string, prop: string, noMD?: boolean): JSX.Element {
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

export function renderImageRow(label: string, valor: string, prop: string): JSX.Element {
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

export function renderServiceRow(label: string, valor: string, service: TypeOfService, index: number): JSX.Element {
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
                    <ServiceModal service={service} index={index} />
                </div>
            </div>
        </div>
    );
}

export function renderProfessionalRow(professional: Professional): JSX.Element {
    return (
        <div className="rowContainer" key={professional._id}>
            <div className="rowItem" style={{ width: '35%' }}>
                <span>{professional.name} {professional.lastname}</span>
            </div>
            <div className="rowItem" style={{ width: '45%' }}>
                <img src={professional.image} alt={professional.name} />
            </div>
            <div className="rowItem" style={{ width: '20%' }}>
                <div className="actionsContainer">
                    <ProfessionalModal professional={professional} />
                </div>
            </div>
        </div>
    );
}