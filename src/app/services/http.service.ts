import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, requestOptions?: object): Observable<T> {
    return this.http.get<T>(url, requestOptions);
  }
}
