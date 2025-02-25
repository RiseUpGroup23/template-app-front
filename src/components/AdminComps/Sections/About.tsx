import React, { useEffect, useState } from "react";
import { useConfig } from "../../../context/AdminContext";
import { CircularProgress, Stack, Switch } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArticleModal from "../Modals/ArticleModal";
import { RenderArticleRow } from "../Rows/rows";

const About = () => {
    const { config, editProp } = useConfig()
    const [tabs, setTabs] = useState(config?.about?.items ?? [])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTabs(config?.about?.items ?? [])
        setLoading(false)
    }, [config?.about?.items])
    if (!config) return (<></>)
    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{config.customization.shopName}!</strong></span>
            <span className="proxApo">
                Sobre Nosotros
            </span>
            <div className="blackLayout">
                <div className="mpSwitcher">
                    <span>Activar sección "sobre nosotros"</span>
                    <Stack className="mpSwitch" direction="row" spacing={1} alignItems="center">
                        <span className="mpSwitchText">Habilitar</span>
                        <Switch
                            checked={config.about?.active}
                            onChange={(e) => { editProp("about.active", e.target.checked) }}
                        />
                    </Stack>
                </div>
                <div className="mpInfo">
                    Si activa esta opción, se mostrará una pestaña llamada "Sobre nosotros" en su web, donde sus clientes podrán ver todo el contenido que cargue en las pestañas.
                </div>
            </div>
            <span className="proxApo">
                Pestañas
            </span>
            <div className="blackLayout">
                {!loading ?
                    <>
                        <div className="proxApoHeader rowContainer">
                            <div className="rowItem" style={{ width: "35%" }}><span>Nombre</span></div>
                            <div className="rowItem" style={{ width: "40%" }}><span>Vista Previa</span></div>
                            <div className="rowItem" style={{ width: "25%" }}><span>Editar</span></div>
                        </div>
                        {tabs?.length ?
                            tabs?.map((item, index) => RenderArticleRow(item, index, "about"))
                            :
                            <div className="noData">
                                No hay pestañas configuradas
                            </div>
                        }
                    </>
                    :
                    <div className="blackLayLoading">
                        <CircularProgress size={50} sx={{ color: "white" }} />
                    </div>
                }
            </div>

            <div className="addSection">
                <ArticleModal type="about" item={{} as { title: string; content: string; image: string }} customTrigger={
                    <button className="newProfButton">
                        <AddIcon />
                    </button>
                } />
            </div>
        </div>
    )
}

export default About