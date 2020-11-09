import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

	url = ""; //API url
  
  	constructor(private http: HttpClient) {}

  	getData() {
  		return this.http.get<any>(this.url);
  	}

  	saveData(data) {

  		const options = {
  			headers: new HttpHeaders({
  				'Content-Type': 'application/json'
  			})
  		}
  		
  		return this.http.post(this.url, data, options);
  	}

    login(data) {
      
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      
      return this.http.post(this.url, data, options);
    }
}