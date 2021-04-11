import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    first_name: [""],
    last_name: [""],
    phone: [""],
    email: [""],
    password: [""],
    policy: [false],
   
  });
  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
  }
  signUp(){
    
console.log(this.signupForm.value);
}
}
