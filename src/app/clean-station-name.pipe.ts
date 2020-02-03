import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cleanStationName"
})
export class CleanStationNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let convertedStr = value;
    convertedStr = convertedStr.replace("Wien", "").replace("Bahnhst", "");
    return convertedStr;
  }
}
