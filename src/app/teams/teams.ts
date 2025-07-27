import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsService, Team } from '../services/teams';  // adjust path if needed
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './teams.html',
  encapsulation: ViewEncapsulation.None  // enable global styles
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.teamsService.getTeams().subscribe({
      next: (data: Team[]) => {
        this.teams = data;
      },
      error: (err: any) => {
        console.error('Failed to fetch teams', err);
      }
    });
  }

  addTeam(): void {
    console.log('Add Team clicked');
  }

  deleteTeam(): void {
    console.log('Delete Team clicked');
  }
}
