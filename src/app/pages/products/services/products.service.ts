/**
 * * Service: Es una capa que se añade para manejar datos
 * * Es un proveedor de datos, que mantiene lógica de acceso y lógica de negocio
 * ! Los servicios serán consumidos por los componentes y tendrán la responsabilidad de acceder a la
 * ! información y de manipularla */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root' // provideIn: Indica que este service está disponible para toda la aplicación
})

export class ProductsService {  
  /**
   *! La variable del URL suele ir en la carpeta 'enviornments */
  private apiURL = 'http://localhost:3000'; /* Se especifica la ruta de la API */

  constructor(private http: HttpClient) { }  /* Despues de agregar HttpClientModule se crea una propiedad en el constructor y se tipea con HttpClient */
  
  /* Método que realiza una petición a una URL, en este caso la de la API de prueba */      
  getProducts(): Observable<Product[]> { /* Se tipea la interface 'Product' y se especifica que devuelva los datos en un array */
    return this.http.get<Product[]>(`${this.apiURL}/products`);
  } 

  /* Método que actualiza el stock del producto al realizar la compra */
  updateStock(productId: number, stock: number): Observable<any> {
    const body = {"stock": stock}; /* Segundo parámetro requerido por el método patch() */
    return this.http.patch<any>(`${this.apiURL}/products/${productId}`, body) // patch(): Solo se manda la propiedad que se desea modificar, y no todas las propiedades de productos
  }

  /**
   * ! Observable: Es un flujo de datos en el tiempo. Representan una colección de futuros valores o data */ 
}
