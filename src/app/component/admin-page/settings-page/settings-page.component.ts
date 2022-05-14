import {Component, OnInit} from '@angular/core';
import {AdminService} from "../admin.service";
import {ApiService} from "../../../service/api.service";
import {EventDetails} from "../../../model/api";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  public changeDetected: boolean = false;

  public event?: EventDetails;

  constructor(
    private service: AdminService,
    private api: ApiService,
  ) {

  }

  ngOnInit(): void {
    this.changeDetected = false;
    this.service.event.subscribe(event => this.event = event);
  }

  public switchEventStatus(): void {
    if (this.event) {
      this.api.updateEvent(this.event.id, {active: !this.event.active}).subscribe(() => this.service.loadEvent(this.event!.id));
    }
  }

  public addBoulder(): void {
    const boulders = this.event!.options.boulders;
    boulders.push({label: 'B' + (boulders.length + 1), hasZone: false});
    this.changeDetected = true;
  }

  public removeBoulder(): void {
    const boulders = this.event!.options.boulders;
    boulders.splice(boulders.length - 1, 1);
    this.changeDetected = true;
  }

  public saveChanges(): void {
    this.api.updateEvent(this.event!.id, {boulders: this.event!.options.boulders}).subscribe(event => {
      this.event = event;
      this.changeDetected = false;
    });
  }
}
