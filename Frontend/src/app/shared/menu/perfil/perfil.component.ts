import { Component } from '@angular/core';
import { MenuComponent } from "../menu.component";

@Component({
    selector: 'app-perfil',
    standalone: true,
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.scss',
    imports: [MenuComponent]
})
export class PerfilComponent {

}
