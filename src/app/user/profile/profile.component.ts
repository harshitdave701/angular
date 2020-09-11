import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from './profile';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile = new Profile();
  profileData: any;

  constructor(
    private profileservice: ProfileService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProfile();
  }

  getAllProfile() {
    this.profileservice.findAllProfile().subscribe((profiles: any) => {
      this.profileData = profiles;
    });
  }

  deleteProfile(id) {
    this.profileservice.deleteProfile(id).subscribe((res: any) => {
      this.getAllProfile();
      this.toastr.success('Category deleted successfully');
    });
  }

  logout() {
    localStorage.removeItem('userdata');
    this.router.navigate(['']);
  }
}
