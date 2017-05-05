import {
    ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS
} from '@angular/platform-browser-dynamic/platform-browser-dynamic';
import { BlockScopeAwareRuleWalker } from 'tslint/lib';
import { NoteService } from '../note.service';
import { Note } from '../../models/note.model';
import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styles: [`
            .author{
              display:inline-block;
              font-style: italic;
              width: 80%; 
            }
            .config{
              display:inline-block;
              text-align:right;
              width:19%;
            }
  `]
})
export class SingleNoteComponent implements OnInit {

  @Input() note:Note;
  
  constructor(private noteService:NoteService) { }

  ngOnInit() {
  }

  onDelete(){
    this.noteService.deleteNotes(this.note)
    .subscribe(
        (data) => { alert(data.message);
                  console.log(data.obj);
                },
        (error) => {  alert(error.error);
                    console.log(error.error);
                  }
    );
  }

  onEdit(){
    this.noteService.editNote(this.note);
  }

  belongsToUser(){
   return this.noteService.belongsToUser(this.note);
  }

}
