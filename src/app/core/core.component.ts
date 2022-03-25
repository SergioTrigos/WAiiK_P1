import { Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatMenuTrigger } from '@angular/material/menu';

let positionX: string;
let positionY: string; 
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.sass']
})
export class CoreComponent implements OnInit {

  designIsOpen = false;

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
    positionX = this.coreData.position[0] + "px";
    positionY = this.coreData.position[1] + "px";
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
  }

  //menu button interaction dynamics
  private isHeld = false ;
  private willOpen = true;
  private activeHoldTimeoutId: any;


  onHoldStart() {
    this.isHeld = true;

    this.activeHoldTimeoutId = setTimeout(() => { 
      if (this.isHeld) {
        this.willOpen = false;
        console.log("more than 1 second has passed");
      }
    }, 500);
  }

  onholdEnd() {
    if (this.willOpen == false) {
      this.trigger.toggleMenu();
    }
    this.isHeld = false;
    this.willOpen = true;
    clearTimeout(this.activeHoldTimeoutId);
  }




 


}
