import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Close as CloseIcon } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from '@mui/material';
import uploadImage from '../utils/uploadImage'; // Suponiendo que esta función maneja la subida de imágenes
import { useConfig } from '../../../context/AdminContext';
import { style } from './EditTextModal'; // Estilo del modal
import EditIcon from '@mui/icons-material/Edit';
import MDEditor, { commands } from "@uiw/react-md-editor";

interface Props {
    article: { title: string; content: string; image: string };
    customTrigger?: any; // Similar al trigger en ProfessionalModal
    index?: number
}

const ArticleModal = ({ article, customTrigger, index }: Props) => {
    const { setAlert, editProp, config } = useConfig();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
    const [src, setSrc] = React.useState(article.image !== "" ? article.image : "https://icons.veryicon.com/png/o/miscellaneous/yuanql/icon-article.png");
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [editedArticle, setEditedArticle] = React.useState(article);

    const handleOpen = () => {
        setEditedArticle(article); // Inicializar con los datos del artículo
        setOpen(true);
    };

    const handleClose = (reason?: string) => {
        if (reason === 'backdropClick') return;
        setOpen(false);
        setErrorMessage(null);
        setSelectedImage(null);
        setSrc(article.image); // Restablecer imagen original
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const maxSize = 2 * 1024 * 1024; // 2MB max
        if (file) {
            if (file.size > maxSize) {
                setErrorMessage("La imagen supera los 2MB, por favor seleccione una más pequeña.");
            } else {
                setErrorMessage(null);
                setSelectedImage(file);
                const imageUrl = URL.createObjectURL(file);
                setSrc(imageUrl);
            }
        }
    };

    const handleSave = async () => {
        setLoading(true);

        // Subir imagen si es necesario
        const newImage = selectedImage ? await uploadImage(selectedImage).catch(() => editedArticle.image) : editedArticle.image;

        const updatedArticle = { ...editedArticle, image: newImage ?? "" };

        try {
            if (typeof index === "number" && config?.articles?.items) {
                const copyArray = config?.articles?.items
                copyArray[index] = updatedArticle
                await editProp("articles.items", copyArray)
            } else {
                await editProp("articles.items", config?.articles?.items.concat(updatedArticle))
            }
            setAlert({ type: 'success', msg: 'Artículo actualizado con éxito' });
            setOpen(false);
        } catch (error) {
            setAlert({ type: 'error', msg: 'Hubo un error al actualizar el artículo' });
        }

        setLoading(false);
    };

    return (
        <>
            <div className="rowButtonAction" onClick={handleOpen}>
                {!customTrigger ? (
                    <EditIcon style={{ width: "37", height: "37" }} />
                ) : (
                    customTrigger
                )}
            </div>

            <Modal
                open={open}
                onClose={(e, reason) => handleClose(reason)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="closeIcon" onClick={() => handleClose()}>
                        <CloseIcon />
                    </div>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Editar Artículo
                    </Typography>

                    {/* Título */}
                    <div className="textInModal">
                        <span>Título: </span>
                        <input
                            type="text"
                            value={editedArticle.title}
                            onChange={(e) => setEditedArticle((prev) => ({ ...prev, title: e.target.value }))}
                        />
                    </div>

                    {/* Imagen */}
                    <div className="dragContainer">
                        <img className="editBoxImage" src={src} alt="editImagePreview" />
                        <label
                            htmlFor="image-upload"
                            className="drop-container"
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => e.preventDefault()}
                            onDragLeave={(e) => e.preventDefault()}
                            onDrop={(event) => {
                                event.preventDefault();
                                const file = event.dataTransfer.files[0];
                                if (file) {
                                    setSelectedImage(file);
                                    const imageUrl = URL.createObjectURL(file);
                                    setSrc(imageUrl);
                                }
                            }}
                        >
                            <span className="drop-title">Arrastra un archivo aquí</span> o
                            <input type="file" id="image-upload" accept="image/*" required onChange={handleImageChange} />
                        </label>
                    </div>

                    {/* Contenido */}
                    <div className="textInModal">
                        <span>Contenido: </span>
                    </div>
                    <div data-color-mode="light" className="articleMde">
                        <MDEditor
                            value={editedArticle.content}
                            height={300}
                            onChange={(text) => setEditedArticle((prev) => ({ ...prev, content: text ?? "" }))}
                            commands={[commands.bold, commands.italic, commands.strikethrough]}
                            extraCommands={[]}
                        />
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="avaAlert">
                            <Alert severity="error">{errorMessage}</Alert>
                        </div>
                    )}

                    {/* Modal Buttons */}
                    <div className="modalButtons">
                        <button className="backModal" onClick={() => handleClose()}>
                            Volver
                        </button>
                        <button
                            className={`confirmModal ${!editedArticle.title || !editedArticle.content || loading ? 'buttonDisabled' : ''}`}
                            onClick={handleSave}
                            disabled={!editedArticle.title || !editedArticle.content || loading}
                        >
                            {!loading ? 'Guardar' : <CircularProgress size={20} sx={{ color: 'black' }} />}
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ArticleModal;
