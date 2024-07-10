export interface Img {
    name: string;
    url: string;
}

export interface Contact {
    phone: string;
    address: string;
    email: string;
    city: string;
    state: string;
    mapPoint: string;
    facebook: string;
    instagram: string;
}

export interface BannedDay {
    title: string;
    date: Date;
}

export interface ConfigFile {
    imgsCarrousel: Img[];
    presentationText: string;
    imagePresentation: string;
    presentationTitle: string;
    appointment: {
        bannedDays: BannedDay[]
        mercadoPago:boolean;
    }
    banners: {
        imageAppointment: string;
        imageAboutUs: string;
        imageNews: string;
        imageReservations: string;
    };
    contact: Contact;
    reservationPrice: Number;
    customization: {
        background: {
            backgroundImage: string;
            backgroundTurno: string;
        };
        primary: {
            color: string;
            text: string;
        };
        secondary: {
            color: string;
            text: string;
        };
        logo: {
            primary: string;
            secondary: string;
        }
        shopName: string;
        twoColors: boolean;
    }
}
