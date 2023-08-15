import { Component } from '@angular/core';
import { UserServiceTsService } from '../services/user.service.ts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private UserServiceTsService: UserServiceTsService,
    private router: Router, activerouter:ActivatedRoute,public translate: TranslateService) {}

  onClick(){
    this.UserServiceTsService.logout()
    .then(response =>{ console.log(response);
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['']);
})
    .catch(error => console.log(error));

  }

  reloadPage() {
    window.location.reload();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lenguaje',lang);
  }
}
