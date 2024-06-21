import { Component,Input,OnInit,OnChanges,SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Note } from '../../interfaces/note';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss'
})
export class NoteFormComponent implements OnInit,OnChanges {
  @Input() newvalue!:Note;
  constructor(private fb:FormBuilder,private noteService: NoteService){
    this.noteService.getEditable().subscribe(
     {
      next: (res)=> this.idEdit = res
     }
    )
  }
  noteForm!: FormGroup;
  idEdit!:boolean;
  ngOnInit(): void {
    this.noteForm = this.fb.group({
      id: new Date().getTime(),
      title: ['',Validators.required],
      content: ['']
    })
  }

  onSubmit() {
    if(this.noteForm.invalid){
      return;
    }
    const note:Note = this.noteForm.value;
    if(this.idEdit) {
      this.noteService.updateNote(note);
      this.noteService.setEdit(false);
    } else {
      this.noteService.createNote(note);
    }
    this.noteForm.reset();


  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['newvalue'].currentValue) {
      const value = changes['newvalue'].currentValue;
      this.noteForm.patchValue({
        id: value.id,
        title: value.title,
        content: value.content
      })
    }
  }

}
