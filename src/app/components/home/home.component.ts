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
  
  	constructor(private apiService: ApiService) {}

  	ngOnInit() {
  		// this.getData(); Uncomment if API url is set on the service file
  	}

  	selectModel(event) {
  		$(document).ready(function() {

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
  		});
  	}

  	getData() {
  		this.apiService.getData().subscribe(response => {
  			this.apiResponse = response;
  			//logic
  		})
  	}
}