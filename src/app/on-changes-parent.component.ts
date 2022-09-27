import { Component, ViewChild } from '@angular/core';

import { Hero } from './hero';
import { OnChangesComponent } from './on-changes.component';

@Component({
  selector: 'on-changes-parent',
  templateUrl: './on-changes-parent.component.html',
  styles: ['']
})
export class OnChangesParentComponent {
  hero!: Hero;
  power = '';
  title = 'OnChanges';
  @ViewChild(OnChangesComponent) childView!: OnChangesComponent;

  constructor() {
    this.reset();
  }

  reset() {
    // new Hero object every time; triggers onChanges
    this.hero = new Hero('Windstorm');
    // Setting power only triggers onChanges if this value is different
    // between 2 times at when the Component gives away the control
    // to Angular (change detection).
    this.power = 'sing';
    this.power = 'swim';
    if (this.childView) {
      this.childView.reset();
    }
  }
}
