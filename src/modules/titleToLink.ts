const titleToLink = (title: string) => {
    return title
        .toLowerCase()
        .trim()              // Convierte todo a minúsculas
        .replace(/[áàäâ]/g, 'a')     // Reemplaza acentos y caracteres especiales
        .replace(/[éèëê]/g, 'e')
        .replace(/[íìïî]/g, 'i')
        .replace(/[óòöô]/g, 'o')
        .replace(/[úùüû]/g, 'u')
        .replace(/\s+/g, '-')        // Reemplaza los espacios por guiones
        .replace(/[^a-z0-9-]/g, '')  // Elimina caracteres no alfanuméricos o guiones
        .replace(/-+/g, '-');        // Elimina guiones múltiples seguidos
}

export default titleToLink;
