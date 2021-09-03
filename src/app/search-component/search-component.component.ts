import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { IDeezer, IiTunes } from 'src/Interfaces';
import { DataServiceService } from '../data-service.service'

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})

export class SearchComponentComponent implements OnInit, OnDestroy {
  iTunesArtistData: IiTunes[] | undefined;
  DeezerArtistData: IDeezer[] | undefined;;
  private _subs: Subscription | undefined;

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
  }

  onSearch(name: string) {
    this._subs = combineLatest([
      this.service.getDeezerArtistData$(name),
      this.service.getiTunesArtistData$(name)
    ])
      .subscribe(
        ([DeezerArtist, iTunesArtist]) => {
          this.DeezerArtistData = DeezerArtist;
          this.iTunesArtistData = iTunesArtist;
        }
      )
  }

  ngOnDestroy(): void {
    if (this._subs) {
      this._subs.unsubscribe();
    }
  }
}
