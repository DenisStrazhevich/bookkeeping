import { BaseApi } from 'src/app/shared/core/base-api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { WFMEvent } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable()
export class EventsService extends BaseApi {
    constructor(public http: Http) {
        super(http);
    }

    addEvent(event: WFMEvent): Observable<WFMEvent> {
        return this.post('events', event);
    }
}
