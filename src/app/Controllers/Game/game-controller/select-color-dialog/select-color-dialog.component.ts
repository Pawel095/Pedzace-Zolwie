import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TurtleColours } from 'src/app/Enums/TurtleColours';

@Component({
    selector: 'app-select-color-dialog',
    templateUrl: './select-color-dialog.component.html',
    styleUrls: ['./select-color-dialog.component.scss'],
})
export class SelectColorDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<SelectColorDialogComponent>) {}

    ngOnInit() {}

    onCancel() {
        this.dialogRef.close();
    }
}
