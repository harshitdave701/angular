import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AddComponent } from './profile/add/add.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent, AddComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule
  ]
})
export class UserModule { }
