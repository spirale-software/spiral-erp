import { Directive, OnInit, ElementRef, Renderer, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Directive({
  selector: '[erpActiveMenu]'
})
export class ActiveMenuDirective implements OnInit {
  @Input() erpActiveMenu?: string;

  constructor(private el: ElementRef, private renderer: Renderer, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateActiveFlag(event.lang);
    });
    this.updateActiveFlag(this.translateService.currentLang);
  }

  updateActiveFlag(selectedLanguage: string): void {
    if (this.erpActiveMenu === selectedLanguage) {
      this.renderer.setElementClass(this.el.nativeElement, 'active', true);
    } else {
      this.renderer.setElementClass(this.el.nativeElement, 'active', false);
    }
  }
}
