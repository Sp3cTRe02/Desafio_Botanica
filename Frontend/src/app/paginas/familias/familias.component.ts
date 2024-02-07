import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
    selector: 'app-familias',
    standalone: true,
    templateUrl: './familias.component.html',
    styleUrl: './familias.component.scss',
    imports: [CommonModule, MenuComponent]
})
export class FamiliasComponent {

}
