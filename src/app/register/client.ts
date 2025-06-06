import { v4 as uuid } from 'uuid';

export class Client {
  id?: string;
  name?: string;
  email?: string;
  birthDate?: string;
  cpf?: string;
  uf?: string;
  city?: string;

  static newClient(): Client {
    let client = new Client();
    client.id = uuid();

    return client;
  }
}

