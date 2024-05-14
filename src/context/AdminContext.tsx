import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ConfigFile } from '../typings/ConfigFile';

interface ConfigContextProps {
    config: ConfigFile | undefined;
    setConfig: React.Dispatch<React.SetStateAction<ConfigFile | undefined>>;
    newConfig: ConfigFile | undefined;
    setNewConfig: React.Dispatch<React.SetStateAction<ConfigFile | undefined>>;
    invertColors: () => void;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

interface ConfigProviderProps {
    children: ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
    const [config, setConfig] = useState<ConfigFile>();
    const [newConfig, setNewConfig] = useState<ConfigFile>();

    const invertColors = () => {
        setConfig((prevConfig: any) => ({
            ...prevConfig,
            customization: {
                ...prevConfig.customization,
                primary: prevConfig.customization.secondary,
                secondary: prevConfig.customization.primary
            }
        }));
    }

    const contextValue: ConfigContextProps = {
        config,
        setConfig,
        newConfig,
        setNewConfig,
        invertColors
    };

    useEffect(() => {
        setConfig({
            "presentationText": "Somos un equipo interdisciplinario, especializado en evaluación y rehabilitación neuropsicológica para **Niños/as, Adolescentes, Adultos y Adultos Mayores** en situación de Discapacidad intelectual, deterioro cognitivo, problemáticas emocionales, Trastornos del neurodesarrollo (TEA) y neurodegenerativos, como también en problemáticas específicas del aprendizaje mediante intervenciones individuales y grupales, con atención personalizada adecuada a cada caso.",
            "presentationTitle": "CADA **DETALLE** IMPORTA EN TU **IMAGEN**",
            "contact": {
                "name": "default",
                "phone": "381 – 2138225",
                "address": "Avenida Roque Saenz Peña 323",
                "email": "correo@correo.com",
                "city": "San Miguel de Tucumán",
                "state": "Tucumán",
                "mapPoint": "https://res.cloudinary.com/dakg9xzba/image/upload/v1706193873/ljg0ar6j3pu4iwaa6nsk.png",
                "facebook": "https://www.facebook.com/c.neuropsicologico",
                "instagram": "https://www.instagram.com/c.neuropsicologico"
            },
            "imgsCarrousel": [
                {
                    "name": "Imagen 1",
                    "url": "https://www.cronista.com/files/image/682/682109/6511c213dadb6.jpg"
                },
                {
                    "name": "Imagen 3",
                    "url": "https://res.cloudinary.com/dakg9xzba/image/upload/v1706193406/ouunqhjkixpuwmxhfjj6.jpg"
                }
            ],
            "imagePresentation": "https://res.cloudinary.com/dakg9xzba/image/upload/v1709299726/v3oicajrdjejfmi8cdmi.png",
            "logoImage": "https://res.cloudinary.com/dakg9xzba/image/upload/v1715712218/qtvtt6swa7h8kmyl5ow0.png",
            "banners": {
                "imageReservations": "https://res.cloudinary.com/dakg9xzba/image/upload/v1708442386/sumyjstqotfk7wsuegrv.png",
                "imageNews": "https://res.cloudinary.com/dakg9xzba/image/upload/v1708442655/m7e16tvyafdgb0shmodz.png",
                "imageAppointment": "https://res.cloudinary.com/dakg9xzba/image/upload/v1708438937/wwrqwznangnkrikeyegt.jpg",
                "imageAboutUs": "https://res.cloudinary.com/dakg9xzba/image/upload/v1708439233/kr0l9ibpetmdfl5dnife.png"
            },
            "reservationPrice": 10,
            "customization": {
                "backgroundImage": "https://s3-alpha-sig.figma.com/img/fb29/aa9b/f34c0aec12775a858d51e72a1e715812?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N5JSRPNDpH8k-s-wuoiCD3qpXTEvx7tAdGG9OGh57Z6-hurWtnchtszgY4DMquqWv9Hhe3rmCboG1ktg6qHh9T3sSuEMRkckbNYJzi1Uok50LZ5IZmm0-oCYAMBsyLqPy6XNnis66RzQWMjeRUra5vMEB1tIT4-4KdSKXpSO9fwPLJk3DUPPz3WubHRffdnxTa~TENK5ovVUT-ut-npsfRw3yQWoUL4rDyMrWQHa59Sw8eyYLbdqHY5evFX9NJV9tSxEySfpb1Y~nwV5AdPTr7Oy4QiI4AhSowSsaokpogUgOfGxDfnzLPaAz1aBC2wYtEPsFrRa8SjKESpc1gzuCg__",
                "primary": {
                    "color": "#694D2C",
                    "text": "#fff"
                },
                "secondary": {
                    "color": "#E7E7E7",
                    "text": "#000"
                }
            }
        })
    }, [])

    return (
        <ConfigContext.Provider value={contextValue}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = (): ConfigContextProps => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig debe usarse dentro de un ConfigProvider');
    }
    return context;
};
