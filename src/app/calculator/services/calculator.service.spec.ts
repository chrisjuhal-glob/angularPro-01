import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator';
import { vi } from 'vitest';

let service: CalculatorService;

describe('CalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
    vi.resetAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText, subResultText to "0" when C is pressed', () => {
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('*');
    service.constructNumber('C');
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');
    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
    service.constructNumber('3');
    expect(service.resultText()).toBe('123');
  });

  it('should handle operators correctly', () => {
    const operators = ['+', '-', '*', '/', '÷'];
    operators.forEach((operator) => {
      service.constructNumber('1');
      service.constructNumber(operator);
      expect(service.lastOperator()).toBe(operator);
    });
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.calculateResult();
    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('2');
    service.constructNumber('-');
    service.constructNumber('1');
    service.calculateResult();
    expect(service.resultText()).toBe('1');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('2');
    service.constructNumber('*');
    service.constructNumber('1');
    service.calculateResult();
    expect(service.resultText()).toBe('2');
  });

  it('should calculate result correctly for division', () => {
    service.constructNumber('2');
    service.constructNumber('/');
    service.constructNumber('1');
    service.calculateResult();
    expect(service.resultText()).toBe('2');
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('2');
    service.constructNumber('.');
    service.constructNumber('5');
    expect(service.resultText()).toBe('2.5');
  });

  it('should handle decimal point starting with 0', () => {
    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('5');
    expect(service.resultText()).toBe('0.5');
  });

  it('should handle sign change +/-', () => {
    service.constructNumber('1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-1');
  });

  it('should handle backspace', () => {
    service.constructNumber('123');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle backspace with negative numbers', () => {
    service.constructNumber('1');
    service.constructNumber('+/-');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle max length', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    //cargo a la calculadora con números del 0 al 9, luego intento agregar un número más y verifico que no se agregue
    for (let i = 0; i < 11; i++) {
      service.constructNumber(i.toString());
    }
    service.constructNumber('6');

    expect(service.resultText().length).toBe(10);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle invalid input', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    service.constructNumber('N');
    expect(service.resultText()).toBe('0');
    expect(consoleSpy).toHaveBeenCalledWith('Invalid input', 'N');
  });

  it('should handle negative zero input correctly', () => {
    service.constructNumber('0');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-0');
  });
});
