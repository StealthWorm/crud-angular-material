import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from './client';
import { ClientService } from '../services/clients/client.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BrasilApiService } from '../services/brasil-api/brasil-api.service';
import { Estado, Municipio } from '../services/brasil-api/brasil-api.models';

@Component({
  selector: 'app-register',
  imports: [
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private _snackBar = inject(MatSnackBar);

  client: Client = Client.newClient();
  isEdit: boolean = false;
  ufs: Estado[] = [];
  municipios: Municipio[] = [];

  // Injeta o serviço de cliente
  constructor(
    private clientService: ClientService,
    private brasilApiService: BrasilApiService,
    private route: ActivatedRoute, // para capturar o id da rota
    private router: Router, // para redirecionar para a página de consulta
  ) { }

  ngOnInit() {
    // mapeia o id da rota
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        let clientFound = this.clientService.getById(params.id);

        if (clientFound) {
          this.isEdit = true;
          this.client = clientFound;
        }
      }
    });

    this.loadUfs(); // carrega as UFs após renderizar o componente
  }

  loadUfs() {
    this.brasilApiService.getUfs().subscribe((ufs) => {
      this.ufs = ufs;
      console.log(this.ufs);
    }, (error) => {
      console.error('Erro ao carregar as UFs', error);
    });
  }

  onSubmit() {
    if (this.client.name && this.client.email && this.client.birthDate && this.client.cpf) {
      if (this.isEdit) {
        this.clientService.update(this.client);
        this.router.navigate(['/consult']);
        this.openSnackBar('Cliente atualizado com sucesso', 'Fechar');
      } else {
        this.clientService.register(this.client);
        this.openSnackBar('Cliente cadastrado com sucesso', 'Fechar');
      }

      this.client = Client.newClient();
    } else {
      alert('Preencha todos os campos obrigatórios');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
