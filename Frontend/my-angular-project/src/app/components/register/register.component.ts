import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';   
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  passwordVisible: boolean = false; 

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible; 
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:3002/api/v1/user/createuser', this.registerForm.value)
        .subscribe(
          (response: any) => {
            console.log('Registration successful', response);
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Registration failed', error);
          }
        );
    } else {
      console.log('Form is not valid');
    }
  }
}
