import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class safeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you realy want to leave the app?');
    if (wantsToLeave) {
      const adress = this.hostElementRef.nativeElement.href;
      (event.target as HTMLAnchorElement).href =
        adress + '?from=' + this.queryParam();
      return;
    }
    event.preventDefault();
  }
}
