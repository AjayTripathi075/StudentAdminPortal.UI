import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/view-models/gender.model';
import { Student } from 'src/app/models/view-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
 studentId:string | null|undefined;
 genderList:Gender[]=[];
 student:Student={
   id:'',
   firstName:'',
   lastName:'',
   dateofBirth:'',
   email:'',
   mobile:0,
   profileImageUrl:'',
   genderId:'',
   gender:{id:'',description:''},
   address:{
    id:'',
    physicalAddress:'',
    postalAddress:''
   }
 };
  constructor(private readonly studentService:StudentService,private readonly route:ActivatedRoute
    ,private genderService:GenderService,private snackbar : MatSnackBar,private router:Router) { }

  ngOnInit(): void {
   this.route.paramMap.subscribe((params)=>{
    this.studentId = params.get('id');

    if(this.studentId)
    {
      this.studentService.getStudent(this.studentId).subscribe((successResponse)=>{
        this.student = successResponse
      }),
      this.genderService.getGenderList().subscribe((successResponse)=>{
        this.genderList = successResponse;
      })
    }
   });
  }
  onUpdate()
  {
    this.studentService.updateStudent(this.student.id,this.student)
    .subscribe((successResponse)=>{
         // show notification 
         this.snackbar.open('student update sucessfully',undefined,{
           duration:2000
         });
    },
    (errorResponse)=>{
      this.snackbar.open('student update Unsucessfully',undefined,{
        duration:2000
      });
    }
    )
  }

  onDelete()
  {
    this.studentService.DeleteStudent(this.student.id)
    .subscribe((successResponse)=>{
      this.snackbar.open('student Delete sucessfully',undefined,{
        duration:2000
      });
      setTimeout(()=>{
        this.router.navigateByUrl('students');
      },2000);
     
    },
    (errorResponse)=>{
    this.snackbar.open('student Delete Unsucessfully',undefined,{
      duration:2000
    });
    }
    )
  }
}
