import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { IDeezer, IiTunes } from 'src/Interfaces';

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {
  constructor(private http: HttpClient) { }

  public getDeezerArtistData$(name: string): Observable<IDeezer[]> {
    const requestedParams = {
      q: name
    };

    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');

    return this.http
      .get('https://api.deezer.com/search', {
        observe: 'response',
        params: requestedParams,
        headers: header
      })
      .pipe(
        map(({ body }: any) => body.results.map((x: { artist: { Id: any; name: any; link: any; type: any; }; }) => {
          return {
            artistId: x.artist.Id,
            artistName: x.artist.name,
            artistLink: x.artist.link,
            artistType: x.artist.type,
          } as IDeezer;
        })),
        catchError(err => {
          return of([])
        })
      );
  }

  public getiTunesArtistData$(name: string): Observable<IiTunes[]> {
    const requestedParams = {
      term: name
    };

    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');

    return this.http
      .get('https://itunes.apple.com/search', {
        observe: 'response',
        params: requestedParams,
        headers: header
      })
      .pipe(
        map(({ body }: any) => body.results.map((x: { artistId: any; artistName: any; artistViewUrl: any; collectionCensoredName: any; }) => {
            return {
              artistId: x.artistId,
              artistName: x.artistName,
              artistViewUrl: x.artistViewUrl,
              collectionCensoredName: x.collectionCensoredName,
            } as IiTunes;
          })),
          catchError(err => {
            return of([])
          })
      )
  }

}
