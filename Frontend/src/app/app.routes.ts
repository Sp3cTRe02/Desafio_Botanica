import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ArbolesAdminComponent } from './paginas/admin/arboles-admin/arboles-admin.component';
import { FamiliasComponent } from './paginas/familias/familias.component';
import { UsuariosAdminComponent } from './paginas/admin/usuarios-admin/usuarios-admin.component';
import { FamiliaAdminComponent } from './paginas/admin/familia-admin/familia-admin.component';


export const routes: Routes = [
    { path: '', component: InicioComponent },

    {
        path: 'familias',
        component: FamiliasComponent
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
    
    {
    path: 'arboles-admin',
    component: ArbolesAdminComponent,
},


    
];


