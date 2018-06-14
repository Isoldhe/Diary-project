import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false // Needed to make new post appear on top
})
export class ReversePipe implements PipeTransform {

  transform(value) {
    if (!value) return;
    return value.reverse();
  }
}

// Makes posts appear in reverse, so most recent posts are at the top
