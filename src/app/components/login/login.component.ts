import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	loginFG;

  	constructor(private builder: FormBuilder, private service: ApiService, private router: Router) {
  		this.loginFG = this.builder.group({
  			username: ['', Validators.required],
  			password: ['', Validators.required]
  		})
  	}

  	ngOnInit(): void {}

  	login(data) {

  		if (this.loginFG.invalid) {
  			return;
  		}
  		else {
  			// this.service.login(data).subscribe(response => {
	  		// 	//logic
	  		// })

        localStorage.setItem("token", "234");
        this.router.navigate(['/']);
  		}
  	}

}
