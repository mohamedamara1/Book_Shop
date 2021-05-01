import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css'],
})
export class PaymentInfoComponent implements OnInit {
  payementInfo = this.fb.group({
    cardName: [''],
    cardNumber: [null],
    expirymonth: [null],
    expiryYear: [null],
    cvv: [null],
  });
  cardNameValidation = false;
  cardNumberValidation = false;
  expiryMonthValidation = false;
  expiryYearValidation = false;
  cvvValidation = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  saveSettings() {
    if (!this.payementInfo.controls['cardName'].value) {
      this.cardNameValidation = true;
    }
    if (!this.payementInfo.controls['cardNumber'].value) {
      this.cardNumberValidation = true;
    }
    if (!this.payementInfo.controls['expiryMonth'].value) {
      this.expiryMonthValidation = true;
    }
    if (!this.payementInfo.controls['expiryYear'].value) {
      this.expiryYearValidation = true;
    }
    if (!this.payementInfo.controls['cvv'].value) {
      this.cvvValidation = true;
    }

    console.log('working..', this.payementInfo.value);
  }
}
