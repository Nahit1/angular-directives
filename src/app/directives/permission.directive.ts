import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[permission]',
})
export class PermissionDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService
  ) {}

  @Input() set permission(elementName: string) {
    const role = localStorage.getItem('role');

    if (!role) return;

    this.authService.userAccessRights().subscribe((res) => {
      const objectList = res.filter((x) => x.role === role);
      console.log('objectList', objectList);
      const hasUserAccess = objectList.find((x) => x.element === elementName);
      console.log('hasUserAccess', hasUserAccess);
      if (hasUserAccess) {
        this.viewContainerRef.createEmbeddedView(this.templateRef, { role });
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
