import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes: Note[] = []
  private notesSubject = new BehaviorSubject<Note[]>([])
  private isEdit = new BehaviorSubject<boolean>(false);
  constructor() { }

  getEditable() {
   return this.isEdit.asObservable();
  }

  setEdit(value: boolean) {
    this.isEdit.next(value);
  }

  getNotes():Observable<Note[]>{
    return this.notesSubject.asObservable();
  }

  createNote(note:Note){
     note.id = new Date().getTime();
     this.notes.push(note);
     this.notesSubject.next(this.notes);
  }

  updateNote(updatenote: Note) {
      const index = this.notes.findIndex((note)=> note.id === updatenote.id);
      if(index != -1) {
        this.notes[index] = updatenote;
        this.notesSubject.next(this.notes);
      }
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter((note)=> note.id !==id);
    this.notesSubject.next(this.notes);
  }
}
