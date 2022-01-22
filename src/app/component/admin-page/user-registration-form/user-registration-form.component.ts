import { Component, OnInit } from '@angular/core';
import {AdminService} from "../admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Gender} from "../../../model/api";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../service/api.service";

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  public form?: FormGroup;

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: [ '', Validators.required ],
      lastname: [ '', Validators.required ],
      gender: [ Gender.MALE, Validators.required ]
    });
  }

  onFormSubmit(): void {
    if (this.form && this.form.valid) {
      const climber = this.form.value;
      const eventId = this.route.snapshot.params['eventId'];

      this.api.registerClimber(eventId, climber).subscribe(added => {
        this.service.loadEvent(eventId);
      });

      this.form = this.fb.group({
        firstname: [ '', Validators.required ],
        lastname: [ '', Validators.required ],
        gender: [ Gender.MALE, Validators.required ]
      });
    }
  }
}
