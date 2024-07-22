const uploadImage = async (selectedImage: any) => {
    try {
        const dbUrl = process.env.REACT_APP_API_URL ?
            (process.env.REACT_APP_API_URL.endsWith("/") ? process.env.REACT_APP_API_URL.slice(0, -1) : process.env.REACT_APP_API_URL)
            : "https://template-peluquerias-back.vercel.app"
        const formData = new FormData();
        formData.append('photo', selectedImage);

        const response = await fetch(`${dbUrl}/cloudinary`, {
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