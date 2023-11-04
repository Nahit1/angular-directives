import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  authUser() {
    if (!this.form.valid) {
      alert('Please fill all fields');
      return;
    }
    const userName = this.form.controls['username'].value;
    const password = this.form.controls['password'].value;
    if (userName !== null && password !== null) {
      this.authService.login(userName, password).subscribe((res) => {
        if (res.userName !== 'Not Found') {
          localStorage.setItem('role', res.role);
          this.router.navigate(['/movies']);
        }
      });
    }
  }
}
