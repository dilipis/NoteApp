import { Component } from '@angular/core';
import {NoteService} from './note/note.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NoteService]
})
export class AppComponent {
  title = 'app works!';
}
