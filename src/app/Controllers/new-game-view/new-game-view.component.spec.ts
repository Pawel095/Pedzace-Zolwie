import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NewGameViewComponent } from "./new-game-view.component";


describe("NewGameViewComponent", () => {
    let component: NewGameViewComponent;
    let fixture: ComponentFixture<NewGameViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewGameViewComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewGameViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
