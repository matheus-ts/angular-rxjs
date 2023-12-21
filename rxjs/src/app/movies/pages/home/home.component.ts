import { Component, OnInit } from '@angular/core';
import { Movie, MovieResult } from '../../helpers/model/movies.model';
import { MovieService } from '../../services/movie.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, debounceTime, map, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tableMovies: MovieResult[] = []

  movieForm!: FormGroup

  movieQuery: string = ''

  isLoading: boolean = false
  movieChange = new Subject<string>();
  subscription!: Subscription;

  // o constructor ele é inicializado primeiro que o onInit a partir do momento que ele é instanciado por outra classe
  // é mais utilizado para quando se quer setar variáveis antes da execução do componente 
  constructor(private movieService: MovieService) { }

  // já o onInit é utilizado quando precisa fazer uma requisição, ele é acionado quando o ciclo de vida do componente é de 
  // fato inicializado ou seja quando o componente aparecer em tela, for visualizado de fato que vai executar as funções 
  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.movieForm = new FormGroup({
      without_keywords: new FormControl('', Validators.required)
    })
  }

  typeEvent(event: any){
    this.movieChange.next(event?.target.value)
    this.filterMovies()
  }

  filterMovies(){
    this.subscription = this.movieChange.pipe(debounceTime(1000)).subscribe((movie: string) => {
      this.movieService.filterPopular(movie).pipe(tap(() => this.isLoading = true)).subscribe(
        (response) => this.tableMovies = response,
        (error) => console.log(error),
        () => {this.setPoster(), this.isLoading = false, this.subscription.unsubscribe()}
      )
    })
    
  }

  setPoster(){
    this.tableMovies.map((movie) => movie.poster_path = `https://image.tmdb.org/t/p/original/${movie.poster_path}`)
  }

  get queryMovie(): string{
    return this.movieForm.get('without_keywords')?.value ?? ''
  }
}
