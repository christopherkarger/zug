import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cleanStationName",
})
export class CleanStationNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let convertedStr = value;
    try {
      convertedStr = convertedStr
        .replace(/Bahnhst/g, "")
        .replace(/&#38;/g, "&")
        .replace(/&#223;/g, "ß")
        .replace(/&#196;/g, "Ä")
        .replace(/&#228;/g, "ä")
        .replace(/&#214;/g, "Ö")
        .replace(/&#246;/g, "ö")
        .replace(/&#220;/g, "Ü")
        .replace(/&#252;/g, "ü");
    } catch {
      console.error("Browser does not support replaceAll");
    }

    return convertedStr;
  }
}
