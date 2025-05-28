import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from '../services/clients/client.service';
import { Client } from '../register/client';

@Component({
  selector: 'app-consult',
  imports: [
    MatInputModule,
    MatTableModule,
    MatCardModule,
    FlexLayoutModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.scss'
})
export class ConsultComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'actions'];
  clientsList: Client[] = [];

  constructor(private clientService: ClientService) { }

  // função do ciclo de vida do angular, similar ao componentDidMount do react
  ngOnInit() {
    this.clientsList = this.clientService.getAll();
  }

  searchClient(name: string) {
    this.clientsList = this.clientService.getByName(name);
  }
}
