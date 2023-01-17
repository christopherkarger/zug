export interface Ijourney {
  ti: string; // Abfahrtszeit "08:04"
  da: string; // Datum "01.02.2020"
  lastStop: string; // Endstation "Wien Hbf"
  tr: string; // Bahnsteig "2"
  rt?: { dlt?: string }; // Verzögerung "dlt:11:01"
  pr?: string;
}

export interface IMonitor {
  fromStationName: string;
  toStationName: string;
  boardType: string; // Ankunft oder Abfahrt "dep"
  journey: Ijourney[]; // Einzelne Zeiten
}

export interface IMonitorLoad {
  loading?: boolean;
  failed?: boolean;
  entity?: IMonitor;
}
