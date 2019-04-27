import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { BaseApi } from 'src/app/shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {

    constructor(public http: Http) {
        super(http);
    }

    getBill(): Observable<Bill> {
        return this.get('bill');
    }

    updateBill(bill: Bill): Observable<Bill> {
        return this.put('bill', bill);
    }

    getCurrency(): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this.http.get('http://data.fixer.io/api/latest?access_key=71ebb73c7f4fba5a2199e39636dd7889&symbols=USD,AUD,CAD,PLN,MXN&format=1')
            .map((response: Response) => response.json());
    }
}
