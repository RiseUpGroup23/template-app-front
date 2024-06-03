import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ConfigFile } from '../typings/ConfigFile';


const sampleDB = {
    "presentationText": "En nuestra peluquería, nos especializamos en ofrecer servicios de alta calidad que realzan la belleza natural de nuestros clientes. \n\n Nuestro talentoso equipo de estilistas está comprometido en crear looks personalizados que reflejen la individualidad y estilo único de cada persona.",
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
    "imagePresentation": "https://s3-alpha-sig.figma.com/img/3ebf/c0e7/fdd4af1e2241a74ef7035d45a059b2f8?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F2c4AX8OZ8EanbbpDtc0fY08vCITcA4EBFy80zfJVg-MxquQrERZzrvkzE7QEjBLKt5iD-dBOXXBlfw9odzjFgHQUFu811wA76REd5CLTMgh80JCaiCoOxZHEThsArTHUzuKXQshHSotecqc2~z1-vi3GtBTmsEUpXWftmxniFITK1slIhDWb2NqhRfML1emEV3ppf4HfrwAtU~QO7vQIaRJFWUixur0Ct7CbA5gRsx05aVugkqfXaV-mqyDKq3H7ka0jwLHpWJ4ajXX2N4BebLQuimgdu4~2guppnVeTeKZryZPITqjJKYmHT1rDsGyFN3Mw0Zgaqd-lGdRgMUr4A__",
    "banners": {
        "imageReservations": "https://res.cloudinary.com/dakg9xzba/image/upload/v1708442386/sumyjstqotfk7wsuegrv.png",
        "imageNews": "https://res.cloudinary.com/dakg9xzba/image/upload/v1708442655/m7e16tvyafdgb0shmodz.png",
        "imageAppointment": "https://res.cloudinary.com/dakg9xzba/image/upload/v1708438937/wwrqwznangnkrikeyegt.jpg",
        "imageAboutUs": "https://res.cloudinary.com/dakg9xzba/image/upload/v1708439233/kr0l9ibpetmdfl5dnife.png"
    },
    "reservationPrice": 10,
    "customization": {
        "background": {
            "backgroundImage": "https://s3-alpha-sig.figma.com/img/fb29/aa9b/f34c0aec12775a858d51e72a1e715812?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N5JSRPNDpH8k-s-wuoiCD3qpXTEvx7tAdGG9OGh57Z6-hurWtnchtszgY4DMquqWv9Hhe3rmCboG1ktg6qHh9T3sSuEMRkckbNYJzi1Uok50LZ5IZmm0-oCYAMBsyLqPy6XNnis66RzQWMjeRUra5vMEB1tIT4-4KdSKXpSO9fwPLJk3DUPPz3WubHRffdnxTa~TENK5ovVUT-ut-npsfRw3yQWoUL4rDyMrWQHa59Sw8eyYLbdqHY5evFX9NJV9tSxEySfpb1Y~nwV5AdPTr7Oy4QiI4AhSowSsaokpogUgOfGxDfnzLPaAz1aBC2wYtEPsFrRa8SjKESpc1gzuCg__",
            "backgroundTurno": "https://s3-alpha-sig.figma.com/img/462e/0fed/f6d7e314bc34f5d0e3d1597355bd9246?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ATstjRQm3B~tuzH3kZ~wQUFcUwNbRZjoChxMGS5bPAP-Y6PbOUIgNuAP3tSOoIF6wqALH0gLXeDm5JevxIbWY8fXdy90to9NONwOkSVWc7Ta-sthKuIXAZ5a4TysWchKOpXkbhU94SfoH-00n5xYvISw7J7-RxTP0ZidvzrSm6dgatAeP4vK~DyWnWPTSjhag7BUJ5wtNq6LuJJRl~NAw-d7-LaBwrqJu-anw1quwnMLZptRzPVYT29nRVueJDKRiv5--XBTuuXCCIzQoDxEKcbnZgR1QVm1dfIc4~3pR4cLjEYKdB9wNjE9UyDbjohAlfwtgvCim3Mg5xyNkWClPA__",
        },
        "primary": {
            "color": "#694D2C",
            "text": "#fff"
        },
        "secondary": {
            "color": "#E7E7E7",
            "text": "#000"
        },
        "logo": {
            "primary": "https://res.cloudinary.com/dakg9xzba/image/upload/v1715712218/qtvtt6swa7h8kmyl5ow0.png",
            "secondary": "https://s3-alpha-sig.figma.com/img/0bb5/277a/0745cfadae6ec3cf56d173003a1c3140?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eRAYKYJNPl8XrtOrhwKM4v~xlVKKHMjSqfDPIi21HEMunsexjVW~BA-lnlEFVMj-MiHlQm0wZOVQlI4H7amBQ-e2Bs-IHgWhmu~iMyDGFYopAuUKGi8u3IBQkMvvIqBfdYtumpJMhfAbqBThjVarpUjZl0W-8PWLLDWbiqE0vOcZcyd6LYWSzkHrTS0Tfw4eL3qE2oaaSi6MrwWtVngDlEQ4DCoPE1CI5Y1aQiBOCobAkV0ufPFlUc-aNye84Lae-1-Ti0pXNfQ2avLAPn3w7gQdee87OyTvCXFVQRGRWxGFcYGQ-8z9InASAUOPHT~ThJOSqkM~kOEcWLgwdqQRZQ__"
        },
        "shopName": "El barberoloco"
    }
}

