import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DemoAPI {
  private baseUrl = 'https://api.airbnb.com/v2/search_results';
  constructor(
    public http: Http) {}
  
  getHousesData(): Observable<any[]> {
    let headers = new Headers();
    headers.set('X-Airbnb-OAuth-Token', 'ik46pahd49xhxpmia1kze5bk');
    let options = new RequestOptions();
    options.headers = headers;
    let params = new URLSearchParams();
    params.set('client_id', '3092nxybyb0otqw18e8nh5nty');
    params.set('locale', 'en-US');
    params.set('currency', 'USD');
    options.search = params;
    return this.http.get(this.baseUrl, options)
                    .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body.data || { };
  }

}
