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
  
  latitude: number | undefined;
  longitude: number | undefined;

  ngOnInit(): void {
    this.UserServiceTsService.checkLenguaje();
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
        }
      );
    } else {
      console.error('La geolocalización no está disponible en este navegador.');
    }
  }

}


