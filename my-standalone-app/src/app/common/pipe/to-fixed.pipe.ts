import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let x : number = Number(value);
    let nbDigits = Number(args[0]);
    return x.toFixed(nbDigits);
  }

}
