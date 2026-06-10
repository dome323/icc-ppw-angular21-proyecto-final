import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective {
  @HostBinding('style.transform') transform = 'perspective(1200px)';
  @HostBinding('style.transition') transition = 'transform 220ms ease-out, box-shadow 220ms ease-out';
  @HostBinding('style.transformStyle') transformStyle = 'preserve-3d';
  @HostBinding('style.willChange') willChange = 'transform';

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;
    const rotateY = ((x - halfWidth) / halfWidth) * 12;
    const rotateX = -((y - halfHeight) / halfHeight) * 12;

    this.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }
}
