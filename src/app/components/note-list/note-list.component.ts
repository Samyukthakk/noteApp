import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Note } from '../../interfaces/note';
import { NoteService } from '../../services/note.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent implements OnInit {
notes:Note[]= [];
@Output() selectedNote = new EventEmitter<Note>();
constructor(private noteService: NoteService,private http: HttpClient){}
ngOnInit(): void {
  this.noteService.getNotes().subscribe((res:Note[])=> {
    this.notes = res;
  })
}

editNote(item:Note) {
this.noteService.setEdit(true);
this.selectedNote.emit(item);
}
deleteNote(id: number){
  this.noteService.deleteNote(id);
}



}
