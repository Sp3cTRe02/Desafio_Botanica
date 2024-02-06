import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { FamiliaAdminComponent } from './paginas/familia-admin/familia-admin.component';
import { ArbolesAdminComponent } from './paginas/arboles-admin/arboles-admin.component';
import { UsuariosAdminComponent } from './paginas/usuarios-admin/usuarios-admin.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    {
        path: 'familias-admin',
        component: FamiliaAdminComponent,
    },

    {
        path: 'arboles-admin',
        component: ArbolesAdminComponent,
    },

    {
        path: 'usuarios-admin',
        component: UsuariosAdminComponent,
    },

    {
        path: 'arboles-familias',
        component: ArbolesAdminComponent
    }
];


