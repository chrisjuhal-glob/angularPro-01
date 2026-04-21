import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  /*   beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  }); */

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router-outlet with css class', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const divElement = compiled.querySelector('div');
    const mostHaveClasses =
      'min-w-screen min-h-screen bg-slate-700 flex items-center justify-center px-5 py-5'.split(
        ' ',
      );
    divElement?.classList.forEach((cls) => {
      expect(mostHaveClasses).toContain(cls);
    });
  });

  it('should render buy me a beer link', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const linkElement = compiled.querySelector('a');
    const title = linkElement?.getAttribute('title');
    const href = linkElement?.getAttribute('href');
    const target = linkElement?.getAttribute('target');

    expect(title).toBe('Buy me a beer');
    expect(href).toBe('https://www.buymeacoffee.com/globant');
    expect(target).toBe('_blank');
  });
});
