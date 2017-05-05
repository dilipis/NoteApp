import { UserModel } from '../models/user.model';
import { AuthenticationService } from './auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      emailID: new FormControl(null, [
        Validators.required
        // ,Validators.pattern("[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}")
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    var newUser = new UserModel(this.myForm.value.emailID,
                                this.myForm.value.password,
                                this.myForm.value.firstName,
                                this.myForm.value.lastName
                              );
    this.authenticationService.onSignUp(newUser)
      .subscribe(
      data => alert('User Signed up'),
      error => {
        console.log(error);
        alert('Error : ' + error.message)
      }
      );
    this.myForm.reset();
  }

}
