import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IDeactivateComponent } from '../shared/guard/IDeactivateComponent';

@Injectable()
export class DeactivateGuard implements CanDeactivate<IDeactivateComponent>
{
    component: Object;
    route: ActivatedRouteSnapshot;

   constructor(){
   }

   canDeactivate(component:IDeactivateComponent,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot,
                nextState: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {

        return component.canExit ? component.canExit() : true;

  }

}
