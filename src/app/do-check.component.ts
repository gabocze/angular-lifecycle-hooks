import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input } from '@angular/core';

import { Hero } from './hero';

@Component({
  selector: 'do-check',
  template: `
  <div class="info">
    <h4>Exploring how \`detectionStrategy: OnPush\` does away with the view rendering of log changes over \`Hero.name\` change detection.
      <br/>The opposite is true also: \`detectionStrategy: Default\` brings log changes coming from \`Hero.name\`'s detection changes into sync with view.
      <br />You might ask why the first behaviour. Well, DoCheck is meant to capture events that otherwise Angular can't. That's why DoCheck gets triggered
      if the parent component's \`Hero.name\` input changes even if this component's \`hero\` instance reference doesn't change thru time. That latter is what
      change detection takes as input in order not to update this component's view in spite of log changes. Spotlight: this is how it works in production mode.
    </h4>

    <p>{{hero.name}} can {{power}}</p>

    <h3>Change Log</h3>
    <div *ngFor="let chg of changeLog" class="log">{{chg}}</div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoCheckComponent implements DoCheck {
  @Input() hero!: Hero;
  @Input() power = '';

  changeDetected = false;
  changeLog: string[] = [];
  oldHeroName = '';
  oldPower = '';
  noChangeCount = 0;
constructor(private cd:ChangeDetectorRef){}
  ngDoCheck() {

    if (this.hero.name !== this.oldHeroName) {
      this.changeDetected = true;
      this.changeLog.push(`DoCheck: Hero name changed to "${this.hero.name}" from "${this.oldHeroName}"`);
      //alert(`DoCheck: Hero name changed to "${this.hero.name}" from "${this.oldHeroName}"`);
      this.oldHeroName = this.hero.name;
    }

    if (this.power !== this.oldPower) {
      this.changeDetected = true;
      this.changeLog.push(`DoCheck: Power changed to "${this.power}" from "${this.oldPower}"`);
      this.oldPower = this.power;
    }

    if (this.changeDetected) {
      //this.cd.detectChanges();
      this.noChangeCount = 0;
    } else {
        // log that hook was called when there was no relevant change.
        const count = this.noChangeCount += 1;
        const noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
        if (count === 1) {
          // add new "no change" message
          this.changeLog.push(noChangeMsg);
        } else {
          // update last "no change" message
          this.changeLog[this.changeLog.length - 1] = noChangeMsg;
        }
    }

    this.changeDetected = false;
  }

  reset() {
    //this.changeDetected = true;
    this.changeLog = [];
  }
}