interface ConfigContextProps {
    config: ConfigFile | undefined;
    setConfig: React.Dispatch<React.SetStateAction<ConfigFile | undefined>>;
    newConfig: ConfigFile | undefined;
    setNewConfig: React.Dispatch<React.SetStateAction<ConfigFile | undefined>>;
    invertColors: () => void;
    fetchConfigFromDB: () => void;
    editProp: any;
    alert: any;
    setAlert: React.Dispatch<React.SetStateAction<any>>;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

interface ConfigProviderProps {
    children: ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
    const [config, setConfig] = useState<ConfigFile>();
    const [newConfig, setNewConfig] = useState<ConfigFile>();
    const [alert, setAlert] = useState({
        type: "hidden",
        msg: ""
    });

    const invertColors = () => {
        setConfig((prevConfig: any) => ({
            ...prevConfig,
            customization: {
                ...prevConfig.customization,
                primary: prevConfig.customization.secondary,
                secondary: prevConfig.customization.primary,
                logo: {
                    primary: prevConfig.customization.logo.secondary,
                    secondary: prevConfig.customization.logo.primary,
                }
            }
        }));
    }

    const fetchConfigFromDB = () => {
        //axios a la DB.. etc
        setConfig(sampleDB)
        setNewConfig(sampleDB)

    }



    function editProp(nombreProp: string, valor: any): any {
        const nuevoEstado = { ...newConfig };

        let objeto: any = nuevoEstado;
        let propiedades = nombreProp.split('.');
        for (let i = 0; i < propiedades.length - 1; i++) {
            const propiedad = propiedades[i] as keyof ConfigFile;
            if (!objeto[propiedad] || typeof objeto[propiedad] !== 'object') {
                return newConfig;
            }
            objeto = objeto[propiedad];
        }

        const ultimaPropiedad = propiedades[propiedades.length - 1] as keyof ConfigFile;
        objeto[ultimaPropiedad] = valor;

        setNewConfig(nuevoEstado as ConfigFile)
        setAlert({ type: "success", msg: "Configuración actualizada con éxito" })

        return nuevoEstado;
    }

    const contextValue: ConfigContextProps = {
        config,
        setConfig,
        newConfig,
        setNewConfig,
        invertColors,
        fetchConfigFromDB,
        editProp,
        alert,
        setAlert
    };

    useEffect(() => {
        fetchConfigFromDB()
    }, [])

    useEffect(() => {
        alert.type !== "hidden" && setTimeout(() => {
            setAlert({ type: "hidden", msg: "" })
        }, 3000)
    }, [alert])

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
