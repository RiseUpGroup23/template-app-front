import React, { useEffect, useState } from "react";
import { useConfig } from "../../../context/AdminContext";
import { CircularProgress, Stack, Switch } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArticleModal from "../Modals/ArticleModal";
import { RenderArticleRow } from "../Rows/rows";

const News = () => {
    const { config, editProp } = useConfig()
    const [articles, setArticles] = useState(config?.articles?.items ?? [])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setArticles(config?.articles?.items ?? [])
        setLoading(false)
    }, [config?.articles?.items])
    if (!config) return (<></>)
    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{config.customization.shopName}!</strong></span>
            <span className="proxApo">
                Novedades
            </span>
            <div className="blackLayout">
                <div className="mpSwitcher">
                    <span>Activar sección de artículos y novedades</span>
                    <Stack className="mpSwitch" direction="row" spacing={1} alignItems="center">
                        <span className="mpSwitchText">Habilitar</span>
                        <Switch
                            checked={config.articles?.active}
                            onChange={(e) => { editProp("articles.active", e.target.checked) }}
                        />
                    </Stack>
                </div>
                <div className="mpInfo">
                    Si activa esta opción, se mostrará una pestaña llamada "Novedades" en su web, donde sus clientes podrán ver todo el contenido que cargue en los artículos.
                </div>
            </div>
            <span className="proxApo">
                Artículos
            </span>
            <div className="blackLayout">
                {!loading ?
                    <>
                        <div className="proxApoHeader rowContainer">
                            <div className="rowItem" style={{ width: "35%" }}><span>Nombre</span></div>
                            <div className="rowItem" style={{ width: "40%" }}><span>Vista Previa</span></div>
                            <div className="rowItem" style={{ width: "25%" }}><span>Editar</span></div>
                        </div>
                        {articles?.length ?
                            articles?.map((item, index) => RenderArticleRow(item, index))
                            :
                            <div className="noData">
                                No hay artículos configurados
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
                <ArticleModal article={{} as { title: string; content: string; image: string }} customTrigger={
                    <button className="newProfButton">
                        <AddIcon />
                    </button>
                } />
            </div>
        </div>
    )
}

export default News