///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Todo} from './todo';
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import {OwnerValidator} from "./owner.validator";

@Component({ // generated something and it worked ctrl+b to see what it generated
  selector: 'add-todo.component',
  templateUrl: 'add-todo.component.html',
})
export class AddTodoComponent implements OnInit {

  addTodoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { todo: Todo }, private fb: FormBuilder) {
  }

  // not sure if this owner is magical and making it be found or if I'm missing something,
  // but this is where the red text that shows up (when there is invalid input) comes from
  add_todo_validation_messages = {
    'owner': [
      {type: 'required', message: 'Owner is required'},
      {type: 'minlength', message: 'Owner must be at least 2 characters long'},
      {type: 'maxlength', message: 'Owner cannot be more than 25 characters long'},
      {type: 'pattern', message: 'Owner must contain only numbers and letters'},
      {type: 'existingOwner', message: 'Owner has already been taken'}
    ],

    'category': [
      {type: 'pattern', message: 'Category must be an activity'},
      {type: 'required', message: 'Category is required'}
    ],

    'status': [
      {type: 'pattern', message: 'Status must be Complete or Incomplete'},
      {type: 'required', message: 'Status is required'}
    ],

    'body':[
      {type: 'required', message: 'Body is required'},
      {type: 'pattern', message: 'Pattern contains letters and numbers'}
    ],
  };

  createForms() {

    // add todo form validations
    this.addTodoForm = this.fb.group({
      // We allow alphanumeric input and limit the length for owner.
      owner: new FormControl('owner', Validators.compose([
        OwnerValidator.validOwner,
        Validators.pattern('^[A-Za-z0-9\\s]+[A-Za-z0-9\\s]+$(\\.0-9+)?'),
        Validators.required
      ])),
      category: new FormControl('category', Validators.compose([
        Validators.pattern('^[A-Za-z0-9\\s]+[A-Za-z0-9\\s]+$(\\.0-9+)?'),
        Validators.max(80),
        Validators.required
      ])),

      status: new FormControl('status', Validators.compose([
        Validators.pattern('[Complete, Incomplete, complete, incomplete]+'),
        Validators.required
      ])),

      body: new FormControl('body'),
    })

  }

  ngOnInit() {
    this.createForms();
  }

}
