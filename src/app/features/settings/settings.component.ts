import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../shared/services/storage.service';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { UserDto } from '../../shared/models/response-models/user.response-model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule, MatDialogModule]
})
export class SettingsComponent implements OnInit {
  private _storageService = inject(StorageService);
  private _authService = inject(AuthService);
  private _userService = inject(UserService);
  private _fb= inject(FormBuilder);

  dialog = inject(MatDialog);
  user! : UserDto;
  profileForm!: FormGroup;
  preferenceForm!: FormGroup;
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;

  ngOnInit(): void {
    this.profileForm = this._fb.group({
      firstName: [''],
      lastName: [''],
      email: [{ value: '', disabled: true }],
      mobile: ['']
    });

    this.preferenceForm = this._fb.group({
      repetitionGap: [2, Validators.required],
      emailReminder: [true],
      dailySummary: [false]
    });

    this.loadUserSettings();
  }

  loadUserSettings(): void {
    // Simulated user data
    this.user = this._storageService.getUser()!;
    const preferences =  {
      repetitionGap: 5,
      emailReminder: false,
      dailySummary: false
    }
    this.profileForm.patchValue(this.user);
    this.preferenceForm.patchValue(preferences);
  }

  onSaveProfile(): void {
    if (this.profileForm.valid) {
      const data = this.profileForm.getRawValue();
      console.log('Saving profile:', data);
      this._userService.updateUser(data).subscribe();
    }
  }

  onSavePreferences(): void {
    if (this.preferenceForm.valid) {
      console.log('Saving preferences:', this.preferenceForm.value);
      // Call API to save
    }
  }

  logout(): void {
    this._authService.logout();
  }

  confirmDeleteAccount(): void {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._userService.deleteUser(this.user.id).subscribe({
          next: () => {
            this._userService.deleteUser(this.user.id).subscribe(() => {
                this._authService.logout();
              });
          },
          error: (err) => {
            console.error('Delete failed:', err);
          }
        });
      }
    });
  }
}
