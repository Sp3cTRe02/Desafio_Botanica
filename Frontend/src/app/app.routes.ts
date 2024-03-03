import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ArbolesAdminComponent } from './paginas/admin/arboles-admin/arboles-admin.component';
import { UsuariosAdminComponent } from './paginas/admin/usuarios-admin/usuarios-admin.component';
import { FamiliaAdminComponent } from './paginas/admin/familia-admin/familia-admin.component';
import { ArbolesGeneralComponent } from './paginas/arboles-general/arboles-general.component';
import { ArbolGeneralComponent } from './paginas/arboles-general/arbol-general/arbol-general.component';
import { NoticiasComponent } from './paginas/noticias/noticias.component';
import { NoticiaComponent } from './paginas/noticias/noticia/noticia.component';
import { roleGuard } from './shared/guards/role.guard';
import { NotFoundComponent } from './shared/notFound/not-found/not-found.component';
import {AddUbicacionComponent} from "./paginas/arboles-general/add-ubicacion/add-ubicacion.component";
import {loggedGuard} from "./shared/guards/logged.guard";
import { PerfilComponent } from './shared/menu/perfil/perfil.component';
import { EventosComponent } from './paginas/eventos/eventos.component';
import { EventoComponent } from './paginas/eventos/evento/evento.component';
import { MisEventosComponent } from './paginas/eventos/mis-eventos/mis-eventos.component';
import {RutasComponent} from "./paginas/rutas/rutas/rutas.component";
import { AddEventoComponent } from './paginas/eventos/add-evento/add-evento.component';



export const routes: Routes = [
    { path: '', component: InicioComponent },

    {
        path: 'arboles',
        component: ArbolesGeneralComponent,
    },


    {
        path: 'arboles/:id',
        component: ArbolGeneralComponent
    },

    {
      path : 'rutas',
      component: RutasComponent
    },

    {
      path: 'ubicacion/:id',
      component: AddUbicacionComponent,
      canActivate: [loggedGuard]
    },

    {
        path: 'noticias',
        component: NoticiasComponent
    },

    {
        path: 'noticias/:id',
        component: NoticiaComponent
    },


    {
        path: 'familias-admin',
        component: FamiliaAdminComponent,
        canActivate: [roleGuard]
    },

    {
        path: 'arboles-admin',
        component: ArbolesAdminComponent,
        canActivate: [roleGuard]
    },

    {
        path: 'usuarios-admin',
        component: UsuariosAdminComponent,
        canActivate: [roleGuard]
    },

    {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [loggedGuard]
    },

    {
        path: 'eventos',
        component: EventosComponent,
    },

    {
        path: 'eventos/:id',
        component: EventoComponent
    },

    {
        path: 'mis-eventos',
        component: MisEventosComponent
    },

    {
        path: 'crear-evento',
        component: AddEventoComponent
    },

    { path: '**', component: NotFoundComponent }

];


