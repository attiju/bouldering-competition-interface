import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {Climber, EventDetails} from "../../model/api";
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-climbers-page',
  templateUrl: './climbers-page.component.html',
  styleUrls: ['./climbers-page.component.scss']
})
export class ClimbersPageComponent implements OnInit, OnDestroy {

  public event?: EventDetails;
  public climbers?: Climber[];
  public eventColor?: string;
  public eventPolling?: Subscription;
  public climbersGroupedByLastNameFirstLetter: { [key: string]: Climber[] } = {};
  public letters: string[] = [];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['eventId'];

    // this.eventPolling = timer(0, 5000).subscribe(() => {
    //
    // });

    this.api.getEventDetails(eventId)
      .subscribe(event => {
        this.event = event;
        this.climbers = this.event.climbers
          .sort((a: Climber, b: Climber) => {
            const result = a.lastname.localeCompare(b.lastname);
            return result !== 0 ? result : a.firstname.localeCompare(b.firstname);
          });

        if (this.climbers) {
          const letterClimbers= 'abcdefghijklmnopqrstuvwxyz'.split('')
            .map(letter => [letter, this.climbers!.filter(climber => climber.lastname.toLowerCase().startsWith(letter))])
            .filter(([letter, climbers]) => climbers.length > 0);

          this.climbersGroupedByLastNameFirstLetter = Object.fromEntries(letterClimbers);
        }

        this.letters = Object.keys(this.climbersGroupedByLastNameFirstLetter).sort();
        this.eventColor = this.event.color;
      }, error => {
        this.router.navigate(['/events']);
      });
  }

  ngOnDestroy(): void {
    this.eventPolling?.unsubscribe();
  }

  onClimberClick(climber: Climber): void {
    this.router.navigate(['/events', climber.eventId, 'climbers', climber.id]);
  }

  numberOfTop(climber: Climber): number {
    return climber.boulders.filter(boulder => boulder.validateTop).length;
  }

  numberOfZone(climber: Climber): number {
    return climber.boulders.filter(boulder => boulder.validateZone).length;
  }
}
