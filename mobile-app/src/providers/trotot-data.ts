import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TrototData {
  private baseUrl = 'http://192.168.1.6:8080/';
  constructor(
    public http: Http) { }

  getHousesData(lat: number, lng: number): Observable<any[]> {
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

  searchHouse(location: any, radius: number, limit: number, price: any) {
    let options = new RequestOptions();
    let params = new URLSearchParams();
    params.set('lat', location.lat.toString());
    params.set('lng', location.lng.toString());
    params.set('limit', limit.toString());
    params.set('radius', radius.toString());
    params.set('priceLow', (price.lower * 1000000).toString());
    params.set('priceHigh', (price.upper * 1000000).toString());
    options.search = params;
    return this.http.get(this.baseUrl + 'api/house', options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getReviews(houseId: number): Observable<any[]> {
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

  login(user: any): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let body ='username=' + user.username + 
              '&password=' + user.password;
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(this.baseUrl + 'login', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAccount(token: string): Observable<any> {
    let headers = new Headers({
      'x-access-token': token
    })
    let options = new RequestOptions({
      headers: headers
    })
    return this.http.get(this.baseUrl + 'account', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  uploadImage(file64): Observable<string> {
    file64 = file64.replace("data:image/jpeg;base64,", "");
    file64 = file64.replace(/\//g, '%2F');
    file64 = file64.replace(/=/g, '%3D');
    file64 = file64.replace(/\+/g, '%2B');
    let headers = new Headers({
      'Authorization': 'Client-ID 09f28788142a16a',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let body = 'image='+file64+'&type=base64';
    //console.log(body);
    let options = new RequestOptions({
      headers: headers
    })
    return this.http.post('https://api.imgur.com/3/image', body, options)
        .map(res => res.json().data.link);

  }

  createNewHouse(data:any, token: string) {
    let headers = new Headers({
      'x-access-token': token,
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    let options = new RequestOptions({
      headers: headers
    })
    return this.http.post(this.baseUrl + 'api/house', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
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
