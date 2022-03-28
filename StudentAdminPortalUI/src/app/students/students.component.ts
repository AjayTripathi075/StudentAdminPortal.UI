import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/view-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  Students :Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateofBirth', 'email','mobile','gender','edit'];
  dataSource:MatTableDataSource<Student>=new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator !:MatPaginator;
  @ViewChild(MatSort) matSort !:MatSort;
  filterStudent='';
  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
     this.GetStudents(); 
  }
  GetStudents()
  {
      this.studentService.getStudents().subscribe((SuccessResponse)=>{
        this.Students = SuccessResponse;
        this.dataSource = new MatTableDataSource<Student>(this.Students);
        if(this.matPaginator)
        {
          this.dataSource.paginator = this.matPaginator;
        }
        if(this.matSort)
        {
          this.dataSource.sort = this.matSort;
        }
        
        
      },(error)=>{
        console.log(error)
      })
        
   }

   filterStudents()
   {
     this.dataSource.filter =this.filterStudent.trim().toLowerCase();
   }
       
 

}
