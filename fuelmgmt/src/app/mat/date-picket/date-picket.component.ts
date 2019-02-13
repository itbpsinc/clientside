import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ICellEditorParams } from 'ag-grid-community';
import { AgEditorComponent } from 'ag-grid-angular';
import { MatDatepicker } from '@angular/material';

@Component({
  selector: 'app-date-picket',
  templateUrl: './date-picket.component.html',
  styleUrls: ['./date-picket.component.scss'],
  styles: [
    `
    .md-form-field {
        margin-top: -16px;
    }
`
]
})


export class MatDatePicketComponent implements OnInit, AgEditorComponent, AfterViewInit {
  columnWidth: string;
  params: ICellEditorParams;
  private value: string;
  @ViewChild('picker', { read: MatDatepicker }) picker: MatDatepicker<Date>;

  constructor() { }

  ngAfterViewInit() {
    this.picker.open();
  }

  isPopup(): boolean {
    return false;
  }

  isCancelBeforeStart(): boolean {
    return false;
  }

  isCancelAfterEnd(): boolean {
    return false;
  }
  ngOnInit() {
  }

  agInit(params: any): void {
    this.params = params;
    this.value = params.value;
  }

  getValue(): string {
    return this.value;
  }

  onSelectChange(e): void {
    setTimeout(function () {
      this.params.stopEditing();
    }.bind(this));
  }

}
