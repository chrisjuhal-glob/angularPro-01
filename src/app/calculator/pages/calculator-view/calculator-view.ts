import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButton } from '@/calculator/components/calculator-button/calculator-button';
import { CalculatorService } from '@/calculator/services/calculator';

@Component({
  selector: 'calculator-view',
  imports: [CalculatorButton],
  template: `
    <div
      class="w-screen mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden"
      style="max-width: 300px"
    >
      <div class="w-full h-40 bg-gradient-to-b from-gray-800 to-gray-700 flex items-end text-right">
        <div class="w-full py-5 px-6 text-6xl text-white font-thin">
          @if (subResultText() !== '0') {
            <span class="text 4xl">{{ subResultText() }} {{ lastOperator() }}</span> <br />
          }
          {{ resultText() }}
        </div>
      </div>
      <div class="w-full bg-gradient-to-b from-indigo-400 to-indigo-500">
        <div class="flex w-full">
          <calculator-button (onClick)="handlerClick($event)"> C </calculator-button>
          <calculator-button (onClick)="handlerClick($event)"> +/- </calculator-button>
          <calculator-button (onClick)="handlerClick($event)"> % </calculator-button>
          <calculator-button (onClick)="handlerClick($event)" isCommand> ÷</calculator-button>
        </div>
        <div class="flex w-full">
          <calculator-button (onClick)="handlerClick($event)"> 7 </calculator-button>
          <calculator-button (onClick)="handlerClick($event)"> 8 </calculator-button>
          <calculator-button (onClick)="handlerClick($event)"> 9 </calculator-button>
          <calculator-button (onClick)="handlerClick($event)" isCommand> * </calculator-button>
        </div>
        <div class="flex w-full">
          <calculator-button (onClick)="handlerClick($event)"> 4 </calculator-button>
          <calculator-button (onClick)="handlerClick($event)"> 5 </calculator-button>
          <calculator-button (onClick)="handlerClick($event)"> 6 </calculator-button>
          <calculator-button (onClick)="handlerClick($event)" isCommand> - </calculator-button>
        </div>

        <div class="flex w-full">
          <calculator-button (onClick)="handlerClick($event)"> 1 </calculator-button>
          <calculator-button (onClick)="handlerClick($event)"> 2 </calculator-button>
          <calculator-button (onClick)="handlerClick($event)"> 3 </calculator-button>
          <calculator-button (onClick)="handlerClick($event)" isCommand> + </calculator-button>
        </div>

        <div class="flex w-full">
          <calculator-button (onClick)="handlerClick($event)"> 0 </calculator-button>
          <calculator-button (onClick)="handlerClick($event)"> . </calculator-button>
          <calculator-button (onClick)="handlerClick($event)" [isDouble]="true" isCommand>
            =
          </calculator-button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handlerKeyboardEvent($event)',
  },
})
export default class CalculatorView {
  private CalculatorService = inject(CalculatorService);
  public calculatorButtons = viewChildren(CalculatorButton);

  public resultText = computed(() => this.CalculatorService.resultText());
  public subResultText = computed(() => this.CalculatorService.subResultText());
  public lastOperator = computed(() => this.CalculatorService.lastOperator());

  handlerClick(event: string) {
    this.CalculatorService.constructNumber(event);
  }
  handlerKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalent: Record<string, string> = {
      Enter: '=',
      Escape: 'C',
      Backspace: 'C',
      'X': '*',
      '/': '÷',
    };

    const key = event.key;
    const keyValue = keyEquivalent[key] || key;
    this.handlerClick(keyValue);
    this.calculatorButtons().forEach((button) => {
      button.handlerKeyboardStyle(keyValue);
    });
  }
}
