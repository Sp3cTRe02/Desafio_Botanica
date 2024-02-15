import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ArbolesAdminComponent } from './paginas/admin/arboles-admin/arboles-admin.component';
import { UsuariosAdminComponent } from './paginas/admin/usuarios-admin/usuarios-admin.component';
import { FamiliaAdminComponent } from './paginas/admin/familia-admin/familia-admin.component';
import { ArbolesGeneralComponent } from './paginas/arboles-general/arboles-general.component';
import { ArbolGeneralComponent } from './paginas/arboles-general/arbol-general/arbol-general.component';
import { NoticiasComponent } from './paginas/noticias/noticias.component';


export const routes: Routes = [
    { path: '', component: InicioComponent },

    {
        path: 'arboles',
        component: ArbolesGeneralComponent
    },

    {
        path: 'noticias',
        component: NoticiasComponent
    },


    {
        path: 'arboles/:id',
        component: ArbolGeneralComponent
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


