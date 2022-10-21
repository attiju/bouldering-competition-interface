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
  public climbersGroupByFirstLetter?: { [key: string]: Climber[] };

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

        this.climbersGroupByFirstLetter = this.groupClimbers(this.event.climbers.sort(sort));
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
    this.url = `${window.location.origin}/events/${climber.eventId}/climbers/${climber.id}`;
  }

  private groupClimbers(climbers: Climber[]): { [key: string]: Climber[] } {
    const obj: any = {};
    climbers.forEach(e => obj[e.lastname[0].toLowerCase()] = climbers.filter(ele => ele.lastname[0].toLowerCase() === e.lastname[0].toLowerCase()));
    return obj;
  }
}
