import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Convocatoria } from './convocatoria'

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  private convocatoriasUrl = 'http://localhost:9002/convocatorias';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET heroes from the server */
  getConvocatorias (): Observable<Convocatoria[]> {
    return this.http.get<Convocatoria[]>(this.convocatoriasUrl)
      .pipe(
        tap(_ => this.log('fetched convocatorias')),
        catchError(this.handleError<Convocatoria[]>('getConvocatorias', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`ConvocatoriaService: ${message}`);
  }
}
