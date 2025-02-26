import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Close as CloseIcon } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from '@mui/material';
import uploadImage from '../utils/uploadImage';
import { useConfig } from '../../../context/AdminContext';
import { style } from './EditTextModal';
import EditIcon from '@mui/icons-material/Edit';
import MDEditor, { commands } from "@uiw/react-md-editor";

interface Props {
    type: 'articles' | 'about';
    item: { title: string; content: string; image: string };
    customTrigger?: any;
    index?: number;
}

const ArticleModal = ({ type, item, customTrigger, index }: Props) => {
    const { setAlert, editProp, config } = useConfig();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
    const [src, setSrc] = React.useState(item.image || "https://icons.veryicon.com/png/o/miscellaneous/yuanql/icon-article.png");
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [editedItem, setEditedItem] = React.useState(item);

    const handleOpen = () => {
        setEditedItem(item);
        setOpen(true);
    };

    const handleClose = (reason?: string) => {
        if (reason === 'backdropClick') return;
        setOpen(false);
        setErrorMessage(null);
        setSelectedImage(null);
        setSrc(item.image);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const maxSize = 2 * 1024 * 1024;
        if (file) {
            if (file.size > maxSize) {
                setErrorMessage("La imagen supera los 2MB, por favor seleccione una más pequeña.");
            } else {
                setErrorMessage(null);
                setSelectedImage(file);
                setSrc(URL.createObjectURL(file));
            }
        }
    };

    const handleSave = async () => {
        setLoading(true);
        const newImage = selectedImage ? await uploadImage(selectedImage).catch(() => editedItem.image) : editedItem.image;
        const updatedItem = { ...editedItem, image: newImage ?? "" };

        try {
            if (typeof index === "number" && config?.[type]?.items) {
                const copyArray = [...config[type]!.items];
                copyArray[index] = updatedItem;
                await editProp(`${type}.items`, copyArray);
            } else {
                await editProp(`${type}.items`, [...(config?.[type]?.items || []), updatedItem]);
            }
            setAlert({ type: 'success', msg: 'Elemento actualizado con éxito' });
            setOpen(false);
        } catch (error) {
            setAlert({ type: 'error', msg: 'Hubo un error al actualizar el elemento' });
        }

        setLoading(false);
    };

    return (
        <>
            <div className="rowButtonAction" onClick={handleOpen}>
                {!customTrigger ? <EditIcon style={{ width: 37, height: 37 }} /> : customTrigger}
            </div>

            <Modal open={open} onClose={(e, reason) => handleClose(reason)}>
                <Box sx={style}>
                    <div className="closeIcon" onClick={() => handleClose()}><CloseIcon /></div>
                    <Typography variant="h6">Editar {type === 'articles' ? 'Artículo' : 'Sección'}</Typography>
                    <div className="textInModal">
                        <span>Título: </span>
                        <input type="text" value={editedItem.title} onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })} />
                    </div>
                    <div className="dragContainer">
                        <img className="editBoxImage" src={src} alt="editImagePreview" />
                        <label htmlFor="image-upload" className="drop-container">
                            <span className="drop-title">Arrastra un archivo aquí</span> o
                            <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </div>
                    <div className="textInModal"><span>Contenido: </span></div>
                    <div style={{ maxHeight: "70vh", width: "100%" }}>
                        <MDEditor minHeight={300} value={editedItem.content} onChange={(text) => setEditedItem({ ...editedItem, content: text ?? "" })} commands={[commands.bold, commands.italic, commands.strikethrough]} extraCommands={[]} />
                    </div>
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    <div className="modalButtons">
                        <button className="backModal" onClick={() => handleClose()}>Volver</button>
                        <button className={`confirmModal ${!editedItem.title || !editedItem.content || loading ? 'buttonDisabled' : ''}`} onClick={handleSave} disabled={!editedItem.title || !editedItem.content || loading}>
                            {!loading ? 'Guardar' : <CircularProgress size={20} sx={{ color: 'black' }} />}
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ArticleModal;
