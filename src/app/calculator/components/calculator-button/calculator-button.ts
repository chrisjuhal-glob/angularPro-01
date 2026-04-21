import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'calculator-button',
  imports: [CommonModule],
  template: ` <button
    #button
    (click)="handlerClick()"
    class="w-full h-16 outline-none focus:outline-none hover:bg-indigo-700 hover:bg-opacity-20 text-white text-opacity-50 text-xl font-light"
    [ngClass]="{
      'bg-indigo-700 bg-opacity-20': isCommand(),
      'bg-indigo-800 bg-opacity-20': isPressed(),
    }"
  >
    <ng-content />
  </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDouble()',
    '[class.w-1/4]': '!isDouble()',
  },
})
export class CalculatorButton {
  public isDouble = input(false);
  public isPressed = signal(false);
  public onClick = output<string>();
  contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public isCommand = input(false, {
    transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
  });

  handlerClick() {
    if (!this.contentValue()?.nativeElement) {
      return;
    }
    const value = this.contentValue()!.nativeElement.innerText?.trim() || '';
    this.onClick.emit(value);
  }

  handlerKeyboardStyle(event: string) {
    if (!this.contentValue()?.nativeElement) {
      return;
    }
    const value = this.contentValue()!.nativeElement.innerText?.trim() || '';
    if (event !== value) return;
    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 300);
  }
}
