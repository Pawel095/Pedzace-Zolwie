import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameService } from '../Servces/game.service';

@Injectable({
    providedIn: 'root',
})
export class RefrechCheckGuard implements CanActivate {
    constructor(private gs: GameService) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (environment.production) {
            if (this.gs.wasSetupRun) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
}
