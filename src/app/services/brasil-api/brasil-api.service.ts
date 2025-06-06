import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado, Municipio } from './brasil-api.models';

@Injectable({
  providedIn: 'root'
})
export class BrasilApiService {
  private readonly BASE_URL = 'https://brasilapi.com.br/api';

  // httpClient é um serviço que permite fazer requisições HTTP
  constructor(private http: HttpClient) { }

  // Observable permite lidar com requisições reativas
  getUfs(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.BASE_URL}/ibge/uf/v1`);
  }

  getMunicipios(uf: string): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.BASE_URL}/ibge/municipios/v1/${uf}`);
  }
}
