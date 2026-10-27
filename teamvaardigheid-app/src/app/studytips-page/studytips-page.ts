import {ChangeDetectionStrategy, Component, signal  } from '@angular/core';

type Categorie = 'Plannen' | 'Studeren' | 'Concentratie' | 'Welzijn';

interface StudieTip {
  id: number;
  categorie: Categorie;
  tip: string; // één zin
  uitleg: string; // beschrijving die uitklapt
}

const CATEGORIEEN: Categorie[] = ['Plannen', 'Studeren', 'Concentratie', 'Welzijn'];
 
const TIPS: StudieTip[] = [
  {
    id: 1,
    categorie: 'Plannen',
    tip: 'Maak een weekplanning met vaste studieblokken.',
    uitleg: 'Zet je studiemomenten in je agenda, net als lessen. Zo wordt studeren een gewoonte in plaats van iets wat je "nog even" uitstelt.',
  },
  {
    id: 2,
    categorie: 'Plannen',
    tip: 'Werk terug vanaf je deadline.',
    uitleg: 'Bepaal wanneer je klaar wilt zijn en verdeel de leerstof over de beschikbare dagen. Zo voorkom je een stressvolle laatste week.',
  },
  {
    id: 3,
    categorie: 'Plannen',
    tip: 'Begin met het moeilijkste onderwerp.',
    uitleg: 'Plan lastige onderwerpen als je energie hoog is, bijvoorbeeld in de ochtend. Makkelijkere taken kun je later op de dag doen.',
  },
  {
    id: 4,
    categorie: 'Studeren',
    tip: 'Test jezelf in plaats van alleen herlezen.',
    uitleg: 'Overhoor jezelf met flashcards of oefenvragen. Actief ophalen wat je weet, helpt veel beter om het te onthouden.',
  },
  {
    id: 5,
    categorie: 'Studeren',
    tip: 'Spreid je leermomenten over meerdere dagen.',
    uitleg: 'Herhaal de stof verspreid in plaats van alles in één keer te proppen. Dat zorgt voor beter onthouden op de lange termijn.',
  },
  {
    id: 6,
    categorie: 'Studeren',
    tip: 'Leg de stof uit in je eigen woorden.',
    uitleg: 'Kun je een onderwerp uitleggen aan iemand anders? Dan snap je het echt. Zo ontdek je ook meteen waar je nog gaten hebt.',
  },
  {
    id: 7,
    categorie: 'Concentratie',
    tip: 'Werk in blokken van 25 minuten met korte pauzes.',
    uitleg: 'Dit is de pomodoro-techniek: 25 minuten geconcentreerd werken, dan 5 minuten pauze. Na vier rondes neem je een langere pauze.',
  },
  {
    id: 8,
    categorie: 'Concentratie',
    tip: 'Leg je telefoon buiten handbereik.',
    uitleg: 'Zet meldingen uit en leg je telefoon weg. Zelfs een telefoon die alleen op tafel ligt kan je afleiden.',
  },
  {
    id: 9,
    categorie: 'Welzijn',
    tip: 'Slaap voldoende, ook in de tentamenperiode.',
    uitleg: 'Tijdens je slaap verwerkt je brein wat je geleerd hebt. Een nachtje doorhalen kost je meer dan het oplevert.',
  },
  {
    id: 10,
    categorie: 'Welzijn',
    tip: 'Plan ook ontspanning in je week.',
    uitleg: 'Beweging, vrienden en vrije tijd houden je gemotiveerd. Zet ze net zo vast in je planning als je studieblokken.',
  },
];








@Component({
  imports: [],
  selector: 'app-studytips-page',
  styleUrl: './studytips-page.css',
  templateUrl: './studytips-page.html',
})
export class StudyTips {
  // Tips gegroepeerd per categorie
  readonly gegroepeerd = CATEGORIEEN.map((categorie) => ({
    categorie,
    tips: TIPS.filter((t) => t.categorie === categorie),
  }));
 
  // Welke tips zijn uitgeklapt (meerdere tegelijk mogelijk)
  private readonly open = signal<ReadonlySet<number>>(new Set());
 
  isOpen(id: number): boolean {
    return this.open().has(id);
  }
 
  toggle(id: number): void {
    this.open.update((huidig) => {
      const nieuw = new Set(huidig);
      nieuw.has(id) ? nieuw.delete(id) : nieuw.add(id);
      return nieuw;
    });
  }
}
