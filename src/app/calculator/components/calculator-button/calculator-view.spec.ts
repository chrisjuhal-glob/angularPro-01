import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButton } from './calculator-button';
import { vi } from 'vitest';
import { Component } from '@angular/core';

@Component({
  imports: [CalculatorButton],
  template: `
    <calculator-button>
      <span class="content-projection"> 7 </span>
    </calculator-button>
  `,
})
class TestComponent {}

describe('CalculatorButton', () => {
  let component: CalculatorButton;
  let fixture: ComponentFixture<CalculatorButton>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorButton],
    });

    fixture = TestBed.createComponent(CalculatorButton);
    component = fixture.componentInstance;
    fixture.detectChanges(); // si tiene inputs va a inicializar valores default
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 double size is false', () => {
    const htmlElement = fixture.nativeElement as HTMLElement;
    const hostCss = htmlElement.classList.value;
    expect(hostCss).toContain('w-1/4');
  });

  it('should apply w-2/4 double size is true', () => {
    fixture.componentRef.setInput('isDouble', true);
    fixture.detectChanges();
    const htmlElement = fixture.nativeElement as HTMLElement;
    const hostCss = htmlElement.classList.value;
    expect(hostCss).toContain('w-2/4');
  });

  it('should apply is-command class when isCommand is true', () => {
    fixture.componentRef.setInput('isCommand', true);
    fixture.detectChanges();
    const htmlElement = fixture.nativeElement as HTMLElement;
    const buttonElement = htmlElement?.querySelector('button');
    const hostCss = buttonElement?.classList.value;
    expect(hostCss).toContain('bg-indigo-700 bg-opacity-20');
  });

  it('should emit onClick when handleClick is called', () => {
    const spy = vi.spyOn(component.onClick, 'emit');
    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.innerText = '5';
    component.handlerClick();
    expect(spy).toHaveBeenCalledWith('5');
  });

  it('should set isPressed to true and then false when keyboardPressedStyle is called with matching key', async (done) => {
    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.innerText = '5';
    component.handlerKeyboardStyle('5');
    expect(component.isPressed()).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 301));
    expect(component.isPressed()).toBe(false);
  });

  it('should NOT set isPressed if key does not match', () => {
    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.innerText = '5';
    component.handlerKeyboardStyle('8');
    expect(component.isPressed()).toBe(false);
  });

  it('should display projected content', () => {
    const testFixture = TestBed.createComponent(TestComponent);
    testFixture.detectChanges();
    const htmlElement = testFixture.nativeElement as HTMLElement;
    const content = htmlElement.querySelector('.content-projection')?.textContent?.trim();
    expect(content).toBe('7');
  });
});
