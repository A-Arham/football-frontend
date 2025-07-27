import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Team {
  name: string;
  city: string;
  // add other fields if any
}

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private apiUrl = 'https://localhost:7206/api/teams';  // <-- your backend API URL here

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }
  addTeam(team: Team): Observable<Team> {
  return this.http.post<Team>(this.apiUrl, team);
}

}
