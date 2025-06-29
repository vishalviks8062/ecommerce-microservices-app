import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMsg: string = '';
  successMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe({
        next: () => {
          this.successMsg = 'Registration successful! Redirecting to login...';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          this.errorMsg = err.error?.message || 'Registration failed';
        }
      });
    }
  }

  // onSubmit(): void {
  //   if (this.registerForm.valid) {
  //     const { username, password } = this.registerForm.value;
  //     this.userService.register({ username, password }).subscribe({
  //       next: () => {
  //         this.successMsg = 'Registration successful! Redirecting to login...';
  //         setTimeout(() => this.router.navigate(['/login']), 2000);
  //       },
  //       error: (err) => {
  //         this.errorMsg = err.error?.message || 'Registration failed';
  //       }
  //     });
  //   }
  // }
}
