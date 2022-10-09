import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DetailsOrder, Order } from "../interfaces/order.interface";
import { Store } from '../interfaces/store.interface';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    /* Se hace la petición a la API para obtener las 'stores */
    private apiURL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    /* Método que devuelve un Observable con un array de toda la data de 'stores' */
    getStores(): Observable<Store[]> {
        return this.http.get<Store[]>(`${this.apiURL}/stores`);
    }

    /** Métodos que se encargan de gestionar la orden el detalle de la orden
    *! Es recomendable tener un service independiente para la gestion de las ordenes en este caso, pero en el curso se hizo así para ahorrar tiempo */
    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${this.apiURL}/orders`, order);
    }

    saveDetailsOrder(details: DetailsOrder): Observable<DetailsOrder> {
        return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`, details);
    }
}