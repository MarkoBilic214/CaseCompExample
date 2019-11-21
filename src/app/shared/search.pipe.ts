import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({ name: 'searchTitle' })
export class SearchByTitle implements PipeTransform {
  transform(teachers: Array<any>, searchText: string) {
    if (!searchText) {
      return teachers;
    }
    return teachers.filter( x => x.title.trim().toLowerCase().includes(searchText.trim().toLowerCase()));
  }
}