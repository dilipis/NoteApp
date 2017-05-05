import { AUTH_ROUTES } from './auth/auth.routing';
import { NoteComponent } from './note/note.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from "./auth/auth.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/notes', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent, children:AUTH_ROUTES },
    { path: 'notes', component: NoteComponent }
];

export const appRoutes = RouterModule.forRoot(APP_ROUTES);