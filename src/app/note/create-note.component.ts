import { NgForm } from '@angular/forms';
import { NoteService } from './note.service';
import { Component, OnInit } from '@angular/core';
import { Note } from "../models/note.model";

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styles: []
})
export class CreateNoteComponent implements OnInit {

  constructor(private noteService: NoteService) { }

  currentNote: Note;

  ngOnInit() {
    this.noteService.editClicked.subscribe(
      (note: Note) => { this.currentNote = note; }
    );
  }

  addNote(form: NgForm) {
    if (this.currentNote) {
      this.currentNote.noteText = form.value.note;
      this.currentNote.noteLink = form.value.link;
      this.currentNote.noteTags = form.value.tags;

      this.noteService.updateNotes(this.currentNote)
      .subscribe(
        (data) => { alert(data.message);
                  console.log(data.obj);
                },
        (error) => {  alert(error.error);
                    console.log(error.error.message + ' : ' + error.error.IDs);
                  }
      );
      this.currentNote = null;
    }
    else {
      const newNote = new Note(form.value.note, '', form.value.link, form.value.tags);
      this.noteService.addNotes(newNote)
      .subscribe(
        (data) => { alert(data.message);
                  console.log(data.obj);
                },
        (error) => {  alert(error.error);
                    console.log(error.error);
                  }
      );
    }
    form.resetForm();
  }

  onClear(form: NgForm) {
    this.currentNote = null;
    form.resetForm();
  }
}
