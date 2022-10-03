import {Component, OnInit} from '@angular/core';
import {AdminService} from "../admin.service";
import {Climber, EventDetails, Gender} from "../../../model/api";
import {ApiService} from "../../../service/api.service";

@Component({
  selector: 'app-climber-list-page',
  templateUrl: './climber-list-page.component.html',
  styleUrls: ['./climber-list-page.component.scss']
})
export class ClimberListPageComponent implements OnInit {

  public event?: EventDetails;
  public eventMaleClimbers?: Climber[];
  public eventFemaleClimbers?: Climber[];

  constructor(
    private service: AdminService,
    private api: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.service.event.subscribe(event => {
      this.event = event;

      if (this.event) {
        const sort = (a: Climber, b: Climber) => {
          const result = a.lastname.localeCompare(b.lastname);
          return result !== 0 ? result : a.firstname.localeCompare(b.firstname);
        };

        this.eventMaleClimbers = this.event.climbers.filter(climber => climber.gender === Gender.MALE).sort(sort);
        this.eventFemaleClimbers = this.event.climbers.filter(climber => climber.gender === Gender.FEMALE).sort(sort);
      }
    });
  }

  public removeClimber(climber: Climber): void {
    this.api.removeClimber(climber.eventId, climber.id).subscribe(() => {
      this.service.loadEvent(climber.eventId);
    });
  }

  public open = false;
  public url: string = '';

  public onQrCode(climber: Climber): void {
    this.open = true;
    this.url = `${window.location.origin}/events/${this.event!.id}/climbers/${climber.id}`;
  }
}
