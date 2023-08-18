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

  stringToken: string | null = '';

  ngOnInit(): void {
    this.UserServiceTsService.checkLenguaje();
    }

}


