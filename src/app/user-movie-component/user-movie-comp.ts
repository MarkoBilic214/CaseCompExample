import { Component, OnInit, ViewChild } from '@angular/core';
import { parse } from 'papaparse';
import { HttpClient } from '@angular/common/http';
import { SearchByTitle } from '../shared/search.pipe';
@Component({
  selector: 'app-user-movie-comp',
  templateUrl: './user-movie-comp.html',
  styleUrls: ['./user-movie-comp.scss']
})
export class UserMovieComponent implements OnInit {

  userLikedMovies: Array<string>;
  userRatedMovies: MovieMap;
  allmovies: Array<any>;
  pagedMovies: Array<any>;
  fields: Array<any>;
  page: number;
  generes: Array<any>;
  users: Array<MovieMap>;
  options: Array<any>;
  userSimilarity: Array<number>;
  candidateMovies: MovieMap;

  constructor(private http: HttpClient, private searchPipe: SearchByTitle) {
    this.users = [];

    let user2 = {};
    user2['Spy Kids (2001)'] = 5;
    user2['James Bond 007 - GoldenEye (1995)'] = 4;
    user2['James Bond 007 - Goldfinger (1964)'] = 4;
    user2['The King\'s Speech (2010)'] = 1;
    user2['Kung Fu Panda (2008)'] = 2;

    this.users.push(user2);
  }

  ngOnInit() {
    this.userLikedMovies = [];
    this.userRatedMovies = {};
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
    this.options = [
      {
      label: '0',
      value: 0
    },
    {
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
    }];
  }

  changetext(searchText: string) {
    let filtered;
    filtered = this.searchPipe.transform(this.allmovies, searchText);
    this.page = 0;
    this.pagedMovies = filtered.slice(this.page * 10, this.page * 10 + 10);
  }

  addToList(item: any) {
    this.userLikedMovies.push(item);
    this.userRatedMovies[item.title] = item.rating;
  }

  onChange(event: any, itemslice: any) {
    const item = {
      title: itemslice.title,
      rating: event.target.value
    };
    this.addToList(item);
    this.recommend();
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

  recommend() {
    this.candidateMovies = {};
    this.userSimilarity = [];
    for (var i=0; i<this.users.length; i++) {
      this.userSimilarity.push(this.calculateSimilarity(this.userRatedMovies, this.users[i]));
      console.log(this.userSimilarity[i]);
      if (this.userSimilarity[i] > 0.5) {
        for (let movie in this.users[i]) {
          if (!(movie in this.userRatedMovies) && !(movie in this.candidateMovies)) {
            this.candidateMovies[movie] = 5;
          }
        }
      }
    }

    let recommendations = [];

    for (let movie in this.candidateMovies) {
      let movieSum = 0;
      let count = 0;
      for (let i=0; i<this.users.length; i++) {
        if (movie in this.users[i]) {
          movieSum = movieSum + (this.users[i][movie]*this.userSimilarity[i]);
          count = count + this.userSimilarity[i];
        }
      }
      recommendations.push({
        title: movie,
        rating: movieSum/count 
      })
    }

    recommendations.sort((movie1, movie2) => (movie1.rating > movie2.raint) ? -1 : 1);
    console.log(recommendations);
  }

  calculateSimilarity(user: MovieMap, guest: MovieMap) {
    let userList = [];
    let userSum = 0;
    let guestList = [];
    let guestSum = 0;

    //create list of matching rated movies
    for (let key in user) {
      if (key in guest) {
        userList.push(user[key]);
        userSum = userSum + userList.push(user[key]);
        guestList.push(guest[key]);
        userSum = guestSum + guestList.push(user[key]);
      }
    }

    let userAvg = userSum/userList.length;
    let guestAvg = guestSum/guestList.length;

    let crossSum = 0;
    let sqSum1 = 0;
    let sqSum2 = 0;

    for (var k=0; k<userList.length; k++) {
      crossSum = crossSum + (userList[k]-userAvg)*(guestList[k]-guestAvg);
      sqSum1 = sqSum1 + Math.pow(userList[k]-userAvg, 2);
      sqSum2 = sqSum2 + Math.pow(guestList[k]-guestAvg, 2);
    }
    return crossSum / Math.pow(sqSum1*sqSum2, 0.5);
  }
}

export interface MovieMap {
  [key: string] : number;
}