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
  encapsulation: ViewEncapsulation.None // to allow global styles from style.css
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];

  showAddForm = false;
  newTeamName = '';
  newTeamCity = '';

  showDeleteForm = false;
  selectedDeleteTeamId: number | null = null;  // Store selected team's id

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamsService.getTeams().subscribe({
      next: (data) => this.teams = data,
      error: (err) => console.error('Failed to fetch teams', err)
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (this.showAddForm) {
      this.showDeleteForm = false;
      this.newTeamName = '';
      this.newTeamCity = '';
    }
  }

  addTeam(): void {
    if (!this.newTeamName.trim() || !this.newTeamCity.trim()) {
      alert('Please enter both name and city.');
      return;
    }

    const newTeam: Team = {
      name: this.newTeamName.trim(),
      city: this.newTeamCity.trim(),
    };

    this.teamsService.addTeam(newTeam).subscribe({
      next: () => {
        this.loadTeams();
        this.toggleAddForm();
      },
      error: (err) => console.error('Failed to add team', err)
    });
  }

  toggleDeleteForm(): void {
    this.showDeleteForm = !this.showDeleteForm;
    if (this.showDeleteForm) {
      this.showAddForm = false;
      this.selectedDeleteTeamId = null;
    }
  }

  deleteTeamById(): void {
    if (this.selectedDeleteTeamId === null) {
      alert('Please select a team to delete.');
      return;
    }

    this.teamsService.deleteTeamById(this.selectedDeleteTeamId).subscribe({
      next: () => {
        // Remove deleted team from the teams array
        this.teams = this.teams.filter(team => team.teamId !== this.selectedDeleteTeamId);
        this.selectedDeleteTeamId = null;
        this.showDeleteForm = false;
      },
      error: (err) => {
        console.error('Failed to delete team', err);
        alert('Failed to delete team.');
      }
    });
  }
}
