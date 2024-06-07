import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'https://www.melivecode.com/api';

    constructor(
        private http: HttpClient,
    ) { }

    getUser() {
        return this.http.get(`${this.baseUrl}/users`)
    }
    getUserById(id:number) {
        return this.http.get(`${this.baseUrl}/users/${id}`)
    }
    create(_JSON:any ) {
        return this.http.post(`${this.baseUrl}/users/create`,_JSON)
    }
    update(_JSON:any ) {
        return this.http.put(`${this.baseUrl}/users/update`,_JSON)
    }
    deleteUser(_JSON:any ) {
        return this.http.delete(`${this.baseUrl}/users/delete`,_JSON)
    }
}
