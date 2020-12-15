import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { UserCountData, UserCount } from '../../../@core/data/user-count';

@Component({
  selector: 'ngx-user-count',
  templateUrl: './user-count.component.html',
  styleUrls: ['./user-count.component.scss']
})
export class UserCountComponent implements OnDestroy {

  private alive = true;

  userCount: UserCount[] = [];
  type = 'month';
  types = ['week', 'month', 'year'];
  currentTheme: string;

  constructor(private themeService: NbThemeService,
              private userCountService: UserCountData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });

    this.getUserCount(this.type);
  }

  getUserCount(period: string) {
    this.userCountService.getUserCountData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(userCountData => {
        this.userCount = userCountData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
