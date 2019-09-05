import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService:AuthentificationService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onLogin(dataform : any){
    this.authService.login(dataform.username, dataform.password);
    if (this.authService.isAuthentificated) {
      this.authService.saveAuthentificatedUser();
      this.router.navigateByUrl('');
    }
  }

}
