import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cleanStationName",
})
export class CleanStationNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let convertedStr = value;
    convertedStr = convertedStr
      .replaceAll("Bahnhst", "")
      .replaceAll("&#38;", "&")
      .replaceAll("&#223;", "ß")
      .replaceAll("&#196;", "Ä")
      .replaceAll("&#228;", "ä")
      .replaceAll("&#214;", "Ö")
      .replaceAll("&#246;", "ö")
      .replaceAll("&#220;", "Ü")
      .replaceAll("&#252;", "ü");

    return convertedStr;
  }
}
