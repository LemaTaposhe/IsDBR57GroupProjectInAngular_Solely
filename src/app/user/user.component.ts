import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  registrationForm!: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      isActive: [true]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const user: User = this.registrationForm.value;
      this.userService.register(user).subscribe(
        response => {
          this.successMessage = 'Registration successful!';
          this.registrationForm.reset(); // Clear the form
          this.registrationForm.get('isActive')?.setValue(true); // Set default value for checkbox
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    }
  }
}
