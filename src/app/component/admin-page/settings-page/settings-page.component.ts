import { Component, OnInit } from '@angular/core';
import {AdminService} from "../admin.service";
import {ApiService} from "../../../service/api.service";
import {EventDetails} from "../../../model/api";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  public event?: EventDetails;

  constructor(
    private service: AdminService,
    private api: ApiService,
  ) {

  }

  ngOnInit(): void {
    this.service.event.subscribe(event => this.event = event);
  }

  public onBouldersCountChange(evt: any): void {
    if (this.event) {
      this.api.updateEvent(this.event.id, { boulders: evt.value }).subscribe(() => this.service.loadEvent(this.event!.id));
    }
  }

  public switchEventStatus(): void {
    if (this.event) {
      this.api.updateEvent(this.event.id, { active: !this.event.active} ).subscribe(() => this.service.loadEvent(this.event!.id));
    }
  }
}
