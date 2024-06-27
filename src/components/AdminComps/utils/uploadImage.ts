const uploadImage = async (selectedImage: any) => {
    try {
        const formData = new FormData();
        formData.append('photo', selectedImage);

        const response = await fetch("https://template-peluquerias-back.vercel.app/cloudinary", {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud POST: ${response.statusText}`);
        }

        const data = await response.json();
        return data.url as string
    } catch (error) {
        console.error(error);
    }
}

export default uploadImage