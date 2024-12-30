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
    imagePresentation: string;
    appointment: {
        bannedDays: BannedDay[]
        mercadoPago: boolean;
        nextMonths: number;
        cancellationWindow: number | string;
        allowApposToday: boolean;
    }
    banners: {
        imageAppointment: string;
        imageAboutUs: string;
        imageNews: string;
        imageReservations: string;
    };
    texts: {
        presentationText: string;
        presentationTitle: string;
        footer: string;
    }
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
        floatButtons: string;
    },
    articles?: {
        active: boolean,
        items: [
            {
                title: string
                content: string
                image: string
            }
        ]
    }
}
