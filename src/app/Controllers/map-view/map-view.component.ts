import { Component, OnInit, ViewChild, ElementRef, HostListener } from "@angular/core";
import { Point } from "src/app/Models/Point";
import { mapToMapExpression } from "@angular/compiler/src/render3/util";

@Component({
    selector: "app-map-view",
    templateUrl: "./map-view.component.html",
    styleUrls: ["./map-view.component.scss"]
})
export class MapViewComponent implements OnInit {
    TILE_NUMBER = 10;
    constructor() {}
    ctx: CanvasRenderingContext2D;

    @ViewChild("map", { static: true }) map: ElementRef<HTMLCanvasElement>;

    @HostListener("window:resize", ["$event"])
    onResize() {
        this.ctx = this.map.nativeElement.getContext("2d");
        this.ctx.canvas.width = window.innerWidth - 200;
        this.ctx.canvas.height = window.innerHeight - 400;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.redraw();
    }

    ngOnInit() {
        this.onResize();
    }

    redraw() {
        let points: Array<Point> = [];
        // console.log(this.ctx);
        // poziome: y sinus; x stałe
        let temp = Math.PI / 2;
        const piece = -Math.PI / 3;
        if (this.ctx.canvas.width >= this.ctx.canvas.height) {
            for (let i = 0; i < this.TILE_NUMBER; i++) {
                temp += piece;
                points.push(
                    new Point(
                        (this.ctx.canvas.width / this.TILE_NUMBER) * i + 10,
                        (Math.sin(temp) * this.ctx.canvas.height/ 5)  + this.ctx.canvas.height / 2
                    )
                );
            }
        } else {
            for (let i = 0; i < this.TILE_NUMBER; i++) {
                temp += piece;
                points.push(
                    new Point(
                        (Math.sin(temp) * this.ctx.canvas.width/5) + this.ctx.canvas.width / 2,
                        (this.ctx.canvas.height / this.TILE_NUMBER) * i + 10
                    )
                );
            }
        }
        // render
        this.ctx.fillStyle = "green";
        points.forEach(e => {
            this.ctx.fillRect(e.x, e.y, 20, 20);
        });
    }
}
