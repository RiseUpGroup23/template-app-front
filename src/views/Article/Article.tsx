import React from 'react';
import Overlay from '../Turnos/Overlay';
import Header from '../../components/Header/Header';
import { useConfig } from '../../context/AdminContext';
import "./article.css"
import Markdown from 'react-markdown';
import Footer from '../../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// Definir la interfaz para las props que aceptará el componente
interface ArticleProps {
    article: {
        title: string;
        content: string;
        image: string
    }
}

const Article: React.FC<ArticleProps> = ({ article }) => {
    const { title, content, image } = article
    const { config } = useConfig()
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);  // Retrocede una página en el historial
    };
    return (
        <Overlay image={`${config?.customization.background.backgroundTurno}`}>
            <Header />
            <div className="containerStep">
                <div className="articleGoBack">
                    <button className='prev' onClick={handleGoBack}>
                        <ArrowBackIosNewIcon />
                        Volver
                    </button>
                </div>
                <div className="appointTitle" style={{ color: `${config?.customization.primary.text}` }}>
                    {title}
                </div>
                <div className="articleImageCont">
                    <img className='articleImage' src={image} alt={title} />
                </div>
                <div className='articleContent'>
                    <Markdown>
                        {content}
                    </Markdown>
                </div>
            </div>
            <Footer />
        </Overlay>
    )
}

export default Article;
