import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  router:any;

  constructor(router:Router) { 
    this.router = router;
    }
  ngOnInit(): void {}

  async signup(){
    var email=(<HTMLInputElement>document.getElementById("mail")).value;
    var password=(<HTMLInputElement>document.getElementById("pass")).value;
    var first=(<HTMLInputElement>document.getElementById("first_name")).value;
    var last=(<HTMLInputElement>document.getElementById("last_name")).value;
    var phone=(<HTMLInputElement>document.getElementById("phone")).value;
    var policy=(<HTMLInputElement>document.getElementById("policy")).value;
    console.log(email)
    const response = await fetch("http://127.0.0.1:8000/register", {
      method: 'POST',
      body:`{"user":"${email}","pwd":"${password}","first":"${first}","last":"${last}","phone":"${phone}","policy":"${policy}"}`});
      if(response.ok){
          response.json().then(async (data) =>{
            console.log(data);
            if (JSON.stringify(data) !="[]"){

              
              this.router.navigate(['/home']);
            }
            
          });
          
        
          

}
}}