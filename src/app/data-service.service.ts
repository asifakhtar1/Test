import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  public getDeezerArtistData$(name: string) : Observable<any> {    
   const requestedParams = {
     q: name
   }; 

   return this.http
   .get('https://api.deezer.com/search', {
     observe: 'response',
     params: requestedParams
   })
   .pipe(     
    catchError(err => {
      return of(null)
    })
   );
  }

  public getiTunesArtistData$(name: string) : Observable<any> {    
   const requestedParams = {
    term: name
   }; 

   return this.http
   .get('https://itunes.apple.com/search', {
     observe: 'response',
     params: requestedParams
   })
   .pipe(
     map(( { body }: any) => body.results),
     catchError(err => {
       return of(null)
     })
   )
  }

}
