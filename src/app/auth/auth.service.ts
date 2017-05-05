import { Http, Headers } from '@angular/http';
import { UserModel } from '../models/user.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    onSignUp(user: UserModel) {

        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('http://localhost:3000/user', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((err: Response) => Observable.throw(err.json()));

    }

    onSignIn(user: UserModel) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('http://localhost:3000/user/signin', body, { headers: headers })
            .map((respose: Response) => respose.json())
            .catch((err: Response) => Observable.throw(err.json()));

    }

    onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
    }

    isLoggedIn() {
        return (localStorage.getItem('userID') !== null);
    }
}