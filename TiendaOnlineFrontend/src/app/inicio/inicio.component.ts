import { Component } from '@angular/core';
import { UserServiceTsService } from '../services/user.service.ts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  constructor(private UserServiceTsService: UserServiceTsService,public translate: TranslateService) {}

  ngOnInit(): void {
    this.UserServiceTsService.checkLenguaje();
    }

}


