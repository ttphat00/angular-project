import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/core/services/role/role.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  hide = true;

  createAccountForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['', [Validators.required]],
  });

  get firstName() {
    return this.createAccountForm.get("firstName");
  }

  get lastName() {
    return this.createAccountForm.get("lastName");
  }

  get email() {
    return this.createAccountForm.get("email");
  }

  get password() {
    return this.createAccountForm.get("password");
  }

  get role() {
    return this.createAccountForm.get("role");
  }

  constructor(
    private fb: FormBuilder,
    public roleService: RoleService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles(){
    if(!this.roleService.roles){
      this.roleService.getAllRoles()
        .subscribe();
    }
  }

  getErrorEmail() {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }

    return this.email?.hasError('email') ? 'Please enter a valid email address' : '';
  }

  getErrorFirstName() {
    return this.firstName?.hasError('required') ? 'First name is required' : '';
  }

  // getErrorLastName() {
  //   return this.lastName?.hasError('required') ? 'Last name is required' : '';
  // }

  getErrorRole() {
    return this.role?.hasError('required') ? 'Role is required' : '';
  }

  getErrorPassword() {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    }

    return this.password?.hasError('minlength') ? 'Password must be at least 8 characters long' : '';
  }

  onSubmit() {
    const firstName: string = this.firstName?.value as string;
    const lastName: string = this.lastName?.value as string;
    const email: string = this.email?.value as string;
    const password: string = this.password?.value as string;
    const roleId: string = this.role?.value as string;
    const createdAt: Date = new Date();

    this.authService.createAccount(firstName, lastName, email, password, roleId, createdAt)
      .subscribe(user => {
        if(user){
          this.userService.users?.push(user);
          this.router.navigate([this.authService.redirectUrl]);
        }
      })
  }
}
