import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  adminloginForm = this.fb.group({
    email:[""],
  password:[""],

  })


  constructor(
    private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
  }
  adminLogin(){

    console.log(this.adminloginForm.value);
    }
}
