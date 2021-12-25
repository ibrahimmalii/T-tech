import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  form: FormGroup = new FormGroup({});

  private user?: User;
  public isLogged: Boolean = false;
  public isLoginSuccess = false;
  public isLoginError = false;

  ngOnInit(): void {
    //************************** Check if user already logged ******************/
    if(this.userService.isLogged()){
      const role_id = localStorage['role_id'];
      this.redirectionBasedOnRoles(+role_id);
    }
    // Validate Login Form
    this.form = this.formBuilder.group({
      email: [
        '',
        [Validators.email, Validators.maxLength(255), Validators.required],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  login() {
    this.isLogged = true;
    if (this.form.valid) {
      this.userService.login(this.form.value).subscribe((response) => {
        const apiResponse = response as User;
        if(apiResponse.token){
          this.isLoginSuccess = true;
          this.isLoginError = false;
          localStorage['token'] = apiResponse.token;
          localStorage['name'] = apiResponse.user?.name;
          const role_id = apiResponse.user?.role_id;
          localStorage['role_id'] = role_id;
          this.userService.setLoggedStatus(true);
          this.redirectionBasedOnRoles(role_id);
        }
      }, (error)=> {
        this.isLoginError = true;
        console.error;
      });
    }
  }

  redirectionBasedOnRoles(role: any){
    if(role === 1){
      this.router.navigateByUrl('/home/admin');
    } else if(role === 2){
      this.router.navigateByUrl('/home/client');
    } else if( role === 3) {
      this.router.navigateByUrl('/home/employee');
    } 
  }

  hideAlert() {
    this.isLoginSuccess = false;
    this.isLoginError = false;
  }

  // For set cookie
  setValue(key: string, value: string) {}
}
