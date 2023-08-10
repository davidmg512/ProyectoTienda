import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {


  constructor(private UserServiceTsService: UserServiceTsService,
    private router: Router) {}

  onClick(){
    this.UserServiceTsService.logout()
    .then(response =>{ console.log(response);
      this.router.navigate(['']);
})
    .catch(error => console.log(error));

  }


}
