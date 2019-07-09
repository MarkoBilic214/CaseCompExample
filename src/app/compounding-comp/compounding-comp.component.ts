import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compounding-comp',
  templateUrl: './compounding-comp.component.html',
  styleUrls: ['./compounding-comp.component.scss']
})
export class CompoundingCompComponent implements OnInit {

  celebs: Array<any>;
  SelectedCeleb: any;
  count: number;
  years: string;
  options: Array<any>;
  risk: number;
  result: number;

  constructor() {
  }

  ngOnInit() {
    this.celebs = [{
      name: 'kim Kardashian',
      urlPic: 'https://amp.insider.com/images/5d0b91e29c5101118b066dc5-750-563.jpg',
      money: 350000000
    },
    {
      name: 'drake',
      urlPic: 'https://cdn.cnn.com/cnnnext/dam/assets/190619154848-01-drake-0619-restricted-large-169.jpg',
      money: 150000000
    }];

    this.options=[{
      label: 'Safe',
      value: 4
    },
    {
      label: 'medium',
      value: 8
    },
    {
      label: 'super Risky',
      value: Math.floor(Math.random() * 15) + 1
    }];
  }

  setSelectedCeleb(celeb: any) {

    this.SelectedCeleb = celeb;
    console.log(this.SelectedCeleb.name);

  }

  buttonEvent(res: string) {
    this.years = res;
    console.log(this.years);
    console.log('click ', this.years);
  }
  
  onChange() {
    this.result = this.SelectedCeleb.money * Math.pow((1 + (this.risk / 100)), parseInt(this.years, 10));
    console.log(this.result);
  }

  clearSelections() {
    this.years = null;
    this.result = null;
    this.risk = null;
    this.SelectedCeleb = null;
  }

}
