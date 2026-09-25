import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnDestroy,
} from '@angular/core';
import { Project } from '../data/projects';
@Component({
  selector: 'app-project-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './project-card.component.html',
  styles: ':host { display: block; }',
})
export class ProjectCardComponent implements OnDestroy {
  readonly project = input.required<Project>();
  private animation?: Animation;
  private expanded = false;
  private hoverTimer?: ReturnType<typeof setTimeout>;

  onHover(event: PointerEvent, details: HTMLDetailsElement): void {
    if (event.pointerType === 'mouse' && matchMedia('(hover: hover)').matches) {
      this.cancelHover();
      if (!this.expanded) {
        this.hoverTimer = setTimeout(() => {
          this.hoverTimer = undefined;
          this.setExpanded(details, true);
        }, 400);
      }
    }
  }

  cancelHover(): void {
    clearTimeout(this.hoverTimer);
    this.hoverTimer = undefined;
  }

  onLeave(event: PointerEvent, details: HTMLDetailsElement): void {
    this.cancelHover();
    if (
      event.pointerType === 'mouse' &&
      !details.contains(document.activeElement)
    ) {
      this.setExpanded(details, false);
    }
  }

  onFocusOut(event: FocusEvent, details: HTMLDetailsElement): void {
    if (
      !details.contains(event.relatedTarget as Node | null) &&
      !details.matches(':hover')
    ) {
      this.setExpanded(details, false);
    }
  }

  toggle(event: Event, details: HTMLDetailsElement): void {
    event.preventDefault();
    this.cancelHover();
    this.setExpanded(details, !this.expanded);
  }

  private setExpanded(details: HTMLDetailsElement, expanded: boolean): void {
    if (this.expanded === expanded) return;
    this.expanded = expanded;
    const startHeight = details.getBoundingClientRect().height;
    this.animation?.cancel();
    details.open = true;
    const endHeight = expanded
      ? details.getBoundingClientRect().height
      : details.querySelector('summary')!.getBoundingClientRect().height +
        parseFloat(getComputedStyle(details).borderTopWidth);

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      details.open = expanded;
      return;
    }

    const animation = details.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      { duration: 240, easing: 'ease-in-out' },
    );
    this.animation = animation;
    animation.onfinish = () => {
      details.open = expanded;
      this.animation = undefined;
    };
  }

  ngOnDestroy(): void {
    this.cancelHover();
    this.animation?.cancel();
  }
}
