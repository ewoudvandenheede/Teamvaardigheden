import { Component, OnDestroy, signal } from '@angular/core';

interface Activity {
  title: string;
  description: string;
  stepDuration: number;
  steps: string[];
}

@Component({
  selector: 'app-pause-page',
  templateUrl: './pause-page.html',
  styleUrl: './pause-page.css',
})
export class PausePage implements OnDestroy {
  readonly activities: Activity[] = [
    {
      title: 'Ademhalingsoefening',
      description:
        'Adem rustig vier seconden in en vier seconden uit. Volg twee ademrondes.',
      stepDuration: 4,
      steps: [
        'Adem rustig in door je neus.',
        'Adem langzaam uit door je mond.',
        'Adem opnieuw rustig in.',
        'Adem langzaam uit en ontspan je schouders.',
      ],
    },
    {
      title: 'Even bewegen',
      description:
        'Kom los van je bureau met drie rustige bewegingen van tien seconden.',
      stepDuration: 10,
      steps: [
        'Sta op en stap rustig op je plaats.',
        'Rol je schouders langzaam naar achteren.',
        'Schud je handen en benen ontspannen los.',
      ],
    },
    {
      title: 'Zintuigenpauze',
      description:
        'Verleg je aandacht naar je omgeving. Kijk, luister en voel.',
      stepDuration: 15,
      steps: [
        'Kijk om je heen en zoek vijf dingen die je ziet.',
        'Luister aandachtig naar drie geluiden.',
        'Voel je voeten op de grond en ontspan je schouders.',
      ],
    },
  ];

  readonly selectedActivity = signal<Activity | null>(null);
  readonly remainingSeconds = signal(0);
  readonly currentStep = signal(0);

  private timer?: ReturnType<typeof setInterval>;

  startActivity(activity: Activity): void {
    // Stop een vorige activiteit voordat de nieuwe begint.
    this.clearTimer();

    this.selectedActivity.set(activity);
    this.currentStep.set(0);

    const duration = activity.steps.length * activity.stepDuration;
    this.remainingSeconds.set(duration);

    const endTime = Date.now() + duration * 1000;

    this.timer = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((endTime - Date.now()) / 1000),
      );

      this.remainingSeconds.set(remaining);

      const elapsed = duration - remaining;
      const step = Math.floor(elapsed / activity.stepDuration);

      this.currentStep.set(
        Math.min(step, activity.steps.length - 1),
      );

      if (remaining === 0) {
        this.clearTimer();
      }
    }, 250);
  }

  stopActivity(): void {
    this.clearTimer();
    this.selectedActivity.set(null);
    this.remainingSeconds.set(0);
    this.currentStep.set(0);
  }

  private clearTimer(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  ngOnDestroy(): void {
    // Voorkom dat de timer blijft lopen na het verlaten van de pagina.
    this.clearTimer();
  }
}