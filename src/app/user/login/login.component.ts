import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  isloggedIn: boolean;
  userdata: any;

  constructor(
    private userservice: UserService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isloggedIn = this.userservice.isloggedIn();
    if (this.isloggedIn) {
      this.router.navigate(['profile']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

    // convenience getter for easy access to form fields
    get loginform() { return this.loginForm.controls; }

  OnSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.userservice.login(this.loginForm.value).subscribe((res: any) => {
      if (res.message) {
        this.toastr.error(res.message);
      } else {
        this.userdata = {
          userId: res.user_id,
          token: res.data
        }
        localStorage.setItem('userdata', JSON.stringify(this.userdata));
        this.router.navigate(['profile']);
      }
    });
  }

}
