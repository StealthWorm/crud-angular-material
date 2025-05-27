import { Injectable } from '@angular/core';
import { Client } from '../../register/client';

@Injectable({
  // Informa que o serviço é um serviço de nível raiz, porem podemos atrelar a um módulo individualmente
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  register(client: Client) {
    console.log('register ', client);
  }
}
