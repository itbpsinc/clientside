import { Component, ViewChild, OnInit } from '@angular/core';
import {FuelmgtService} from './../services/fuelmgt.service';

import { MatCheckboxComponent} from "../mat/mat-checkbox/mat-checkbox.component";
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit 
{

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private components;
  private rowData;
  private rowSelection;
  private editType;
  private defaultColDef;
  private rowHeight;
  private selectRow: {};
  private frameworkComponents = {};



  constructor(private fuelmgtService: FuelmgtService) 
  {
    

    
  }

  onRowValueChanged(param) 
  {
  
    let changeValue = removeEmpty(JSON.parse(JSON.stringify(param.data)));
    
  
    let seleRow  =   removeEmpty(this.selectRow);
   // console.log("New row is updated",changeValue);
    //console.log("Previous      data",seleRow);
    console.log("Any value Changed ",!isEquivalent(changeValue,seleRow));
    this.selectRow = {};

  }

  autoSizeAll() {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.autoSizeAll();
  }
  ngOnInit() 
  {
    this.rowData = this.onGetRowData();
    this.columnDefs = [
      {
        headerName: "Id",
        field: "id",
        editable: false,
        sortable: true,
        hide:true
      },
      {
        headerName: "FirstName",
        field: "firstName",
        editable: true,
        sortable: true,
        filter: true,
        width: 500,
        resizable: true,
        pinned: "left"
   },
      {
        headerName: "LastName",
        field: "lastName",
        editable: true,
        sortable: true,
        filter: true,
        resizable: true,
        pinned: "left",
        width: 500,
      },
      {
        headerName: "Address",
        field: "address1",
        editable: true,
        sortable: false,
        filter: true,
        width: 700,
        resizable: true
      },
      {
        headerName: "Address2",
        field: "address2",
        editable: true,
        sortable: false,
        filter: true,
        width: 700,
        resizable: true
      },
      {
        headerName: "City",
        field: "city",
        width: 500,
        editable: true,
        sortable: true,
        filter: true,
        resizable: true
      },
      {
        headerName: "State",
        field: "state",
        editable: true,
        width: 250,
        sortable: true,
        filter: true,
        resizable: true
      },
      {
        headerName: "Zipcode",
        field: "Zipcode",
        editable: true,
        sortable: true,
        filter: true,
        width: 250,
        resizable: true
      },
      {
        headerName: "DOH",
        field: "dateofhire",
        editable: true,
        sortable: false,
        width: 200,
        filter: true
       
      },
      {
        headerName: "SSN",
        field: "ssn",
        editable: true,
        sortable: false,
        width: 200,
        suppressMenu: true
      },
      {
        headerName: "Active",
        field: "active",
        editable: true,
        sortable: true,
        filter: true,
        cellRenderer: "checkboxRenderer"
       
      },
      {
        headerName: "Role",
        field: "role",
        editable: true,
        sortable: true,
        filter: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["User", "Admin", "Dispatch", "Accountant", "Office Manager"]
        }
      }
    ];


    this.components = { numericCellEditor: getNumericCellEditor()}; 
    this.frameworkComponents = {checkboxRenderer: MatCheckboxComponent}
    this.editType = "fullRow";
    this.rowSelection ="single";
    this.defaultColDef = { resizable: true};
    this.rowHeight = 40;
  
  }

  onSelectionChanged()
  {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function(selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.lastName + ', ' + selectedRow.firstName;
    });
    document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  }
  onGetRowData()
  {
    let data;
    this.fuelmgtService.getEmployees().subscribe(employees =>{
      this.rowData = employees;
    
      console.log('event--->>>', this.rowData);
      //return rowdata;

    });

    
   
  }
  

  onAddRow() {
    var newItem = createNewRowData();
    this.gridApi.setFocusedCell(0, "make");
    var res = this.gridApi.updateRowData({
      add: [newItem],
      addIndex: 0
    });
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
  onUpdateItemRow() {
    var selectedRowData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ update: selectedRowData, colkey: 'firstName'});
    printResult(res);
  }
  onRowEditingStarted(param)
  {
      console.log("onRowEditingStarted....");
      this.selectRow = JSON.parse(JSON.stringify(this.gridApi.getSelectedRows()[0]));
    
      Object.keys(this.selectRow).forEach((obj)=>{
        console.log(obj);
      })
      
     
  }
  updateItems() {
    var itemsToUpdate = [];
    this.gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
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
    
  }

}

function isEquivalent(a, b) {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
      return false;
  }

  for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      let avalue = a[propName];
      let bvalue = b[propName];
      
      let aval = avalue+"".trim();
      let bval  = bvalue+"".trim();     
      aval =  aval.trim().replace(/^"|"$/g, '');
      bval =  bval.trim().replace(/^"|"$/g, '');

      if (aval !== bval) {
          return false;
      }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}


function RefundedCellRenderer(params) {
  return params.value;
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


function removeEmpty(obj) {
  Object.keys(obj).forEach(function(key) {
    (obj[key] && typeof obj[key] === 'object') && removeEmpty(obj[key]) ||
    (obj[key] === '' || obj[key] === null) && delete obj[key]
  });
  return obj;
};

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
