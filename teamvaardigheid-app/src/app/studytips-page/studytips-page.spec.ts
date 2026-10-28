import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudyTips } from './studytips-page';

describe('StudyTips', () => {
  let component: StudyTips;
  let fixture: ComponentFixture<StudyTips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyTips],
    }).compileComponents();

    fixture = TestBed.createComponent(StudyTips);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
