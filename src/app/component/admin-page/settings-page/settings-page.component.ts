import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  public eventUrl = '';

  public event?: EventDetails;

  @Output()
  public shouldReloadClimbers = new EventEmitter<void>();

  constructor(
    private service: AdminService,
    private api: ApiService,
  ) {

  }

  ngOnInit(): void {
    this.changeDetected = false;
    this.service.event.subscribe(event => {
      this.event = event;
      this.eventUrl = `${window.location.origin}/events/${event!.id}/climbers`;
    });
  }

  public switchEventStatus(): void {
    if (this.event) {
      this.api.updateEvent(this.event.id, {active: !this.event.active}).subscribe(() => this.service.loadEvent(this.event!.id));
    }
  }

  public addBoulder(): void {
    const boulders = this.event!.options.boulders;
    boulders.push({label: '' + (boulders.length + 1), hasZone: false});
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

  public deleteAllClimbers(): void {
    this.api.removeClimbers(this.event!.id).subscribe(() => {
      this.service.loadEvent(this.event!.id);
    });
  }
}
