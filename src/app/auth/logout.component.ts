import { Router } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  template: `
              <div class="col-md-8 col-md-offset-2">
                <button class="btn btn-danger" (click) = "onLogout()">Logout</button>
            </div>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,private router:Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.authenticationService.onLogout();
    this.router.navigate(['/auth','signin']);
  }


}
