import { Component, OnInit } from '@angular/core';
import {EventDetails, Leaderboard} from "../../model/api";

import {AdminService} from "./admin.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  public event?: EventDetails;
  public sidebarOpen: boolean = false;

  constructor(
    private service: AdminService,
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['eventId'];
    this.service.loadEvent(eventId);
    this.service.event.subscribe(event => this.event = event);
  }

  public downloadLeaderboards(): void {
    if (this.event) {
      this.api.generateLeaderboards(this.event.id)
        .subscribe(leaderboards => {
          this.downloadFile(leaderboards.maleLeaderboard, 'hommes.csv');
          this.downloadFile(leaderboards.femaleLeaderboard, 'femmes.csv');
        });
    }
  }

  private downloadFile(leaderboard: Leaderboard, name: string): void {
    const headers = 'classement;prénom;nom;score;';
    const content = leaderboard.climbers
      .map((user, index) => `${index + 1};${user.firstname};${user.lastname};${Math.round(user.score)};`)
      .join('\n');

    saveAs(new Blob(['\uFEFF' + headers + '\n' + content], { type: 'text/csv;charset=utf-8'}), name);
  }
}
