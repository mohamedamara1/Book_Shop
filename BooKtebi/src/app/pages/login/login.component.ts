import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: [""],
    password: [""],
    stayConnected: [false],
   
  });
  constructor(
    private fb:FormBuilder,
  ) { }
  ngOnInit(): void {}
  login(){
    console.log("login",this.loginForm.value)}
}
