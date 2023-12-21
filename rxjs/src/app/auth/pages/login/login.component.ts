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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
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
