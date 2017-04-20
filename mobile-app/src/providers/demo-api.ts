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
    //let headers = new Headers({'X-Airbnb-OAuth-Token': 'ik46pahd49xhxpmia1kze5bk'});
    let options = new RequestOptions();
    let params = new URLSearchParams();
    params.set('client_id', '3092nxybyb0otqw18e8nh5nty');
    params.set('locale', 'vnm');
    params.set('currency', 'USD');
    options.search = params;
    return this.http.get(this.baseUrl, options)
                    .map(this.extractData)
                    .catch(this.handleError)
                    
  }

  private extractData(res: Response) {
    let body = res.json();
    //console.log(body);
    return body.search_results || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
