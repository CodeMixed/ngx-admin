import { Observable } from 'rxjs';

export interface UserCount {
  date: string;
  total: number;
  produs: number;
  prodeu: number;
}

export abstract class UserCountData {
  abstract getUserCountData(period: string): Observable<UserCount[]>;
}
