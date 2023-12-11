import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BeersService } from './beers.service';
import { Observable, Subject, map, takeUntil, timer} from 'rxjs';
import { IBeer } from './beer.interface';
import { HttpService, IBeerResponse } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  public title = 'ui-test';
  public currentPage: number = 1;
  public totalPages: number = 10;
  public isLoading$: Observable<boolean>;
  public errorMessage!: string | null;
  public list$: Observable<IBeer[]>;
  public isToastrShown: boolean = false;
  private destroy$: Subject<void> = new Subject();

  constructor(private beerService: BeersService, private http: HttpService) {
    this.isLoading$ = this.http.isLoading$;
    this.list$ = this.beerService.list$.pipe(
      map((resp: IBeerResponse) => {
        this.errorMessage = resp.error?.error.message;

        if (this.errorMessage) {
          this.isToastrShown = true;
          timer(3000).pipe(
            takeUntil(this.destroy$)
          ).subscribe(() => this.isToastrShown = false)
        }

        return resp.data;
      })
    );
  }

  ngAfterViewInit(): void {
    this.beerService.fetchTrigger.next(1);
  }

  handlePageChange(event: Event): void {
    this.errorMessage = null;
    this.currentPage = (<CustomEvent>event).detail.page;
    this.beerService.fetchTrigger.next(this.currentPage);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
