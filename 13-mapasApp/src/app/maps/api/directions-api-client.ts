import { HttpClient, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class DirectionsApiClient extends HttpClient {
  
    private mapboxBaseUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving';
  
    constructor(handler: HttpHandler) {
        super(handler);
    }

    public override get<T>(url: string) { 

        url = this.mapboxBaseUrl + url;

        return super.get<T>(url, {
            params: {
                alternatives: false,
                geometries: 'geojson',
                overview: 'simplified',
                steps: false,
                language: 'es',
                access_token: environment.mapbox_key,
            }
        });
    }
}