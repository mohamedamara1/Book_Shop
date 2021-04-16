import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  adminLoginForm = this.fb.group({
  
    email: [""],
    password: [""],
    stayConnected: [false],
   
  });


  constructor(
    private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
  }
  adminLogin(){

    console.log(this.adminLoginForm.value);
    }
}
