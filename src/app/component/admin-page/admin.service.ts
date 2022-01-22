import {Injectable} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {Event, EventDetails} from "../../model/api";
import {BehaviorSubject, Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public event: BehaviorSubject<EventDetails | undefined> = new BehaviorSubject<EventDetails | undefined>(undefined);

  constructor(
    private api: ApiService
  ) {

  }

  public loadEvent(eventId: string): void {
    this.api.getEventDetails(eventId).subscribe(event => this.event.next(event));
  }

}
