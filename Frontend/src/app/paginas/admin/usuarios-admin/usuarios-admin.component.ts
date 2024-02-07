import { Component } from '@angular/core';
import { MenuComponent } from '../../../shared/menu/menu.component';


@Component({
    selector: 'app-usuarios-admin',
    standalone: true,
    templateUrl: './usuarios-admin.component.html',
    styleUrl: './usuarios-admin.component.scss',
    imports: [MenuComponent]
})
export class UsuariosAdminComponent {

}
