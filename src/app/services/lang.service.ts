import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  
  private environmentUrl = 'assets/lang.json'; // Path to your JSON file
  
  constructor(private http: HttpClient) { }
  
  getEnvironment(): Observable<LangConfig> {
    return this.http.get<LangConfig>(this.environmentUrl);
  }
  
}
