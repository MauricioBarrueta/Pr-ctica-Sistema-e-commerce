/**
 *! Interfaces de la orden y detalles de la orden */

export interface Details {
    productId: number;
    productName: string;
    cant: number;
}

export interface Order {
    name: string;
    shippingAddress: string;
    city: string;
    date: string;
    isDelivery: boolean;
    id: number;
}

/* Interface que acopla las dos interfaces anteriores */
export interface DetailsOrder {
    details: Details[];
    orderId: number;
    //id?: number;
}