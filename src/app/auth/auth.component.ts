import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = false;
  authForm: FormGroup;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    if (!this.authForm.valid) {
      return;
    }
    const email: string = this.authForm.value.email;
    const password: string = this.authForm.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {
    } else {
      this.authService.signup(email, password).subscribe(
        (responseData) => {
          console.log(responseData);
          this.isLoading = false;
        },
        (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }

    this.authForm.reset();
  }

  private initForm() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
}
