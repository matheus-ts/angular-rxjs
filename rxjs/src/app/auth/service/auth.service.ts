import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, debounceTime, tap } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(): Observable<any>{
    return this.http.get(endpoints.authenticate).pipe(tap(console.log), debounceTime(10000), tap(console.log))
  }
}
