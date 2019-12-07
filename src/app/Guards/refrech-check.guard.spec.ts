import { inject, TestBed } from '@angular/core/testing';
import { RefrechCheckGuard } from './refrech-check.guard';

describe('RefrechCheckGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RefrechCheckGuard],
        });
    });

    it('should ...', inject([RefrechCheckGuard], (guard: RefrechCheckGuard) => {
        expect(guard).toBeTruthy();
    }));
});
