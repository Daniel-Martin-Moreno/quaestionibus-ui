import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pregunta } from './pregunta';
import { Tema } from './pregunta';
import { PreguntaForSaving } from './pregunta';



@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  private convocatoriasUrl = 'http://localhost:9002/convocatorias';  // URL to web api
  private preguntasUrl = 'http://localhost:9002/preguntas';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient) { }
    
  /** GET heroes from the server */
  getPregunta (idConvocatoria, numero): Observable<Pregunta> {
    return this.http.get<Pregunta>(this.convocatoriasUrl+"/"+idConvocatoria+"/preguntas/"+numero)
      .pipe(
        tap(_ => this.log('fetched pregunta')),
        catchError(this.handleError<Pregunta>('getPregunta'))
      );
  }

  /** GET heroes from the server */
  getTema (idConvocatoria, numero, parte): Observable<Tema> {
    return this.http.get<Tema>(this.convocatoriasUrl+"/"+idConvocatoria+"/temas/"+numero+"/parte/"+parte)
      .pipe(
        tap(_ => this.log('fetched tema')),
        catchError(this.handleError<Tema>('getTema'))
      );
  }

  /** GET heroes from the server */
  getPreguntasTema (idConvocatoria, numero, parte): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.convocatoriasUrl+"/"+idConvocatoria+"/temas/"+numero+"/parte/"+parte+"/preguntas")
      .pipe(
        tap(_ => this.log('fetched preguntas tema')),
        catchError(this.handleError<Pregunta[]>('getPreguntasTema'))
      );
  }


  /** UPDATE pregunta comentarios */
   /** PUT: update the pregunta on the server */
   updatePreguntaComentarios (idPregunta, comentarios): Observable<any> {
    return this.http.put(this.preguntasUrl+"/"+idPregunta+"/comentarios", comentarios).pipe(
      tap(_ => this.log(`updated pregunta comentarios id=${idPregunta}`)),
      catchError(this.handleError<any>('updatePreguntaComentarios'))
    );
  }

  /** UPDATE pregunta */
   /** PUT: update the pregunta on the server */
   updatePregunta (idPregunta, pregunta:PreguntaForSaving): Observable<any> {    
     return this.http.put(this.preguntasUrl+"/"+idPregunta, pregunta, this.httpOptions).pipe(
      tap(_ => this.log(`updated pregunta id=${idPregunta}`)),
      catchError(this.handleError<any>('updatePregunta'))
    );
  }

  /** ASOCIAR TEMA A PREGUNTA */
   /** PUT: update the pregunta on the server */
   addTemaToPregunta (idPregunta, idTema): Observable<any> {
    return this.http.put(this.preguntasUrl+"/"+idPregunta+"/temas/"+idTema+"/asociar","").pipe(
      tap(_ => this.log(`updated pregunta id=${idPregunta}`)),
      catchError(this.handleError<any>('addTemaToPregunta'))
    );
  }

  /** ASOCIAR TEMA A PREGUNTA */
   /** PUT: update the pregunta on the server */
   addTemaToPreguntaByCaractsTema (idPregunta, idConvocatoria, numero, parte): Observable<any> {
    return this.http.put(this.preguntasUrl+"/"+idPregunta+"/convocatorias/"+idConvocatoria+"/numero/"+numero+"/parte/"+parte+"/asociar","").pipe(
      tap(_ => this.log(`updated pregunta id=${idPregunta}`)),
      catchError(this.handleError<any>('addTemaToPreguntaByCaractsTema'))
    );
  }
  

  /** DESASOCIAR TEMA A PREGUNTA */
   /** PUT: update the pregunta on the server */
   removeTemaToPregunta (idPregunta, idTema): Observable<any> {
    return this.http.put(this.preguntasUrl+"/"+idPregunta+"/temas/"+idTema+"/desasociar","").pipe(
      tap(_ => this.log(`updated pregunta id=${idPregunta}`)),
      catchError(this.handleError<any>('removeTemaToPregunta'))
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
