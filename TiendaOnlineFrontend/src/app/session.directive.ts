import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserServiceTsService } from './services/user.service.ts.service'; // Suponiendo que tienes un servicio de autenticación

@Directive({
  selector: '[appSession]'
})
export class SessionDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: UserServiceTsService
  ) {}

  
  @Input() set appSession(condition: boolean) {
    //console.log(this.authService.isLoggedIn());
    if (condition === this.authService.isLoggedIn()) { // Implementa tu lógica de autenticación aquí
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

