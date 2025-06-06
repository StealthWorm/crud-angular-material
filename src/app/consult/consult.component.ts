import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Client } from '../register/client';
import { ClientService } from '../services/clients/client.service';

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
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
  ],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.scss'
})
export class ConsultComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  private _snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['id', 'name', 'email', 'birthDate', 'cpf', 'uf', 'actions'];
  dataSource: MatTableDataSource<Client>;
  searchName: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientService: ClientService, // injeção de dependência do clientService
    private router: Router, // injeção de dependência do router
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Client>([]);
    // Configuração do filtro personalizado
    this.dataSource.filterPredicate = (data: Client, filter: string) => {
      const searchStr = filter.toLowerCase();
      return (data.name?.toLowerCase() || '').includes(searchStr)
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadClients();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadClients() {
    const clients = this.clientService.getAll();
    this.dataSource.data = clients;
  }

  searchClient() {
    this.dataSource.filter = this.searchName.trim().toLowerCase();
  }

  editClient(clientId: string) {
    this.router.navigate(['/register'], { queryParams: { id: clientId } });
  }

  confirmDelete(clientId: string) {
    const client = this.dataSource.data.find(c => c.id === clientId);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { clientName: client?.name || 'Cliente' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteClient(clientId);
      }
    });
  }

  deleteClient(clientId: string) {
    this.clientService.delete(clientId);
    this.loadClients(); // atualiza a lista de clientes
    this.openSnackBar('Cliente deletado com sucesso', 'Fechar');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
