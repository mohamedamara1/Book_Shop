import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  router:any;

  constructor(router:Router) { 
    this.router = router;
    }
  ngOnInit(): void {}

  async login(){
    var email=(<HTMLInputElement>document.getElementById("mail")).value;
    var password=(<HTMLInputElement>document.getElementById("pass")).value;
    console.log(email)
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: 'POST',
      body:`{"user":"${email}","pwd":"${password}"}`});
      if(response.ok){
          response.json().then(async (data) =>{
            console.log(data);
            if (JSON.stringify(data) !="[]"){
              localStorage.setItem("isLoggedin" , "true");
              this.router.navigate(['/home']);
            }
            else{
              var d = document.getElementById("wrong");
              if(!d){document.getElementById("wrongholder")!.insertAdjacentHTML('beforeend', '<b style="color: red;" id = "wrong">Email/password invalid</b>');}
              
            }
            
          });
          
        
          

}
}}
