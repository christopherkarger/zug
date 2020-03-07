import { Injectable } from "@angular/core";
import { stations } from "../model/stations";

export interface IStations {
  awayStationA: string;
  awayStationB: string;
  homeStationA: string;
  homeStationB: string;
}

@Injectable({
  providedIn: "root"
})
export class DirectionsCacheService {
  saveDirections(directions: [string, string, string, string]): void {
    localStorage.setItem("directions", `${[...directions]}`);
  }

  private getStoredDirections(): string[] {
    const localStore = localStorage.getItem("directions");
    if (localStore && localStore.length) {
      return localStore.split(",");
    }
    return [];
  }

  isValid(): boolean {
    if (
      this.getStoredDirections().length === 0 ||
      !this.getSavedStations(true)
    ) {
      return false;
    }

    const savedDirections = this.getStoredDirections();
    return savedDirections.length === 2 || savedDirections.length === 4;
  }

  getSavedStations(getIds?: boolean): IStations | undefined {
    let awayStationA: string,
      awayStationB: string,
      homeStationA: string,
      homeStationB: string,
      savedDirections = this.getStoredDirections();

    if (getIds) {
      savedDirections = this.getStoredStationsIds();
    }

    if (savedDirections.length === 2) {
      awayStationA = homeStationB = savedDirections[0];
      awayStationB = homeStationA = savedDirections[1];
    } else if (savedDirections.length === 4) {
      awayStationA = savedDirections[0];
      awayStationB = savedDirections[1];
      homeStationA = savedDirections[2];
      homeStationB = savedDirections[3];
    } else {
      console.error("Local storage corrupt");
      return undefined;
    }

    return {
      awayStationA,
      awayStationB,
      homeStationA,
      homeStationB
    };
  }

  getStoredStationsIds(): string[] {
    const savedDirections = this.getStoredDirections();
    const savedStations: string[] = [];
    stations.forEach(elm => {
      savedDirections.forEach((dir, index) => {
        if (elm.title === dir) {
          savedStations[index] = elm.id;
        }
      });
    });

    return savedStations;
  }

  getStationNameById(id: string): string | undefined {
    const allIds = this.getStoredStationsIds();
    let nameOfStation: string | undefined;

    stations.forEach(elm => {
      if (elm.id === id) {
        nameOfStation = elm.title;
      }
    });

    return nameOfStation;
  }
}
