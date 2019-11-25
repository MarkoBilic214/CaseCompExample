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
  generes: Array<any>;
  users: Array<any>;
  options: Array<any>;

  constructor(private http: HttpClient, private searchPipe: SearchByTitle) {
    this.users = [];
    let randuser = {
      titles: [
        {
          title: 'Der Vagabund und das Kind (1921)',
          rating: 5.7
        },
        {
          title: 'Die Spur des Falken (1941)',
          rating: 9.2
        }
      ]
    };
    this.users.push(randuser);
  }

  ngOnInit() {
    this.userLikedMovies = [];
    this.page = 0;
    this.generes = [];
    this.http.get('assets/imdbmovies/imdb.csv', { responseType: 'text' })
      .subscribe(data => {
        parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (result, file) => {
            this.allmovies = result.data;
            this.pagedMovies = this.allmovies.slice(this.page * 10, this.page * 10 + 10);
            this.fields = result.meta.fields.slice(16);
            console.log(this.allmovies);
            this.allmovies.forEach(element => {
              let nob = {};
              this.fields.forEach(elementgen => {
                nob[elementgen] = element[elementgen];
              });
              this.generes.push(nob);
            });
            console.log(this.generes);
          }
        });
      }, error => {
        console.log(error);
      });
    console.log(this.users);
    this.options = [{
      label: '1',
      value: 1
    },
    {
      label: '2',
      value: 2
    },
    {
      label: '3',
      value: 3
    },
    {
      label: '4',
      value: 4
    },
    {
      label: '5',
      value: 5
    },
    {
      label: '6',
      value: 6
    },
    {
      label: '7',
      value: 7
    },
    {
      label: '8',
      value: 8
    },
    {
      label: '9',
      value: 9
    },
    {
      label: '10',
      value: 10
    }];
  }

  changetext(searchText: string) {
    let filtered;
    filtered = this.searchPipe.transform(this.allmovies, searchText);
    this.page = 0;
    this.pagedMovies = filtered.slice(this.page * 20, this.page * 20 + 20);
  }

  addToList(item: any) {
    this.userLikedMovies.push(item);
  }

  onChange(event: any, itemslice: any) {
    console.log(event.target.value);
    this.addToList(itemslice);

  }

  changePage(action: string) {
    if (action === 'next') {
      this.page++;
    }
    else {
      this.page--;
    }
    this.pagedMovies = this.allmovies.slice(this.page * 20, this.page * 20 + 20);
  }
}
