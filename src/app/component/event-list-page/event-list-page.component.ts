import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {Event} from "../../model/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-list-page',
  templateUrl: './event-list-page.component.html',
  styleUrls: ['./event-list-page.component.scss']
})
export class EventListPageComponent implements OnInit {

  public events?: Event[];

  constructor(
    private api: ApiService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.api.listAllEvents()
      .subscribe(events => {
        this.events = events;
      });
  }

  public onEventClick(eventId: string, mouseEvent: MouseEvent): void {
    if (mouseEvent.ctrlKey && mouseEvent.shiftKey) {
      this.router.navigate(['/events', eventId, 'admin']);
    } else {
      this.router.navigate(['/events', eventId, 'climbers']);
    }
  }
}
