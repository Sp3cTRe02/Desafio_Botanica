import { Component } from '@angular/core';
import { MenuComponent } from "../../../shared/menu/menu.component";
import { ActivatedRoute } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'app-arbol-general',
    standalone: true,
    templateUrl: './arbol-general.component.html',
    styleUrl: './arbol-general.component.scss',
    imports: [MenuComponent,GalleriaModule]
})
export class ArbolGeneralComponent {
    responsiveOptions: any[] | undefined;
    
    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            const arbolId = params['id'];
          });
    }
}
