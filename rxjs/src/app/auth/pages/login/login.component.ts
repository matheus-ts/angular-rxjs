import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { debounceTime, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private readonly ACCESS_TOKEN = 'token';
  firstAccess!: boolean 

  constructor(public authService: AuthService, private router: Router) { 
    this.firstAccess = this.authService.isFirstAccess() 
  }

  ngOnInit(): void {
    if(this.authService.isFirstAccess()){
      alert('Bem-vindo à nossa aplicação!');
    }
  }

  login(){
    this.authService.authenticate()
    .pipe(debounceTime(10000))
    .subscribe(
      (response) => localStorage.setItem(this.ACCESS_TOKEN, environment.apiKey),
      (error) => console.log(error),
      () => this.router.navigateByUrl('home')
    )
  }
}
