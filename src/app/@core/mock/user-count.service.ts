import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import { PeriodsService } from './periods.service';
import { UserCount, UserCountData } from '../data/user-count';

@Injectable()
export class UserCountService extends UserCountData {

  private getRandom = (roundTo: number) => Math.round(Math.random() * roundTo);
  private generateUserCountRandomData(date) {
    return {
      date,
      total: this.getRandom(1000),
      produs: this.getRandom(1000),
      prodeu: this.getRandom(1000),
    };
  }

  data = {};

  constructor(private periods: PeriodsService) {
    super();
    this.data = {
      week: this.getDataWeek(),
      month: this.getDataMonth(),
      year: this.getDataYear(),
    };
  }

  private getDataWeek(): UserCount[] {
    return this.periods.getWeeks().map((week) => {
      return this.generateUserCountRandomData(week);
    });
  }

  private getDataMonth(): UserCount[] {
    const currentDate = new Date();
    const days = currentDate.getDate();
    const month = this.periods.getMonths()[currentDate.getMonth()];

    return Array.from(Array(days)).map((_, index) => {
      const date = `${index + 1} ${month}`;

      return this.generateUserCountRandomData(date);
    });
  }

  private getDataYear(): UserCount[] {
    return this.periods.getYears().map((year) => {
      return this.generateUserCountRandomData(year);
    });
  }

  getUserCountData(period: string): Observable<UserCount[]> {
    return observableOf(this.data[period]);
  }
}
