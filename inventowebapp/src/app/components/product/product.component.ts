import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseApiService } from '../../services/database-api.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // keyName = [];
  sapData: Observable<any>;
  sourceData = [];

  constructor(private sapService: DatabaseApiService) {
  }

  ngOnInit() {
    this.sapService.getSapData().subscribe(data => {
      // Object.keys(data).forEach((key) => {
      //   console.log(key);
      //   // this.keyName.push(key);
      // });
      this.sourceData.push(data);
      console.log(this.sourceData);
      this.sapData = data.value;
    },
      err => console.log(err));
  }

}
