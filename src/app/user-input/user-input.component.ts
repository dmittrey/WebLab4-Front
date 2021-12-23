import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent implements OnInit {

  // basePath;
  heroForm!: FormGroup;

  constructor(
    private fb: FormBuilder) {
  }

  ngOnInit() {
    // this.basePath = window.location.host.includes('localhost') ? '' : '/ng-select';
    this.heroForm = this.fb.group({
      heroId: 'batman',
      agree: null
    });
  }

}
