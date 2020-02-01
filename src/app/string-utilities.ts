export class StringUtilities {
  static replace(str: string, replaceArr: string[]) {
    let convertedStr = str;
    replaceArr.forEach((elm, i) => {
      convertedStr = convertedStr.replace("${" + i + "}", elm);
    });
    return convertedStr;
  }
}
