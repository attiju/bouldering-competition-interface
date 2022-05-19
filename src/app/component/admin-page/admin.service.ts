import {Injectable} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {EventDetails} from "../../model/api";
import {BehaviorSubject} from "rxjs";

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
