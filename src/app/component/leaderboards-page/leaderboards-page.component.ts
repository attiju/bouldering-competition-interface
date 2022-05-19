import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Climber, EventDetails, Leaderboards} from "../../model/api";
import {Subscription, timer} from "rxjs";
import {Location} from "@angular/common";

@Component({
  selector: 'app-leaderboards-page',
  templateUrl: './leaderboards-page.component.html',
  styleUrls: ['./leaderboards-page.component.scss']
})
export class LeaderboardsPageComponent implements OnInit, OnDestroy {

  public event?: EventDetails;
  public eventColor?: string;
  public leaderboard?: Leaderboards;
  public eventPolling?: Subscription;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['eventId'];

    this.api.getEventDetails(eventId).subscribe(event => {
        this.event = event;
        this.eventColor = this.event.color;
      }, error => {
        this.router.navigate(['/events']);
      });

    this.eventPolling = timer(0, 5000).subscribe(() => {
      this.api.generateLeaderboards(eventId)
        .subscribe(leaderboard => this.leaderboard = leaderboard)
    });
  }

  ngOnDestroy(): void {
    this.eventPolling?.unsubscribe();
  }

}
