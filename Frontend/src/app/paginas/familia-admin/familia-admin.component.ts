import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { Table, TableModule } from 'primeng/table';

@Component({
    selector: 'app-familia-admin',
    standalone: true,
    templateUrl: './familia-admin.component.html',
    styleUrl: './familia-admin.component.scss',
    imports: [CommonModule,MenuComponent,TableModule]
})

export class FamiliaAdminComponent {
    
    
}
