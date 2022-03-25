import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl ="https://localhost:44381"

  constructor(private httpClient:HttpClient) { }


  getStudents():Observable<Student[]>
  {
    return this.httpClient.get<Student[]>(this.baseUrl + '/Student');
  }
}