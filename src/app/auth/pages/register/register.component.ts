import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  constructor(private fb: FormBuilder,
      private router: Router,
      private authService: AuthService) { }

  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  save(){
    const { name, email, password } = this.miFormulario.value;
    this.authService.register(name, email, password )
    .subscribe( resp => {
      if ( resp === true ){
        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire('Error', resp, 'error' );
      }
    } );
  }

}
