import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PausePage } from './pause-page';

describe('PausePage', () => {
  let component: PausePage;
  let fixture: ComponentFixture<PausePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PausePage],
    }).compileComponents();

    fixture = TestBed.createComponent(PausePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
