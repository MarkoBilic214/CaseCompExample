import { Component, OnInit, ViewChild } from '@angular/core';
import { parse } from 'papaparse';
import { HttpClient } from '@angular/common/http';
import { SearchByTitle } from '../shared/search.pipe';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-user-movie-comp',
  templateUrl: './user-movie-comp.html',
  styleUrls: ['./user-movie-comp.scss']
})
export class UserMovieComponent implements OnInit {

  userLikedMovies: Array<any>;
  allmovies: Array<any>;
  pagedMovies: Array<any>;
  fields: Array<any>;
  page: number;

  constructor(private http: HttpClient, private searchPipe: SearchByTitle) {
  }

  ngOnInit() {
    this.userLikedMovies = [];
    this.page = 0;
    this.http.get('assets/imdbmovies/imdb.csv', {responseType: 'text'})
      .subscribe(data => {
        parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (result, file) => {
            console.log(result);
            this.allmovies = result.data;
            this.pagedMovies =  this.allmovies.slice(this.page * 20, this.page * 20 + 20);
          }
        });
      }, error => {
        console.log(error);
      });
  }

  changetext( searchText: string ) {
    let filtered;
    filtered = this.searchPipe.transform(this.allmovies, searchText);
    this.page = 0;
    this.pagedMovies =  filtered.slice(this.page * 20, this.page * 20 + 20);
  }

  addToList(item: any) {
    this.userLikedMovies.push(item);
  }

  changePage(action: string){
    if (action == 'next'){
      this.page++;
    }
    else{
      this.page--; 
    }
    this.pagedMovies =  this.allmovies.slice(this.page * 20, this.page * 20 + 20);
  }
}
