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
  encapsulation: ViewEncapsulation.None
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];

  // Add form
  showAddForm = false;
  newTeamName = '';
  newTeamCity = '';

  // Delete form
  showDeleteForm = false;
  selectedDeleteTeamId: number | null = null;

  // Edit form
  showEditForm = false;
  selectedEditTeamId: number | null = null;
  editTeamName = '';
  editTeamCity = '';

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

  // ---------------- ADD ----------------
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (this.showAddForm) {
      this.showDeleteForm = false;
      this.showEditForm = false;
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
      city: this.newTeamCity.trim()
    };

    this.teamsService.addTeam(newTeam).subscribe({
      next: () => {
        this.loadTeams();
        this.toggleAddForm();
      },
      error: (err) => console.error('Failed to add team', err)
    });
  }

  // ---------------- DELETE ----------------
  toggleDeleteForm(): void {
    this.showDeleteForm = !this.showDeleteForm;
    if (this.showDeleteForm) {
      this.showAddForm = false;
      this.showEditForm = false;
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

  // ---------------- EDIT ----------------
  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
    if (this.showEditForm) {
      this.showAddForm = false;
      this.showDeleteForm = false;
      this.selectedEditTeamId = null;
      this.editTeamName = '';
      this.editTeamCity = '';
    }
  }

  onTeamSelectedForEdit(): void {
    const selectedTeam = this.teams.find(team => team.teamId === this.selectedEditTeamId);
    if (selectedTeam) {
      this.editTeamName = selectedTeam.name;
      this.editTeamCity = selectedTeam.city;
    }
  }

  updateTeam(): void {
    if (this.selectedEditTeamId === null) {
      alert('Please select a team to edit.');
      return;
    }

    if (!this.editTeamName.trim() || !this.editTeamCity.trim()) {
      alert('Please enter both name and city.');
      return;
    }

    const updatedTeam: Team = {
      teamId: this.selectedEditTeamId,
      name: this.editTeamName.trim(),
      city: this.editTeamCity.trim()
    };

    this.teamsService.updateTeam(updatedTeam).subscribe({
      next: () => {
        this.loadTeams();
        this.toggleEditForm();
      },
      error: (err) => {
        console.error('Failed to update team', err);
        alert('Failed to update team.');
      }
    });
  }
}
