import { Regions } from "../types/regions.types";
import { Country } from "./country.interface";

export interface cacheStorage {
    byCapital: cacheData;
    byCountry: cacheData;
    byRegion : cacheRegionData;
}

export interface cacheData {
    term     : string;
    countries: Country[];
}

export interface cacheRegionData {  
    region?    : Regions;
    countries  : Country[];
}