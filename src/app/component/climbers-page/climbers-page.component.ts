import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {Climber, EventDetails, Gender} from "../../model/api";
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-climbers-page',
  templateUrl: './climbers-page.component.html',
  styleUrls: ['./climbers-page.component.scss']
})
export class ClimbersPageComponent implements OnInit, OnDestroy {

  public event?: EventDetails;
  public females?: Climber[];
  public males?: Climber[];
  public eventColor?: string;
  public eventPolling?: Subscription;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['eventId'];

    this.eventPolling = timer(0, 5000).subscribe(() => {
      this.api.getEventDetails(eventId)
        .subscribe(event => {
          this.event = event;

          const sort = (a: Climber, b: Climber) => {
            const result = a.lastname.localeCompare(b.lastname);
            return result !== 0 ? result : a.firstname.localeCompare(b.firstname);
          };

          this.females = this.event.climbers
            .filter(climber => climber.gender === Gender.FEMALE)
            .sort(sort);
          this.males = this.event.climbers
            .filter(climber => climber.gender === Gender.MALE)
            .sort(sort);
          this.eventColor = this.event.options.metadata['color'];
        }, error => {
          this.router.navigate(['/events']);
        });
    });
  }

  ngOnDestroy(): void {
    this.eventPolling?.unsubscribe();
  }

  onClimberClick(climber: Climber): void {
    this.router.navigate([ '/events', climber.eventId, 'climbers', climber.id ]);
  }
}
