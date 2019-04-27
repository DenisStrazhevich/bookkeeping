import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { WFMEvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  constructor(private eventsService: EventsService, private billService: BillService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    // tslint:disable-next-line:prefer-const
    let {amount, description, category, type} = form.value;
    if (amount < 0) {
      amount *= -1;
    }
    const event = new WFMEvent(type, amount, +category,
      moment().format('DD.MM.YYYY HH:mm:ss'), description);

    this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            // Error
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }
        this.billService.updateBill({value, currency: bill.currency})
          .mergeMap(() => this.eventsService.addEvent(event))
          .subscribe(() => {
            form.setValue({

            });
          });
      });
    this.eventsService.addEvent(event);
  }

}
