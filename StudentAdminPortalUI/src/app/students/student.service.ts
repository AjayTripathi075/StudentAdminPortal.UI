import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddStudentRequest } from '../models/api-models/add-student.request.model';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/UpdateStudentRequest.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl =environment.baseUrl;

  constructor(private httpClient:HttpClient) { }


  getStudents():Observable<Student[]>
  {
    return this.httpClient.get<Student[]>(this.baseUrl + '/Student');
  }

  getStudent(studentId:string):Observable<Student>
  {
    return this.httpClient.get<Student>(this.baseUrl+'/Student/'+ studentId)
  }

  updateStudent(studentId:string,studentRequest:Student):Observable<Student>
  { 
    const updateStudentRequest : UpdateStudentRequest ={
    firstName : studentRequest.firstName,
    lastName : studentRequest.lastName,
    dateofBirth:studentRequest.dateofBirth,
    email:studentRequest.email,
    mobile:studentRequest.mobile,
    genderId:studentRequest.genderId,
    physicalAddress:studentRequest.address.physicalAddress,
    postalAddress:studentRequest.address.postalAddress
    };

    return this.httpClient.put<Student>(this.baseUrl+'/Student/'+ studentId,updateStudentRequest);
  }

  DeleteStudent(studentId:string):Observable<Student>
  {
   return this.httpClient.delete<Student>(this.baseUrl+'/Student/'+ studentId);
  }
 
AddStudent(studentRequest:Student):Observable<Student>
{
  const addStudentRequest : AddStudentRequest ={
    firstName : studentRequest.firstName,
    lastName : studentRequest.lastName,
    dateofBirth:studentRequest.dateofBirth,
    email:studentRequest.email,
    mobile:studentRequest.mobile,
    genderId:studentRequest.genderId,
    physicalAddress:studentRequest.address.physicalAddress,
    postalAddress:studentRequest.address.postalAddress
    };
    return this.httpClient.post<Student>(this.baseUrl+'/Student/Add',addStudentRequest);
}

uploadImage(studentId:string,file:File):Observable<any>
{
const formData = new FormData();
formData.append("profileImage",file);
 return this.httpClient.post(this.baseUrl+'/Student/'+ studentId +'/upload-image',formData,{
  responseType:'text'
});
}

getImagePath(relativePath:string)
{
 return `${this.baseUrl}/${relativePath}`;
}
 
}
