import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, debounceTime, map, tap } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { Movie, MovieResult } from '../helpers/model/movies.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  filterPopular(queryParam: string): Observable<MovieResult[]>{
    const query = {
      query: queryParam
    }
    return this.http.get<Movie>(`${endpoints.movies}`, {params: query}).pipe(debounceTime(5000),tap(console.log),map((movie) => movie.results))
  }
}
