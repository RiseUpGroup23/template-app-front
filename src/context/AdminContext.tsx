import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ConfigFile } from '../typings/ConfigFile';
import axios from 'axios';
import { TypeOfService } from '../typings/TypeOfServices';
import { Professional } from '../typings/Professional';

const dbUrl = process.env.REACT_APP_API_URL ?
    (process.env.REACT_APP_API_URL.endsWith("/") ? process.env.REACT_APP_API_URL.slice(0, -1) : process.env.REACT_APP_API_URL)
    : "https://template-peluquerias-back.vercel.app"

const isMpConfigured = process.env.REACT_APP_MERCADOPAGO ? true : false

function updateUI(data: any) {
    document.title = window?.location?.href?.includes("admin") ? data.customization.shopName + " - Admin" : data.customization.shopName;
    const favicons = document.querySelectorAll('.appIco');
    if (favicons.length) {
        favicons.forEach((fav) => {
            (fav as HTMLLinkElement).href = data.customization.logo.primary;
        })
    }
}

interface ConfigContextProps {
    config: ConfigFile | undefined;
    setConfig: React.Dispatch<React.SetStateAction<ConfigFile | undefined>>;
    newConfig: ConfigFile | undefined;
    setNewConfig: React.Dispatch<React.SetStateAction<ConfigFile | undefined>>;
    invertColors: () => void;
    fetchConfigFromDB: () => void;
    updateConfigToDB: any;
    editProp: any;
    alert: any;
    setAlert: React.Dispatch<React.SetStateAction<any>>;
    services: TypeOfService[] | undefined;
    setServices: React.Dispatch<React.SetStateAction<TypeOfService[] | undefined>>;
    professionals: Professional[] | undefined;
    setProfessionals: React.Dispatch<React.SetStateAction<Professional[] | undefined>>;
    fetchProfessionals: () => Promise<void>;
    fetchServices: () => Promise<void>;
    editService: any;
    cancelAppointment: any;
    dbUrl: string;
    isMpConfigured: boolean;
    isAuthenticated: boolean;
    login: (user: string, pass: string) => Promise<void>;
    logout: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

interface ConfigProviderProps {
    children: ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
    const [config, setConfig] = useState<ConfigFile>();
    const [newConfig, setNewConfig] = useState<ConfigFile>();
    const [services, setServices] = useState<TypeOfService[]>();
    const [professionals, setProfessionals] = useState<Professional[]>();
    const [alert, setAlert] = useState({
        type: "hidden",
        msg: ""
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            axios(`${dbUrl}/jwt`, {
                headers: {
                    "Authorization": jwtToken
                }
            }).then(res => {

                if (res.data.logged) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem('jwt');
                }
            }).catch(err => {
                console.error('Error al verificar token:', err);
                setIsAuthenticated(false);
                localStorage.removeItem('jwt');
            });
        }
    }, []);

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

    const fetchConfigFromDB = async () => {
        const dbData = await axios(dbUrl).then((res) => {
            if (window.location.pathname === "/error") {
                window.location.pathname = "/"
            }
            return res.data
        }).catch(() => {
            if (window.location.pathname !== "/error") {
                window.location.pathname = "/error"
            }
        })
        if (dbData) {
            setConfig(dbData)
            setNewConfig(dbData)
            updateUI(dbData)
        }
        return dbData
    }

    const updateConfigToDB = async (newData: ConfigFile) => {
        axios.put(dbUrl, newData)
    }

    const fetchProfessionals = async () => {
        setProfessionals([])
        const dbData = await axios(`${dbUrl}/professionals`).then((res) => res.data)
        if (dbData) {
            setProfessionals(dbData)
        }
    }

    const cancelAppointment = async (id: string) => {
        return axios.patch(`${dbUrl}/appointments/delete/${id}`)
    }

    const fetchServices = async () => {
        setServices([])
        const dbData = await axios(`${dbUrl}/typesOfServices`).then((res) => res.data)
        if (dbData) {
            setServices(dbData)
        }
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
        updateConfigToDB(nuevoEstado as ConfigFile).then(() => {
            setAlert({ type: "success", msg: "Configuración actualizada con éxito" })
        }).catch(() => {
            setAlert({ type: "error", msg: "Hubo un error al guardar, intentelo de nuevo más tarde" })
        })

        return nuevoEstado;
    }

    async function editService(id: string, newValue: TypeOfService) {
        await axios.put(`${dbUrl}/typesOfServices/${id}`, newValue).then(() => {
            setAlert({ type: "success", msg: "Configuración actualizada con éxito" })
            fetchServices()
        }).catch(() => {
            setAlert({ type: "error", msg: "Hubo un error al guardar, intentelo de nuevo más tarde" })
        })
    }

    const login = async (user: string, pass: string) => {
        try {
            const res = await axios.post(`${dbUrl}/login`, {
                email: user,
                password: pass
            });

            if (res.data.logged) {
                localStorage.setItem("jwt", res.data.token)
                setIsAuthenticated(true);
                return Promise.resolve()
            } else {
                setAlert({ type: "error", msg: res.data.message });
                return Promise.reject()
            }
        } catch (err) {
            setAlert({ type: "error", msg: "Hubo un error al iniciar sesión, inténtelo de nuevo más tarde" });
            return Promise.reject()
        }
    }

    const logout = async () => {
        setIsAuthenticated(false);
        localStorage.removeItem("jwt")
    }

    const contextValue: ConfigContextProps = {
        config,
        setConfig,
        newConfig,
        setNewConfig,
        invertColors,
        fetchConfigFromDB,
        updateConfigToDB,
        editProp,
        alert,
        setAlert,
        services,
        setServices,
        professionals,
        setProfessionals,
        fetchProfessionals,
        fetchServices,
        editService,
        cancelAppointment,
        dbUrl,
        isMpConfigured,
        isAuthenticated,
        login,
        logout
    };

    useEffect(() => {
        fetchConfigFromDB().then((res) => {
            if (res?.customization?.twoColors && localStorage.getItem("inverted")) {
                invertColors()
            }
        })
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
