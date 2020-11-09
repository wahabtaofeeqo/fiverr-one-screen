import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

declare var $: any; // JQuery

@Component({
  selector: 'app-models-form',
  templateUrl: './models-form.component.html',
  styleUrls: ['./models-form.component.css']
})
export class ModelsFormComponent implements OnInit {

  	apiResponse: any;
  	file = ''; // Name of the selected file
  	dropDown = [1, 2];
    arrays: FormArray;

    // First model
    formGroup;

  	constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {

      	this.arrays = this.fb.array(this.initialRowsAndColumn());

  		this.formGroup = this.fb.group({
        	name: ['', Validators.required],
        	desc: ['', Validators.required],
        	file: ['', Validators.required],
        	select: [''],
        	explanation: '',
        	explanation2: '',
        	data: this.arrays
  		});
  	}

  	ngOnInit() {
  		// this.getData(); Uncomment if API url is set on the service file
  	}

  	selectModel(event) {
  		$(document).ready(function() {
  			$(event.target).siblings(".btn").toggleClass("selected");
  		});
  	}

  	save(formData) {
  		if (this.formGroup.invalid) {
  			return;
  		}
  		else {
  			// this.apiService.saveData(formData).subscribe(response => {
  				// 	logic
  			// })

  			console.log(formData);
  			alert("Time to call API");
  		}
  	}

  	getData() {
  		this.apiService.getData().subscribe(response => {
  			this.apiResponse = response;
  			//logic
  		})
  	}

  	addRow(event) {
       this.formDataArray().push(this.newRow());
  	}

  	addColumn(event, i) {
  	
      //formGroup
      let formGroup = this.formDataArray().at(i) as FormGroup;
      
      // number of cols currently
      let TDs = $(event.target).parent().siblings('td');

      const element = `<td> <input type='text' class='col data-col' formControlName="${TDs.length + 1}" /></td>`;

      //addColumn
      formGroup.addControl("col" + (TDs.length), new FormControl(''));
      
  		$(document).ready(function() {
  			$(event.target).parents('tr').prepend(element);
  		})
  	}

  	removeColumn(event, i) {
  		$(document).ready(() => {
  			$(event.target).parent().prev().remove();

	        //formGroup
	        let formGroup = this.formDataArray().at(i) as FormGroup;
	      
	        //columns
	        let TDs = $(event.target).parent().siblings('td');

	        //Column to remove
	        let colName = "col" + (TDs.length - 1);
	        formGroup.removeControl(colName);

	        console.log(TDs);
	        
	        //Remove the row if columns == 0
	        if (TDs.length == 0) {
	          	$(event.target).parents('tr').remove();
	          	this.formDataArray().removeAt(i);
	        }
  		})
  	}

    fileUpload(files) {
      this.file = files[0].name;
    }

    formDataArray(): FormArray {
      return this.formGroup.get('data') as FormArray;
    }


    newRow(): FormGroup {
      return this.fb.group({
        col0: '',
        col1: '',
        col2: ''
      });
    }

    initialRowsAndColumn() {
      return [
        this.fb.group({
          col0: '',
          col1: '',
          col2: ''
        }),

        this.fb.group({
          col0: '',
          col1: '',
          col2: ''
        })
      ];
    }

    closePage() {
      if (confirm("Close this page?")) {
      	localStorage.removeItem("token");
        this.router.navigate(['/login'])
      }
    }
}
