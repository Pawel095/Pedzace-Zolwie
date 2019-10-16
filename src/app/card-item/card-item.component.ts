import { Component, OnInit, Input } from "@angular/core";
import { Card } from "../Models/Card";

@Component({
  selector: "app-card-item",
  templateUrl: "./card-item.component.html",
  styleUrls: ["./card-item.component.scss"]
})
export class CardItemComponent implements OnInit {
  constructor() {}

  @Input() card: Card;

  ngOnInit() {}
}
