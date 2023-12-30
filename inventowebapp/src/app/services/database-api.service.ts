import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseApiService {
  sapApi = "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata4/sap/api_whse_physinvtryitem_2/srvd_a2x/sap/whsephysicalinventorydoc/0001/WhsePhysicalInventoryCountItem";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getBusinessLocation(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.inventoServer}/businesslocation`)
  }
  getProduct(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.inventoServer}/product`)
  }
  getCotegory(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.inventoServer}/cotegory`)
  }
  getForecastSales(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.inventoServer}/forecastsales`)
  }

  getSapData(): Observable<any> {
    let header = new HttpHeaders().set(
      "ApiKey","TLnOxAO6A4PDpQIHkShUW0SWn01abHBa"
    );
    return this.http.get(`${this.sapApi}`, { headers: header });
  }

}
