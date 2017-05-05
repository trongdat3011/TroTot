import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TrototData {
  private baseUrl = 'http://192.168.43.39:8080/';
  constructor(
    public http: Http) {}
  
  getHousesData(lat:number, lng:number): Observable<any[]> {
    //let headers = new Headers({'X-Airbnb-OAuth-Token': 'ik46pahd49xhxpmia1kze5bk'});
    let options = new RequestOptions();
    let params = new URLSearchParams();
    params.set('lat', lat.toString());
    params.set('lng', lng.toString());
    params.set('limit', '20');
    options.search = params;
    return this.http.get(this.baseUrl + 'api/house', options)
                    .map(this.extractData)
                    .catch(this.handleError)
                    
  }

  searchHouse(location:any, radius:number, limit:number, price:any) {
    let options = new RequestOptions();
    let params = new URLSearchParams();
    params.set('lat', location.lat.toString());
    params.set('lng', location.lng.toString());
    params.set('limit', limit.toString());
    params.set('radius', radius.toString());
    params.set('priceLow', (price.lower * 1000000).toString());
    params.set('priceHigh',(price.upper * 1000000).toString());
    options.search = params;
    return this.http.get(this.baseUrl + 'api/house', options)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  getReviews(houseId:number): Observable<any[]> {
    let options = new RequestOptions();
    let params = new URLSearchParams();
    params.set('client_id', '3092nxybyb0otqw18e8nh5nty');
    params.set('listing_id', houseId.toString());
    params.set('role', 'all');
    params.set('_limit', '20');
    options.search = params;
    return this.http.get(this.baseUrl + 'reviews', options)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res.json();
    //console.log(body);
    return body;
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
