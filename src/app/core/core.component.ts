import { Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatMenuTrigger } from '@angular/material/menu';

let positionX: string;
let positionY: string; 
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.sass'],
})
export class CoreComponent implements OnInit {

  designIsOpen = false;
  shouldOpen!: boolean;
  menuPosition = { x: '0', y: '0' };
  pos =  { x: 0, y: 0 };

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;

  constructor() {
  }

  //Core Data
  @Input()
  coreData: any = {}; 

  @Output()
  coreMoved = new EventEmitter();

  ngOnInit(): void {
    this.pos.x = this.coreData.position[0];
    this.pos.y = this.coreData.position[1];
    positionX = this.coreData.position[0] + "px";
    positionY = this.coreData.position[1] + "px";
    this.menuPosition.x = this.coreData.position[0] + "px";
    this.menuPosition.y = (this.coreData.position[1] - 170) + "px";
    this.shouldOpen = true;
  }

  //Position Dynamcs
  initialPos() { 
    return {
      'top': positionY,
      'left': positionX
    }
  }


  public onDrop(event: CdkDragEnd): void {
    const dropPoint = event.source.getFreeDragPosition()
    this.coreData.position = [dropPoint.x, dropPoint.y]
    this.coreMoved.emit([dropPoint.x, dropPoint.y]);
    this.menuPosition.x = (dropPoint.x + this.pos.x) + 'px';
    this.menuPosition.y = (dropPoint.y + this.pos.y - 170) + 'px';
    console.log("the positions changed to: " + dropPoint.x + " and " + dropPoint.y);
  }

  //menu button interaction dynamics
  private isHeld = false;
  private activeHoldTimeoutId: any;

  onHoldStart() {
    this.isHeld = true;

    this.activeHoldTimeoutId = setTimeout(() => { 
      if (this.isHeld) {
        this.shouldOpen = false;
        console.log("more than 1 second has passed, it should not open");
      }
    }, 500);
  }

  onHoldEnd(event: MouseEvent) {
    event.preventDefault();

    if (this.shouldOpen === true) { 
      this.trigger.openMenu();
      console.log("it should have opened");
    } else {
      console.log("it should not have opened");
    }

    
    this.isHeld = false;
    this.shouldOpen = true;
    clearTimeout(this.activeHoldTimeoutId);
  }






 


}
