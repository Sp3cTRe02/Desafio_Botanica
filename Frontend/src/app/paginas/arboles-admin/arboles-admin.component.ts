import { Component } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
    selector: 'app-arboles-admin',
    standalone: true,
    templateUrl: './arboles-admin.component.html',
    styleUrl: './arboles-admin.component.scss',
    imports: [MenuComponent]
})
export class ArbolesAdminComponent {

}
