import { Component, OnInit } from '@angular/core';
import {Climber, EventDetails, Gender} from "../../model/api";
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
  public eventLabels?: string[];
  public eventBoulders?: number;
  public eventActive?: boolean;
  public boulders?: number[];
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

    this.polling = timer(0, 1000)
      .subscribe(() => {
      this.api.getEventDetails(eventId)
        .subscribe(event => {
          this.eventName = event.name;
          this.eventColor = event.options.metadata['color'];
          this.eventLabels = event.options.metadata['boulderLabels'];
          this.eventBoulders = event.options.boulders;
          this.eventActive = event.active;
          this.climber = event.climbers.find(c => c.id === climberId);
          this.boulders = [...Array(this.eventBoulders).keys()];

          if (!this.climber) {
            this.router.navigate(['/events', eventId, 'climbers']);
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.polling?.unsubscribe();
  }

  onBoulderClick(index: number): void {

    if (this.climber && this.eventActive) {
      let toUpdate = this.climber.boulders;
      if (this.isBoulderValidated(index)) {
        toUpdate = toUpdate.filter(boulder => boulder !== index);
      } else {
        toUpdate.push(index);
      }

      this.api.updateClimber(this.climber.eventId, this.climber.id, { boulders: toUpdate }).subscribe(climber => {
        this.climber = climber;
      });
    }
  }

  isBoulderValidated(index: number) {
    return this.climber!.boulders.includes(index);
  }

  adjust(color: string, amount:number) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  pickTextColorBasedOnBgColorSimple(bgColor: string): string {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16);
    var g = parseInt(color.substring(2, 4), 16);
    var b = parseInt(color.substring(4, 6), 16);
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? 'black' : 'white';
  }

  getBoulderLabel(index: number): string {
    if (this.eventLabels) {
      if (index <= this.eventLabels.length) {
        return this.eventLabels[index];
      }
    }

    return (index + 1).toString();
  }
}
