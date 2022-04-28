import { Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTabChangeEvent } from '@angular/material/tabs';

//let positionX: string;
//let positionY: string; 
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.sass'],
})
export class CoreComponent implements OnInit {

  positionX!: string;
  positionY!: string; 

  designIsOpen = false;
  desLinePos = { x1: 0, y1: 0, x2: 0, y2: 0 }
  desLineRef = {x2: 0, y2: 0}
  designLineVis = 'hidden';
  shouldOpen!: boolean;
  menuPosition = { x: '0', y: '0' };
  pos = { x: 0, y: 0 };
  shellShape!: string;
  shellSize!: [number, number];
  datumType!: string;
  textX!: number;
  textY!: number;
  componentPolygonPointsData = [0,100, 50,25, 50,75, 100,0];
  pointsP!: number[];
  pointsPX = [0];
  pointsPtext!: string;
  pointsPXtext!: string;

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;

  constructor() {
  }

  //Core Data
  @Input()
  coreData: any = {}; 

  @Output()
  coreMoved = new EventEmitter();

  polygonDefOne() {
    for (let index of this.pointsP.keys()) {
      this.pointsPX[index] = (this.pointsP[index] / 1.25);
    };
  }

  polygonDefTwo() {
    for (let i = 0; i <= this.pointsPX.length; i = i + 2) { 
      if (i == 0) {
        this.pointsPtext = this.pointsP[i].toString() + ',' + this.pointsP[i + 1].toString() + ' ';
      } else {
        this.pointsPtext = this.pointsPtext + this.pointsP[i].toString() + ',' + this.pointsP[i + 1].toString() + ' ';
      }
    };
  }

  polygonDefThree() {
    return { 'points' : this.pointsPtext }
  }

  ngOnInit(): void {
    this.pos.x = this.coreData.position[0];
    this.pos.y = this.coreData.position[1];
    this.positionX = this.coreData.position[0] + "px";
    this.positionY = this.coreData.position[1] + "px";
    this.menuPosition.y = (this.coreData.position[1] - 170) + "px";
    this.desLinePos.x1 = this.pos.x;
    this.desLinePos.y1 = this.pos.y - 50;
    this.desLinePos.x2 = this.pos.x;
    this.desLinePos.y2 = this.pos.y;
    this.desLineRef.x2 = this.pos.x;
    this.desLineRef.y2 = this.pos.y;
    this.shouldOpen = true;
    this.shellShape = this.coreData.frameFile;
    this.shellSize = this.coreData.size;
    this.datumType = this.coreData.datumType;
    this.pointsP = this.componentPolygonPointsData;
    
    this.polygonDefTwo();
    this.textXdef();
  }

  //Position Dynamcs
  initialPos() { 
    return {
      'top': this.positionY,
      'left': this.positionX
    }
  }

  textXdef() {
    if (this.shellShape === 'rectangle') {
      this.textX = this.coreData.size[0] / 4;
      this.textY = this.coreData.size[1] / 2;
    } else if (this.shellShape === 'circle') {
      this.textX = this.coreData.size[0] / 4;
      this.textY = this.coreData.size[1] / 2;
    } else if (this.shellShape === 'polygon') {
      this.textX = this.coreData.size[0]/4;
      this.textY = this.coreData.size[1]/2;
    }
  }

  maskDef() {
    if (this.coreData.frameFile === 'rectangle') {
      return { 'clip-path' : 'url(#shellRectangle)' };
    } else if (this.coreData.frameFile === 'circle') {
      return { 'clip-path' : 'url(#shellCircle)' };
    }else {
      return { 'clip-path' : 'url(#shellPolygon)' };
    }
  }



  public onDrop(event: CdkDragEnd): void {
    const dropPoint = event.source.getFreeDragPosition()
    this.coreData.position = [dropPoint.x, dropPoint.y]
    this.coreMoved.emit([dropPoint.x, dropPoint.y]);
    this.menuPosition.x = (dropPoint.x + this.pos.x) + 'px';
    this.menuPosition.y = (dropPoint.y + this.pos.y - 170) + 'px';
    this.desLinePos.x1 = (dropPoint.x + this.pos.x);
    this.desLinePos.y1 = (dropPoint.y + this.pos.y - 50);
    this.desLinePos.x2 = (dropPoint.x + this.pos.x);
    this.desLinePos.y2 = (dropPoint.y + this.pos.y);
    this.desLineRef.x2 = (dropPoint.x + this.pos.x);
    this.desLineRef.y2 = (dropPoint.y + this.pos.y);
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
      clearTimeout(this.activeHoldTimeoutId);
    } else {
      console.log("it should not have opened");
      this.shouldOpen = true;
      clearTimeout(this.activeHoldTimeoutId);
    }

    this.isHeld = false;
    this.shouldOpen = true;
    clearTimeout(this.activeHoldTimeoutId);
  }


  closeDesign(event: MatTabChangeEvent) {
    if (event.index === 3) {
      this.designIsOpen = false;
      this.designLineVis = 'hidden';
    }
  }


  DesignButtonDyn() {
    this.designIsOpen = !this.designIsOpen;
    if (this.designIsOpen === false) {
      this.designLineVis = 'hidden';
    }
  }


  getMousePos(event: MouseEvent) {
    this.desLinePos.x2 = event.clientX;
    this.desLinePos.y2 = event.clientY;
  }


  onDesignDrop(event: CdkDragEnd): void {
    const dropPoint = event.source.getFreeDragPosition()
    this.desLinePos.x2 = event.dropPoint.x
    this.desLinePos.y2 = event.dropPoint.y
    this.designLineVis = 'visible';
    console.log("the positions changed to: " + dropPoint.x + " and " + dropPoint.y);
  }

  onDesHold() {
    this.designLineVis = 'hidden';
  }



}
