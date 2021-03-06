import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { NgForm } from '@angular/forms';
import { Cake } from './models/cake';
import { Rate } from './models/rate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  wasViewHit: boolean;
  selectedCake;
  newCake = new Cake();
  allCakes: any; // Object[]; returns err, explore the err.
  newRate = new Rate();
  ratingResult;
  display: boolean;
  displayedCake;

  constructor(private _httpService: HttpService) { }
 
  ngOnInit() {
    this.ratingResult = 0;
    // this.newRate = { rating: null, comment: '' };
    this.getCakesFromService();
  }

  getCakeFromService(id: string) {
    let obs = this._httpService.getCakeById(id)
    obs.subscribe(foundCake => {
      console.log("Found cake: ", foundCake);
    })
  }

  getCakesFromService() {
    let obs = this._httpService.getCakes();
    obs.subscribe(dbCakes => {
      console.log("All Cakes OnInit", dbCakes);
      this.allCakes = dbCakes;
      this.allCakes.forEach(element => {
        this.selectCake(element);
      })
    })
  }

  onCakeSubmit(event: Event, cakeForm: NgForm) {
    event.preventDefault();
    console.log("onCakeSubmit cakeForm.value***", cakeForm.value);
    this.newCake = cakeForm.value;
    let obs = this._httpService.createCake(this.newCake);
    obs.subscribe(createdCake => {
      console.log("onCakeSubmit createdCake:***", createdCake);
    })
    this.getCakesFromService();
  }   

  onViewCakes() {
    if(this.wasViewHit) {
      this.wasViewHit = false;
    } else {
      this.wasViewHit = true;
    }
  }

  selectCake(cake) {
    this.selectedCake = cake;
    let sum = 0;
    this.selectedCake.rating.forEach(element => {
      sum += element.rating;
    })
    this.selectedCake['avg'] = (sum / this.selectedCake.rating.length);
  }

  displayCake(cake) {
    this.display = true;
    this.displayedCake = cake;
  }

  onRateForm(event: Event, rateForm: NgForm, cakeId: string) {
    event.preventDefault();
    this.newRate = rateForm.value;
    console.log("DO YOU WANT TO BE postRating() t his?***>>>", this.newRate);
    let obs = this._httpService.postRating(cakeId, this.newRate);
    obs.subscribe(postedRating => {
      console.log("postedRating*****", postedRating);
    })
    this.getCakesFromService();
  }

  displayAvg(avg: number) {
    if(avg) {
      return true;
    } else {
      return false;
    }
  }
}