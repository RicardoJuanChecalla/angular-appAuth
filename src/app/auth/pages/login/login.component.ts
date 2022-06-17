import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  miFormulario: FormGroup = this.fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });
  
  login(){
    // console.log(this.miFormulario.value);
    const { email, password } = this.miFormulario.value;
    this.authService.login(email, password )
      .subscribe( resp => {
        if ( resp === true ){
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire('Error', resp, 'error' );
        }
      } );
  }

}
