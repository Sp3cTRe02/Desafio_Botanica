import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { LoginmodalComponent } from "./loginmodal/loginmodal.component";
import { RegistromodalComponent } from "./registromodal/registromodal.component";
import { PerfildropdownComponent } from "./perfildropdown/perfildropdown.component";

@Component({
    selector: 'app-menu',
    standalone: true,
    providers: [MessageService],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    imports: [CommonModule, RouterOutlet,RouterModule, FormsModule, ReactiveFormsModule, MessagesModule, ToastModule, PasswordModule, LoginmodalComponent, RegistromodalComponent, PerfildropdownComponent]
})
export class MenuComponent {
 

}
