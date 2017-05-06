import { NoteService } from '../note.service';
import { Component, OnInit } from '@angular/core';
import {Note} from '../../models/note.model';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styles: []
})
export class NoteListComponent implements OnInit {

  notes:Note[];

  constructor(private noteService:NoteService) { }

  ngOnInit() {
   this.noteService.getNotes()
      .subscribe(
        (notes:Note[]) => {this.notes = notes},
        err => {console.log(err.error)}
      );
  }

}
