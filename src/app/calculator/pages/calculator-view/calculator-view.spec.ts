import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorView from './calculator-view';
import { Component } from '@angular/core';
describe('calculator-view', () => {
  let component: CalculatorView;
  let fixture: ComponentFixture<CalculatorView>;

  @Component({
    selector: 'calculator-view',
    template: `<div>Mock calculator view</div>`,
  })
  class MockCalculatorView {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorView],
    }).overrideComponent(CalculatorView, {
      set: {
        imports: [MockCalculatorView],
        template: `<div>Mock calculator view</div>`,
      },
    });

    fixture = TestBed.createComponent(CalculatorView);
    component = fixture.componentInstance;
    fixture.detectChanges(); // si tiene inputs va a inicializar valores default
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should create an instance', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.textContent).toContain('Mock calculator view');
  });
});
