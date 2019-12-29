import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerBarItemComponent } from './player-bar-item.component';

describe('PlayerBarItemComponent', () => {
    let component: PlayerBarItemComponent;
    let fixture: ComponentFixture<PlayerBarItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlayerBarItemComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayerBarItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
