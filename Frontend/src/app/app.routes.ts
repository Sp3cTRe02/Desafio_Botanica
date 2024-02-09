import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ArbolesAdminComponent } from './paginas/admin/arboles-admin/arboles-admin.component';
import { UsuariosAdminComponent } from './paginas/admin/usuarios-admin/usuarios-admin.component';
import { FamiliaAdminComponent } from './paginas/admin/familia-admin/familia-admin.component';
import { ArbolesGeneralComponent } from './paginas/arboles-general/arboles-general.component';


export const routes: Routes = [
    { path: '', component: InicioComponent },

    {
        path: 'familias',
        component: ArbolesGeneralComponent
    },

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

    
];


