import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  errorMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  registerForm = this.fb.nonNullable.group({
    pseudo: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true)
    this.errorMessage.set(null)

    const credentials = this.registerForm.getRawValue();

    this.authService.register(credentials).subscribe({
      next: () => {
        void this.router.navigate(['/login'])
      },
      error: (err: string) => {
        this.errorMessage.set(err)
        this.isLoading.set(false)
      },
      complete: () => {
        this.isLoading.set(false)
      }
    });
  }
}
