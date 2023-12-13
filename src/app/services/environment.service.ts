import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  
  private environmentUrl = 'assets/environment.json'; // Path to your JSON file

  constructor(private http: HttpClient) { }

  getEnvironment(): Observable<any> {
    return this.http.get(this.environmentUrl);
  }
}
