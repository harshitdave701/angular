import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  id: any;
  profile = new Profile();
  genderList = ['male', 'female'];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private profileservice: ProfileService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.profileservice.getProfileById(this.id).subscribe((res: any) => {
        this.profile = res;
        this.MySkill = this.profile.skills;
        this.MySkill.forEach(element => {
          this.AllSkillsList.splice(this.AllSkillsList.indexOf(element), 1); 
        });
      });
    }
  }

  // Transfer Items Between Lists
  AllSkillsList = [
    'PHP',
    'JS',
    'Angular',
    'NodeJS',
    'Python',
    'React',
    'Java',
    'C++'
  ];

  MySkill = [];

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  removeSkill(skill){
    this.MySkill.splice(this.MySkill.indexOf(skill), 1);
    this.AllSkillsList.push(skill);
  }

  OnSubmit() {
    this.profile.skills = this.MySkill;
    if (this.id) {
      this.profileservice
        .updateProfile(this.id, this.profile)
        .subscribe((res) => {
          this.router.navigate(['profile']);
          this.toastr.success('Profile updated successfully');
        });
    } else {
      this.profileservice.addProfile(this.profile).subscribe((res) => {
        this.router.navigate(['profile']);
        this.toastr.success('Profile created successfully');
      });
    }
  }
}
