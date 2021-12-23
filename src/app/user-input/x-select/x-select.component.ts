import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-x-select',
  templateUrl: './x-select.component.html',
  styleUrls: ['./x-select.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class XSelectComponent implements OnInit {

  heroForm!: FormGroup;
  ages: any[] = [
    { value: '<18', label: 'Under 18' },
    { value: '18', label: '18' },
    { value: '>18', label: 'More than 18' },
  ];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.heroForm = this.fb.group({
      age: [null, Validators.required],
    });
  }

}
