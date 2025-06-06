import { Injectable } from '@angular/core';
import { Client } from '../../register/client';

@Injectable({
  // Informa que o serviço é de nível raiz, porem podemos atrelar a um módulo individualmente
  providedIn: 'root'
})
export class ClientService {
  static REPO_CLIENTS: "_CLIENTS";

  constructor() { }

  register(client: Client) {
    const clients = this.getAll();
    clients.push(client);

    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(clients));
  }

  getAll(): Client[] {
    const clients = localStorage.getItem(ClientService.REPO_CLIENTS);

    if (clients) {
      const clientsArray: Client[] = JSON.parse(clients);
      return clientsArray;
    }

    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify([]));
    return [];
  }

  getByName(name: string): Client[] {
    const clients = this.getAll();

    if (!name) {
      return clients;
    }

    return clients.filter((client) => client?.name?.indexOf(name) !== -1);
  }

  getById(clientId: string): Client | undefined {
    const clients = this.getAll();

    return clients.find((client) => client.id === clientId);
  }

  update(client: Client) {
    const clients = this.getAll();
    const index = clients.findIndex((c) => c.id === client.id);

    clients[index] = client;
    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(clients));
  }

  delete(clientId: string) {
    const clients = this.getAll();

    const index = clients.findIndex((client) => client.id === clientId);

    if (index !== -1) {
      clients.splice(index, 1);
      localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(clients));
    }
  }
}
