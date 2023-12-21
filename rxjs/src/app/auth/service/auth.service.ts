import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, debounceTime, tap } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly FIRST_ACCESS_KEY = 'firstAccess';

  constructor(private http: HttpClient) { }

  isFirstAccess(): boolean {
    const isFirstAccess = localStorage.getItem(this.FIRST_ACCESS_KEY) === null;
    if (isFirstAccess) {
      localStorage.setItem(this.FIRST_ACCESS_KEY, 'false');
    }
    return isFirstAccess;
  }

  authenticate(): Observable<any>{
    return this.http.get(endpoints.authenticate).pipe(tap(console.log), debounceTime(10000), tap(console.log))
  }
}
