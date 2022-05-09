import {Component, OnInit} from '@angular/core';
import {Climber, ClimberBoulder, EventDetails, EventOptionsBoulder, Gender} from "../../model/api";
import {Subscription, timer} from "rxjs";
import {ApiService} from "../../service/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-climber-page',
  templateUrl: './climber-page.component.html',
  styleUrls: ['./climber-page.component.scss']
})
export class ClimberPageComponent implements OnInit {

  public climber?: Climber;
  public eventName?: string;
  public eventColor?: string;
  public eventBoulders?: EventOptionsBoulder[];
  public eventActive?: boolean;
  public polling?: Subscription;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['eventId'];
    const climberId = this.route.snapshot.params['climberId'];

    this.polling = timer(0, 10000)
      .subscribe(() => {
        this.api.getEventDetails(eventId)
          .subscribe(event => {
            this.eventName = event.name;
            this.eventColor = event.color;
            this.eventActive = event.active;
            this.climber = event.climbers.find(c => c.id === climberId);
            this.eventBoulders = event.options.boulders;

            if (!this.climber) {
              this.router.navigate(['/events', eventId, 'climbers']);
            }
          });
      });
  }

  ngOnDestroy(): void {
    this.polling?.unsubscribe();
  }

  onBoulderTopClick(index: number): void {
    if (this.climber && this.eventActive && this.eventBoulders) {
      this.climber.boulders[index].validateTop = !this.climber.boulders[index].validateTop;

      if (this.eventBoulders[index].hasZone && this.climber.boulders[index].validateTop) {
        this.climber.boulders[index].validateZone = true;
      }

      this.api.updateClimber(this.climber.eventId, this.climber.id, { boulders: this.climber.boulders }).subscribe(climber => {
        this.climber = climber;
      });
    }
  }

  onBoulderZoneClick(index: number): void {
    if (this.climber && this.eventActive) {
      this.climber.boulders[index].validateZone = !this.climber.boulders[index].validateZone;

      if (!this.climber.boulders[index].validateZone) {
        this.climber.boulders[index].validateTop = false;
      }

      this.api.updateClimber(this.climber.eventId, this.climber.id, { boulders: this.climber.boulders }).subscribe(climber => {
        this.climber = climber;
      });
    }
  }

  isBoulderTopValidated(index: number): boolean {
    return this.climber!.boulders[index].validateTop;
  }

  isBoulderZoneValidated(index: number): boolean {
    return this.climber!.boulders[index].validateZone;
  }

  adjust(color: string, amount: number) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  pickTextColorBasedOnBgColorSimple(bgColor: string): string {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16);
    var g = parseInt(color.substring(2, 4), 16);
    var b = parseInt(color.substring(4, 6), 16);
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? 'black' : 'white';
  }

  getBoulderLabel(index: number): string {
    if (this.eventBoulders) {
      const label = this.eventBoulders[index].label;

      if (label) {
        return label;
      }
    }

    return 'B' + (index + 1).toString();
  }
}
