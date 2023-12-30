import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DateRange } from "igniteui-angular";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';
import { Barcode } from 'src/app/shared/models/invento';
import { InventoService } from 'src/app/services/invento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;

  userAccessRoles;
  public range: DateRange = { start: new Date(), end: new Date(new Date().setDate(new Date().getDate() + 5)) };

  barcodes: Observable<Barcode[]>;
  head = [['S.No', 'Date', 'Business Location', 'No of Inbound Scan', 'No of Outbound Scan', 'No of Internal Scan']];

  searchText;
  isLoading = false;



  constructor(private barcodeApi: InventoService, private router: Router) { }

  ngOnInit() {
    let auth = JSON.parse(localStorage.getItem("credential"));
    // console.log(auth);
    try {
      // Calling an undefined `item `variable
      if (auth.roles.barcodescanner == false) {
        console.log("Hello !" + auth.name);
        this.router.navigate(['/default/testing']);
      }
    } catch (e) {
      if (e instanceof ReferenceError) {
        console.log(e, true);
        console.log("Hi ! " + auth.name);
      } else {
        console.log(e, false);
        console.log("Hi ! " + auth.name);
      }
    }

    this.reloadData();
  }
  reloadData() {
    this.isLoading = true;
    this.barcodeApi.getBarcodelist().subscribe(data => {
      this.barcodes = data;
      this.isLoading = false;
    },
      err => console.log(err));
    // console.log("Not Working")
  }
  submit() {
    console.log("Form Submitted")
  }


  public openPDF(): void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('angular-demo.pdf');
    });
  }

}
