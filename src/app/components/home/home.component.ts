import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

declare var $: any; // JQuery

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	apiResponse: any;
  expectation = '';
  requirements = '';
  outcome = '';
  go = '';
  scenario = '';
  criteria = '';

  model1: any;
  model2: any;
  model3: any;
  
  	constructor(private apiService: ApiService) {}

  	ngOnInit() {
  		// this.getData(); Uncomment if API url is set on the service file
      this.model1 = localStorage.getItem("model1");
      this.model2 = localStorage.getItem("model2");
      this.model3 = localStorage.getItem("model3");
  	}

  	selectModel(event) {
  		$(document).ready(() => {

        //Remove color from all the model buttons
        $(".btn-model").each(function() {
          $(this).removeClass("selected");
        });

        //Unckeck all the box
        $(".checkbox").each(function() {
          $(this).prop("checked", false);
        });

        //Add color and check current box and button
        $(event.target).siblings(".btn").addClass("selected");
        $(event.target).prop("checked", true);

        let model = $(event.target).attr("data-model");
        let count;

        switch (model) {
          case "model1":
            this.model1 = this.incrementModelClick(model);
            break;
          
          case "model2":
            this.model2 = this.incrementModelClick(model);
            break;

          case "model3":
            this.model3 = this.incrementModelClick(model);
            break;
        }
      });
  	}

  	getData() {
  		this.apiService.getData().subscribe(response => {
  			this.apiResponse = response;
  			//logic
  		})
  	}

    incrementModelClick(model) {
      let count = 1;
      if (localStorage.getItem(model) == null) {
          localStorage.setItem(model, count.toString());
       }
      else {
        count = parseInt(localStorage.getItem(model));
        count = count + 1;
        localStorage.setItem(model, count.toString());
      }
      return count;
    }
}