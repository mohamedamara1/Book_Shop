import { Component, HostListener, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  disabledSubmitButton: boolean = true;
  optionsSelect: Array<any>;

  @HostListener('input') oninput() {

    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
      }
    }


  constructor(private fb: FormBuilder, private connectionService: ConnectionService) {

  this.contactForm = fb.group({
    'contactFormName': ['', [Validators.required,]],
    'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
    'contactFormSubjects': ['', Validators.required],
    'contactFormMessage': ['', [Validators.required,Validators.minLength(10)]],
    'contactFormCopy': ['true'],
    });

  }

  onSubmit() {
    console.log(this.contactForm.value);

    this.connectionService.sendMessage(this.contactForm.value).subscribe(() => {
      alert('Your message has been sent.');
      this.contactForm.reset({ "contactFormCopy":"true"});
      this.disabledSubmitButton = true;
    }, error => {
      console.log('Error', error);
    });
  }

  ngOnInit(): void {
    console.log("loaded contact page")
  }

}
