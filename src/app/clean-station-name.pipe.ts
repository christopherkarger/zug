import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cleanStationName"
})
export class CleanStationNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let convertedStr = value;
    convertedStr = convertedStr
      .replace("Bahnhst", "")
      .replace("&#38;", "&")
      .replace("&#223;", "ß")
      .replace("&#196;", "Ä")
      .replace("&#228;", "ä")
      .replace("&#214;", "Ö")
      .replace("&#246;", "ö");
    return convertedStr;
  }
}
