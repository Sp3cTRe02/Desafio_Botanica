import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { ArbolesGeneralService } from './services/arboles-general.service';
import { Arbol, ArbolData, ArbolRespuesta } from './interfaces/arboles-general.interface';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { PrimeNGConfig, SelectItem } from "primeng/api";

@Component({
    selector: 'app-arboles-general',
    standalone: true,
    templateUrl: './arboles-general.component.html',
    styleUrl: './arboles-general.component.scss',
    imports: [MenuComponent,CommonModule,DataViewModule,DropdownModule]
})
export class ArbolesGeneralComponent  {
    arboles: Arbol[] = []
    layout: string = 'list'

    sortOrder!: number;
    sortField!: string;
    searchText: string = '';

    sortOptions: SelectItem[]
    listCategory: SelectItem[]


    @ViewChild("dv") dataView: any

    constructor(private arbolesGeneral: ArbolesGeneralService, private primengConfig: PrimeNGConfig) {
        this.mostrarArbolesGeneral()

        this.sortOptions = [
            { label: "Price High to Low", value: "!price" },
            { label: "Price Low to High", value: "price" }
          ];
      
          this.listCategory = [
            { label: "Accessories", value: "Accessories" },
            { label: "Fitness", value: "Fitness" },
            { label: "Clothing", value: "Clothing" },
            { label: "Electronics", value: "Electronics" }
          ];

          this.primengConfig.ripple = true
    }


    onSortChange(event: { value: any; }) {
        let value = event.value;
    
        if (value.indexOf("!") === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
        } else {
          this.sortOrder = 1;
          this.sortField = value;
        }
      }


      onSearchChange() {
        this.dataView.filter(this.searchText, 'in');
      }

    mostrarArbolesGeneral() {
        this.arbolesGeneral.getArbolesGeneral().subscribe((response: any) => {
            this.arboles = response.data.arboles

            
        })
    }

    
}
