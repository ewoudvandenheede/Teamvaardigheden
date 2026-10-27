import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudytipsPage } from './studytips-page';

describe('StudytipsPage', () => {
  let component: StudytipsPage;
  let fixture: ComponentFixture<StudytipsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudytipsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(StudytipsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
