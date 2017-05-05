import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Headers } from '@angular/http';
import { notEqual } from 'assert';
import { Injectable, EventEmitter } from '@angular/core';
import { Note } from "../models/note.model";
import 'rxjs/Rx';

@Injectable()
export class NoteService {

  constructor(private http: Http) { }

  private notes: Note[] = [];
  editClicked = new EventEmitter<Note>();

  getTokenQueryString(): string {
    return localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
  }

  getNotes() {
    // return this.notes;
    return this.http.get('http://localhost:3000/note' + this.getTokenQueryString())
      .map((response: Response) => {
        const notes = response.json().obj;
        let modNotes: Note[] = [];
        for (let note of notes) {
          modNotes.push(new Note(note.noteText, note.noteAuthor.firstName, note.noteLink, note.noteTags, note._id, note.noteAuthor._id));
        }
        this.notes = modNotes;
        return modNotes;
      })
      .catch((err: Response) => Observable.throw(err.json()));
  }

  addNotes(note: Note) {
    // this.notes.push(note);
    const body = JSON.stringify(note);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/note' + this.getTokenQueryString(), body, { headers: headers })
      .map((response: Response) => {
        const res = response.json().obj;
        const newNote = new Note( res.noteText,
                                  res.noteAuthor.firstName,
                                  res.noteLink,
                                  res.noteTags,
                                  res._id,
                                  res.noteAuthor._id);
        this.notes.push(newNote);
        return response.json();
      })
      .catch((err: Response) => Observable.throw(err.json()));
  }

  deleteNotes(note: Note) {
    this.notes.splice(this.notes.indexOf(note), 1)
    const body = JSON.stringify(note);
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.delete('http://localhost:3000/note/' +note.noteID+ this.getTokenQueryString(), body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((err: Response) => Observable.throw(err.json()));
  }

  editNote(note: Note) {
    this.editClicked.emit(note);
  }

  updateNotes(note:Note){
    const body = JSON.stringify(note);
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.patch('http://localhost:3000/note/' +note.noteID+ this.getTokenQueryString(), body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((err: Response) => Observable.throw(err.json()));
  }

  belongsToUser(note:Note){
    return (note.noteCreatorID === localStorage.getItem('userID'));
  }

}
