import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Team {
  teamId?: number; // optional id if you have one
  name: string;
  city: string;
  // add other fields if any
}

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private apiUrl = 'https://localhost:7206/api/teams';  // your backend API URL

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }

  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team);
  }

  deleteTeamById(teamid: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${teamid}`);
}

}
