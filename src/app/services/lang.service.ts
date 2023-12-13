import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EnvironmentConfig {
  title: { [key: string]: string };
  tagline: { [key: string]: string };
  taglineDescription: { [key: string]: string };
  portfolio: { [key: string]: string };
  blog: { [key: string]: string };
  services: { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})
export class LangService {
  
  private environmentUrl = 'assets/lang.json'; // Path to your JSON file
  
  constructor(private http: HttpClient) { }
  
  getEnvironment(): Observable<any> {
    return this.http.get(this.environmentUrl);
  }
  
}
