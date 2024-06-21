import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { Note } from './interfaces/note';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NoteFormComponent,NoteListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'noteApp';
 selectedNote!:Note;
  fromchild(value:Note) {
   this.selectedNote = value;
    
  }

}
