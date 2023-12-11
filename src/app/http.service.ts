import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, debounceTime, map, of, tap } from 'rxjs';
import { IBeer } from './beer.interface';

export interface IBeerResponse {
  data: IBeer[];
  error: HttpErrorResponse | null;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private API: string = 'https://api.punkapi.com/v2/beers';
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoading$: Observable<boolean> = this._isLoading$.pipe(debounceTime(300));

  constructor(private http: HttpClient) {}

  getBeers$(page: number = 1): Observable<IBeerResponse> {
    this._isLoading$.next(true);

    return this.http.get<IBeer[]>(this.API, { params: {page}}).pipe(
      map((list: IBeer[]) => ({
        data: list,
        error: null
      })),
      catchError((error) => of({
        data: [],
        error
      })),
      tap(() => this._isLoading$.next(false))
    );
  }
}
