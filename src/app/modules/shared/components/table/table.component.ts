import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from "@angular/core";

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html'
})
export class TableComponent implements OnInit {
  @Input()
  dataSet: any[];

  @Input()
  tableHeader: TemplateRef<any>;

  @Input()
  tableBody: TemplateRef<any>;

  @Input()
  filterAndSearch: boolean;

  @Input()
  withHeader: boolean;

  @Output()
  selected: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  displayData: EventEmitter<any[]> = new EventEmitter<any[]>();

  sizes: { label: string, value: number }[];
  page: number;
  maxEntries: number;
  searchVal: string;

  constructor() {
  }

  ngOnInit() {
    console.log(this.dataSet);
    this.displayData.emit(this.dataSet);

    this.searchVal = '';
    this.sizes = [
      {label: '5', value: 5},
      {label: '10', value: 10},
      {label: '15', value: 15}
    ];
    this.page = 1;
    this.maxEntries = 10;
    this.selected.emit({});
  }

  transformObjectIntroArray(dataObj): any[] {
    let array = Object.values(dataObj);
    let i = 0;
    while (i < array.length) {
      if (!array[i]) {
        array.splice(i, 1);
      } else if (array[i] instanceof Object) {
        array = array.concat(this.transformObjectIntroArray(array[i]));
        array.splice(i, 1);
      } else {
        i++;
      }
    }

    return array;
  }

  search(value) {
    console.log(value);
    const valRegexp = new RegExp(value, 'i');
    this.displayData
      .emit(this.dataSet.filter(item => {

      const checkArray = this.transformObjectIntroArray(item);
      for (const val of checkArray) {
        if (val === value || valRegexp.test(<string> val)) {
          return true;
        }
      }
    }));
  }
}