import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {
  Climber,
  ClimberRequest,
  ClimberUpdateRequest,
  Event,
  EventDetails,
  EventRequest,
  EventUpdateRequest, Gender,
  Leaderboards
} from "../model/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  public listAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.api}/events`);
  }

  public createEvent(event: EventRequest): Observable<Event> {
    return this.http.post<Event>(`${environment.api}/events`, event);
  }

  public getEventDetails(eventId: string): Observable<EventDetails> {
    return this.http.get<EventDetails>(`${environment.api}/events/${eventId}`);
  }

  public updateEvent(eventId: string, update: EventUpdateRequest): Observable<EventDetails> {
    return this.http.put<EventDetails>(`${environment.api}/events/${eventId}`, update);
  }

  public removeEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/events/${eventId}`);
  }

  public generateLeaderboards(eventId: string): Observable<Leaderboards> {
    return this.http.get<Leaderboards>(`${environment.api}/events/${eventId}/leaderboards`);
  }

  public registerClimber(eventId: string, climber: ClimberRequest): Observable<Climber> {
    return this.http.post<Climber>(`${environment.api}/events/${eventId}/climbers`, climber);
  }

  public updateClimber(eventId: string, climberId: string, update: ClimberUpdateRequest): Observable<Climber> {
    return this.http.put<Climber>(`${environment.api}/events/${eventId}/climbers/${climberId}`, update);
  }

  public updateClimberPaymentStatus(eventId: string, climberId: string, paid: boolean): Observable<Climber> {
    return this.http.put<Climber>(`${environment.api}/events/${eventId}/climbers/${climberId}/information`, { paid });
  }

  public updateClimberGender(eventId: string, climberId: string, gender: Gender): Observable<Climber> {
    return this.http.put<Climber>(`${environment.api}/events/${eventId}/climbers/${climberId}/information`, { gender });
  }

  public removeClimber(eventId: string, climberId: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/events/${eventId}/climbers/${climberId}`);
  }

}
