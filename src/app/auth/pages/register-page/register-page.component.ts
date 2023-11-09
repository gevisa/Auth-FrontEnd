import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({

  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb          = inject(FormBuilder);
  private authService = inject( AuthService );
  private router      = inject( Router );

  public myForm: FormGroup = this.fb.group({
    name: ['',[ Validators.required, Validators.minLength(3)]],
    email: ['',[ Validators.required, Validators.email ]],
    password: ['',[ Validators.required, Validators.minLength(6) ]]

  })

  register(){
    const data = this.myForm.value;
    console.log( data );
    this.authService.register(data)
     .subscribe({
      next: (response) => {

        Swal.fire('Registro Exitoso','','success').then(() => {
          this.router.navigateByUrl('/auth/login');
        });
      },
      error: (message) => {
        Swal.fire('Error', message, 'error')
      }
     });

  }



}
