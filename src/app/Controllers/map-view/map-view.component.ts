import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { Point } from "src/app/Models/Point";
import { GameStateService } from "src/app/Servces/game-state.service";
import { TurtlePiece } from "src/app/Models/TurtlePiece";
import { runInThisContext } from "vm";

@Component({
    selector: "app-map-view",
    templateUrl: "./map-view.component.html",
    styleUrls: ["./map-view.component.scss"]
})
export class MapViewComponent implements OnInit {
    TILE_NUMBER = 10;
    TURTLE_SIZE = 10;

    ctx: CanvasRenderingContext2D;
    points: Array<Point> = [];

    // aktualizowane w callbacku
    turtlePositions: Array<TurtlePiece>;
    constructor(private gss: GameStateService) {}

    @ViewChild("map", { static: true }) map: ElementRef<HTMLCanvasElement>;

    @HostListener("window:resize", ["$event"])
    onResize() {
        this.points = [];
        this.ctx.canvas.width = window.innerWidth - 200;
        this.ctx.canvas.height = window.innerHeight - 400;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // console.log(this.ctx);
        // poziome: y sinus; x stałe
        let temp = Math.PI / 2;
        const piece = -Math.PI / 3;
        if (this.ctx.canvas.width >= this.ctx.canvas.height) {
            this.TURTLE_SIZE = this.ctx.canvas.height / 15;
            for (let i = 0; i < this.TILE_NUMBER; i++) {
                temp += piece;
                this.points.push(
                    new Point(
                        (this.ctx.canvas.width / this.TILE_NUMBER) * i + 10,
                        (Math.sin(temp) * this.ctx.canvas.height) / 5 + this.ctx.canvas.height / 2
                    )
                );
            }
        } else {
            for (let i = 0; i < this.TILE_NUMBER; i++) {
                temp += piece;
                this.points.push(
                    new Point(
                        (Math.sin(temp) * this.ctx.canvas.width) / 5 + this.ctx.canvas.width / 2,
                        (this.ctx.canvas.height / this.TILE_NUMBER) * i + 10
                    )
                );
            }
        }
        this.render();
    }

    ngOnInit() {
        this.ctx = this.map.nativeElement.getContext("2d");
        this.turtlePositions = this.gss.turtlePositions;

        this.onResize();
        this.gss.registerGameStateUpdate(() => {
            console.log("CALLBACK!");
        });
    }
    debugFillStyles = ["red", "yellow", "black", "lightblue", "magenta"];
    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "green";
        this.points.forEach(e => {
            this.ctx.fillRect(e.x, e.y, this.ctx.canvas.width / 10, this.ctx.canvas.height / 15);
        });
        let debugIterator = 0;
        this.turtlePositions.forEach(e => {
            if (this.ctx.canvas.width >= this.ctx.canvas.height) {
                if (e.mapPosition === 0) {
                    const x = this.points[e.mapPosition].x + this.ctx.canvas.width / 40 - this.TURTLE_SIZE / 2;
                    const y = this.points[e.mapPosition].y + (this.TURTLE_SIZE + 5) * e.colour;
                    this.ctx.fillStyle = "lightBlue";
                    this.ctx.fillRect(x, y, this.TURTLE_SIZE, this.TURTLE_SIZE);
                } else {
                    const x = this.points[e.mapPosition].x + this.ctx.canvas.width / 40 - this.TURTLE_SIZE / 2;
                    const y = this.points[e.mapPosition].y - (e.verticalPositon + this.TURTLE_SIZE/2) * e.colour;
                    this.ctx.fillStyle = this.debugFillStyles[debugIterator++];
                    this.ctx.fillRect(x, y, this.TURTLE_SIZE, this.TURTLE_SIZE);
                }
            }
        });
    }
}
