import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsService, Team } from '../services/teams';  // adjust path if needed
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './teams.html',
  encapsulation: ViewEncapsulation.None  // enable global styles
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];

  newTeamName: string = '';
  newTeamCity: string = '';
  showAddForm: boolean = false;

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamsService.getTeams().subscribe({
      next: (data: Team[]) => {
        this.teams = data;
      },
      error: (err: any) => {
        console.error('Failed to fetch teams', err);
      }
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  addTeam(): void {
    if (!this.newTeamName.trim() || !this.newTeamCity.trim()) {
      alert('Please enter both name and city.');
      return;
    }
    const newTeam: Team = {
      name: this.newTeamName.trim(),
      city: this.newTeamCity.trim()
      // Add other properties if needed
    };

    this.teamsService.addTeam(newTeam).subscribe({
      next: () => {
        this.loadTeams();
        this.newTeamName = '';
        this.newTeamCity = '';
        this.showAddForm = false;
      },
      error: (err: any) => {
        console.error('Failed to add team', err);
      }
    });
  }

  deleteTeam(): void {
    console.log('Delete Team clicked');
  }
}
