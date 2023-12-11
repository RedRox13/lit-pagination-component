import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { HttpService, IBeerResponse } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BeersService {
  public fetchTrigger = new Subject<number>();
  public list$: Observable<IBeerResponse>;

  constructor(private http: HttpService) {
    this.list$ = this.fetchTrigger.pipe(
      switchMap((page: number) => this.http.getBeers$(page)),
    );
  }
}
