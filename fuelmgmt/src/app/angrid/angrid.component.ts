import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-angrid',
  templateUrl: './angrid.component.html',
  styleUrls: ['./angrid.component.scss']
})

export class AngridComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private components;
  private rowData;
  private editType;

  constructor() {
    this.columnDefs = [
      {
        headerName: "Make",
        field: "make",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["Porsche", "Toyota", "Ford", "AAA", "BBB", "CCC"]
        }
      },
      {
        headerName: "Model",
        field: "model",
        editable: true
      },
      {
        headerName: "Price",
        field: "price",
        editable: true,
        cellEditor: "numericCellEditor"
      },
      {
        headerName: "Suppress Navigable",
        field: "field5",
        editable: true,
        suppressNavigable: true
      },
      {
        headerName: "Not Editable",
        field: "field6",
        editable: false
      }
    ];
    this.components = { numericCellEditor: getNumericCellEditor() };
    this.rowData = getRowData();
    this.editType = "fullRow";

  }

  ngOnInit() {
  }

  onAddRow() {
    var newItem = createNewRowData();
    this.gridApi.setFocusedCell(0, "make");
    var res = this.gridApi.updateRowData({ add: [newItem],
      addIndex: 0});
      printResult(res);
    this.gridApi.startEditingCell({
      rowIndex: 0,
      colKey: "make"
    });
  }
  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ remove: selectedData });
    printResult(res);
  }
  updateItemRow()
  {
    var selectedRowData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ update: selectedRowData });
    printResult(res);
  }
  updateItems() {
    var itemsToUpdate = [];
    this.gridApi.forEachNodeAfterFilterAndSort(function(rowNode, index) {
      if (index >= 5) {
        return;
      }
      var data = rowNode.data;
      data.price = Math.floor(Math.random() * 20000 + 20000);
      itemsToUpdate.push(data);
    });
    var res = this.gridApi.updateRowData({ update: itemsToUpdate });
    printResult(res);
  }
  onRemoveSelected2() {
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ remove: selectedData });
    console.log(res.remove[0].data.id);
    var id = res.remove[0].data.id;
    /*
    this.http.delete<any>('http://hostname/api/v1/delete/'+id).subscribe(
        res => {
          console.log(res);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occurred.");
        } else {
          console.log("Server-side error occurred.");
        }
      });
      */
  }

  onBtStopEditing() {
    this.gridApi.stopEditing();
  }

  onBtStartEditing() {
    this.gridApi.setFocusedCell(0, "make");
    this.gridApi.startEditingCell({
      rowIndex: 0,
      colKey: "make"
    });
  }
  

  onRowValueChanged(param)
  {
    console.log(param.data);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

}

function getRowData() {
  var rowData = [];
  for (var i = 0; i < 2; i++) {
    rowData.push({
      make: "Toyota",
      model: "Celica",
      price: 35000 + i * 1000,
      field5: "Sample 22",
      field6: "Sample 23"
    });
    rowData.push({
      make: "Ford",
      model: "Mondeo",
      price: 32000 + i * 1000,
      field5: "Sample 24",
      field6: "Sample 25"
    });
    rowData.push({
      make: "Porsche",
      model: "Boxter",
      price: 72000 + i * 1000,
      field5: "Sample 26",
      field6: "Sample 27"
    });
  }
  return rowData;
}

function createNewRowData() {
  var newData = {
    make: "",
    model: "",
    price:  0,
    field5: "",
    field6: "Not Editable"
  };
 
  return newData;
}
function getNumericCellEditor() 
{
  function isCharNumeric(charStr) {
    return !!/\d/.test(charStr);
  }
  function isKeyPressedNumeric(event) {
    var charCode = getCharCodeFromEvent(event);
    var charStr = String.fromCharCode(charCode);
    return isCharNumeric(charStr);
  }
  function getCharCodeFromEvent(event) {
    event = event || window.event;
    return typeof event.which === "undefined" ? event.keyCode : event.which;
  }

  function NumericCellEditor() { }

  NumericCellEditor.prototype.init = function (params) {
    this.focusAfterAttached = params.cellStartedEdit;
    this.eInput = document.createElement("input");
    this.eInput.style.width = "100%";
    this.eInput.style.height = "100%";
    this.eInput.value = isCharNumeric(params.charPress) ? params.charPress : params.value;
    var that = this;
    this.eInput.addEventListener("keypress", function (event) {
      if (!isKeyPressedNumeric(event)) {
        that.eInput.focus();
        if (event.preventDefault) event.preventDefault();
      }
    });
  };
  NumericCellEditor.prototype.getGui = function () {
    return this.eInput;
  };
  NumericCellEditor.prototype.afterGuiAttached = function () {
    if (this.focusAfterAttached) {
      this.eInput.focus();
      this.eInput.select();
    }
  };

  NumericCellEditor.prototype.isCancelBeforeStart = function () {
    return this.cancelBeforeStart;
  };

  NumericCellEditor.prototype.isCancelAfterEnd = function () { };

  NumericCellEditor.prototype.getValue = function () {
    return this.eInput.value;
  };
  NumericCellEditor.prototype.focusIn = function () {
    var eInput = this.getGui();
    eInput.focus();
    eInput.select();
    console.log("NumericCellEditor.focusIn()");
  };
  NumericCellEditor.prototype.focusOut = function () {
    console.log("NumericCellEditor.focusOut()");
  };
  return NumericCellEditor;
}

function printResult(res) {
  console.log("---------------------------------------");
  if (res.add) {
    res.add.forEach(function(rowNode) {
      console.log("Added Row Node", rowNode.data);
    });
  }
  if (res.remove) {
    res.remove.forEach(function(rowNode) {
      console.log("Removed Row Node", rowNode.data);
    });
  }
  if (res.update) {
    res.update.forEach(function(rowNode) {
      console.log("Updated Row Node", rowNode.data);
    });
  }
}
