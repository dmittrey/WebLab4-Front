import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

//   const switchers = [...document.querySelectorAll('.switcher')]
//
//   switchers.forEach(item => {
//   item.addEventListener('click', function() {
//     switchers.forEach(item => item.parentElement.classList.remove('is-active'))
//     this.parentElement.classList.add('is-active')
//   })
// })


constructor() { }

  ngOnInit(): void {
  }

}
