import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCustom',
})
export class CurrencyPipe implements PipeTransform {
  transform(
    value: number,
    currencySymbol: string = 'USD',
    decimalLength: number = 2,
    chunkDelimiter: string = ',',
    decimalDelimiter: string = '.',
    chunkLength: number = 3
  ): string {
    if (value == null) return null;
    if (value === 0) return '0';

    let valueString = value.toFixed(Math.max(0, ~~decimalLength));
    const [integer, fraction = ''] = valueString.split('.');

    const integerPartWithDelimiters = integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      chunkDelimiter
    );
    const fractionPart = fraction ? decimalDelimiter + fraction : '';

    return `${integerPartWithDelimiters}${fractionPart} ${currencySymbol}`;
  }
}
