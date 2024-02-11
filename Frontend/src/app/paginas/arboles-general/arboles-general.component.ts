import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { ArbolesGeneralService } from './services/arboles-general.service';
import { Arbol } from './interfaces/arboles-general.interface';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { PrimeNGConfig, SelectItem } from "primeng/api";
import { RouterLink } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { FamiliaAdminService } from '../admin/services/familia-admin.service';
import { FamiliaAdmin } from '../admin/interface/admin.interface';

@Component({
  selector: 'app-arboles-general',
  standalone: true,
  templateUrl: './arboles-general.component.html',
  styleUrl: './arboles-general.component.scss',
  imports: [MenuComponent, CommonModule, DataViewModule, DropdownModule, RouterLink, MultiSelectModule, FormsModule]
})
export class ArbolesGeneralComponent {
  arboles: Arbol[] = []
  listCategory: SelectItem[] = []
  categoriaSeleccionada: SelectItem[] = []
  familias: FamiliaAdmin[] = []


  @ViewChild("dv") dataView: any

  constructor(private arbolesGeneral: ArbolesGeneralService, private primengConfig: PrimeNGConfig, private adminService: FamiliaAdminService) {
    this.mostrarArbolesGeneral()
    this.obtenerFamilias()



    this.primengConfig.ripple = true


  }

  obtenerFamilias() {
    this.adminService.obtenerFamiliasAdmin().subscribe((response: any) => {

      this.familias = response.msg;
      this.listCategory = this.familias.map(familia => {
        return { label: familia.nombre, value: familia.nombre };
      });


    });
  }

  mostrarArbolesGeneral() {
    this.arbolesGeneral.getArbolesGeneral().subscribe((response: any) => {
      this.arboles = response.data.arboles
    })
  }


}
