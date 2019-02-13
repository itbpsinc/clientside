import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: 'checkbox-cell',
  templateUrl: './mat-checkbox.component.html',
  styleUrls: ['./mat-checkbox.component.scss']
})
export class MatCheckboxComponent implements  ICellRendererAngularComp {

  constructor() { }
 

  private params: any;

  private checked: boolean = false;

  agInit(params: any): void {
    this.params = params;
    this.checked = this.params.value as Boolean === true;
  }

  // demonstrates how you can do "inline" editing of a cell
  onChange(checked: boolean) {
    this.checked = checked;
    this.params.node.setDataValue(this.params.colDef, this.checked ? "true" : "false");
  }

  refresh(params: any): boolean {
    return false;
  }


}
