import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: []
})
export class SigninComponent implements OnInit {

  myForm: FormGroup;

  constructor(private authenticationService:AuthenticationService, private router:Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      emailID: new FormControl(null, [
        Validators.required
        // ,Validators.pattern("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/")
        ]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    var signedInUser = new UserModel(this.myForm.value.emailID,this.myForm.value.password);
    this.authenticationService.onSignIn(signedInUser)
    .subscribe(
      data => {
        localStorage.setItem('token',data.obj.token);
        localStorage.setItem('userID',data.obj.userID);
        this.router.navigateByUrl('/');
      },
      error => console.log(error)

    );
  }
}
