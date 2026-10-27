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
        'Neem twee minuten rust. Adem vier seconden in en vier seconden uit, gedurende vijftien ademrondes.',
      stepDuration: 4,
      steps: Array.from({ length: 30 }, (_, index) =>
        index % 2 === 0
          ? 'Adem rustig in door je neus. Forceer niets.'
          : 'Adem rustig uit en ontspan je schouders.',
      ),
    },
    {
      title: 'Even bewegen',
      description:
        'Kom drie minuten los van je bureau. Wissel elke dertig seconden van beweging en beweeg binnen je eigen grenzen.',
      stepDuration: 30,
      steps: [
        'Sta rustig op en stap op je plaats.',
        'Rol je schouders langzaam naar achteren.',
        'Maak rustige cirkels met je polsen en open en sluit je handen.',
        'Strek je armen voorzichtig omhoog en laat ze weer zakken.',
        'Wandel even rustig door de kamer.',
        'Schud je armen en benen los en kom rustig tot stilstand.',
      ],
    },
    {
      title: 'Zintuigenpauze',
      description:
        'Neem vijf minuten afstand van je studie. Besteed telkens één minuut aandacht aan je omgeving en jezelf.',
      stepDuration: 60,
      steps: [
        'Kijk weg van je scherm. Zoek vijf dingen om je heen en bekijk hun kleuren en vormen.',
        'Luister naar de geluiden in je omgeving. Welke klinken dichtbij en welke verder weg?',
        'Voel je voeten op de grond en je lichaam op de stoel. Laat je schouders zakken.',
        'Merk op hoe je vanzelf ademhaalt. Je hoeft je ademhaling niet te veranderen.',
        'Kijk rustig om je heen en rek je zachtjes uit. Neem je tijd om weer verder te gaan.',
      ],
    },
    {
      title: 'Workout',
      description:
        'Een workout van twintig minuten: twee rondes met tien oefeningen. ' +
        'Wissel telkens dertig seconden bewegen af met dertig seconden rust. ' +
        'Beweeg op je eigen tempo en kies de lichtere variant wanneer nodig.',
      stepDuration: 30,
      steps: Array.from({ length: 2 }, (_, round) => {
        const exercises = [
          'Stap op je plaats en beweeg je armen rustig mee.',

          'Doe squats: buig rustig door je knieën en kom weer recht. ' +
          'Zak alleen zo diep als comfortabel voelt.',

          'Doe pompen tegen een muur of op je knieën. ' +
          'Kies de variant die je gecontroleerd kunt uitvoeren.',

          'Doe rustige jumping jacks. ' +
          'Lichter: stap om de beurt zijwaarts zonder te springen.',

          'Doe kleine sit-ups: lig op je rug met gebogen knieën en til ' +
          'je schouders een klein stukje op. Trek niet aan je nek.',

          'Stap afwisselend met één been naar achteren en terug. ' +
          'Buig je knieën licht als dat comfortabel voelt.',

          'Doe een plank op je knieën of tenen. ' +
          'Neem tussendoor rust zodra je houding verslapt.',

          'Doe rustige burpees: hurk, zet je handen neer, stap naar ' +
          'een plank, stap terug en sta op. Springen hoeft niet.',

          'Doe staande knieheffingen: til afwisselend je linker- en ' +
          'rechterknie op en blijf rechtop staan.',

          'Wandel rustig op je plaats en laat je ademhaling tot rust komen.',
        ];

        return exercises.flatMap((exercise, index) => [
          `Ronde ${round + 1}/2 · Oefening ${index + 1}/10: ${exercise}`,
          round === 1 && index === exercises.length - 1
            ? 'Je bent klaar! Wandel nog even rustig en ontspan.'
            : 'Rust even uit. Adem rustig en bereid je voor op de volgende oefening.',
        ]);
      }).flat(),
    },
  ];

  readonly selectedActivity = signal<Activity | null>(null);
  readonly remainingSeconds = signal(0);
  readonly currentStep = signal(0);

  private timer?: ReturnType<typeof setInterval>;

  formatDuration(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const parts: string[] = [];

    if (minutes > 0) {
      parts.push(`${minutes} ${minutes === 1 ? 'minuut' : 'minuten'}`);
    }

    if (seconds > 0 || minutes === 0) {
      parts.push(`${seconds} ${seconds === 1 ? 'seconde' : 'seconden'}`);
    }

    return parts.join(' en ');
  }

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