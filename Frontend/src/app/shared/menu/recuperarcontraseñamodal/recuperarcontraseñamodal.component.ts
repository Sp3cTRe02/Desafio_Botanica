import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './recuperarcontraseñamodal.component.html',
  styleUrls: ['./recuperarcontraseñamodal.component.scss']
})
export class ModalComponent {
  emailForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.emailForm = this.formBuilder.group({
      email: ['']
    });
  }

  enviarEmail() {
    let body={
      email:this.emailForm.value.email
    };
  }
  
}  