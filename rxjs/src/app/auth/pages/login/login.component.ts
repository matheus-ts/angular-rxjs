import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { debounceTime, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      (response) => localStorage.setItem('token', response?.request_token),
      (error) => console.log(error),
      () => this.router.navigateByUrl('home')
    )
  }
}
