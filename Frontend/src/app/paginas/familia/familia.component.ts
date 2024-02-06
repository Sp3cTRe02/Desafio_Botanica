import { Component } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
    selector: 'app-familia',
    standalone: true,
    templateUrl: './familia.component.html',
    styleUrl: './familia.component.scss',
    imports: [MenuComponent]
})
export class FamiliaComponent {

}
