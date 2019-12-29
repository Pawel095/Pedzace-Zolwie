import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameStateService } from '../Servces/game-state.service';

@Injectable({
    providedIn: 'root',
})
export class RefrechCheckGuard implements CanActivate {
    constructor(private gss: GameStateService) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (environment.production) {
            if (this.gss.wasSetupRun) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
}
