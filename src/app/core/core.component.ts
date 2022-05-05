import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef, HostListener} from '@angular/core';
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
export class CoreComponent implements OnInit, AfterViewInit {

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
  componentPolyLinePointsData = [150, 0, 0, 260, 300, 260];
  //Star: [100,10, 40,198, 190,78, 10,78, 160,198]
  pointsP!: number[];
  pointsPX!: number[];
  pointsPXtext!: string;
  browserZoomLevel = window.devicePixelRatio;
  rectBorderRadius = 10;

  //Color dynamics
  colorFrame: string = '#2889e9';
  colorBackground: string = '#2889e9';
  colorDrawing: string = '#2889e9';
  colorText: string = '#2889e9';

  //Shape dynamics
  selectedShapeFrame!: string;
  selectedShapeDrawing = 'elipse';
  numOfSides = 4;

  //polyLine Dynamicss 
  @ViewChild('svgPolyFrame')
  svgPolyFrame!: ElementRef;

  @ViewChild('svgPoly')
  svgPoly!: ElementRef;

  svgPolyPoint!: SVGPoint;

  //Design Frame PolyLine Dynamics

  @ViewChild('svgPolyF')
  svgPolyF!: ElementRef

  svgPolyPointF!: SVGPoint;

  //tRANSPARENCY DYNAMICS
  formatLabel(value: number) {
    if (value >= 1) {
      return value + '%';
    }
    return value;
  }

  drawingTransparency!: number;
  glazingTransparency!: number;
  frameTransparency!: number;


  //Design Glazing PolyLine Dynamics

  @ViewChild('svgPolyG')
  svgPolyG!: ElementRef

  svgPolyPointG!: SVGPoint;

  //Design Datum PolyLine Dynamics
  
  @ViewChild('svgPolyD')
  svgPolyD!: ElementRef

  svgPolyPointD!: SVGPoint;

  //Rectangle dynamics
  @ViewChild('rectImage')
  rectPoly!: ElementRef;
  myRectImg = new Image();
  
  imageHeight!: number;
  imageWidth!: number;

  //

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;


  //Core Data
  @Input()
  coreData: any = {}; 

  @Output()
  coreMoved = new EventEmitter();
  
  constructor() {
  }
  //Core Visibility dynamics
  coreMenuIsVis!: boolean;

  mouseOverCore() {
    this.coreMenuIsVis = true;
    console.log("CoreMenu is VISIBLE");
  };


  mouseOutCore() {
    this.coreMenuIsVis = false;
    console.log("CoreMenu is NOT visible");
  };


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.browserZoomLevel = window.devicePixelRatio;
    console.log("the window was zoomed");
    this.polyLineDefOne();
  }

  polyLineDefOne() {
    console.log(this.browserZoomLevel);
    for (let i = 0; i < this.pointsPX.length; i = i + 2) {
      if (i == 0) {
        this.pointsPXtext = ' ' + (this.pointsPX[i] + this.coreData.frameThickness/2) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1] + this.coreData.frameThickness/2) / this.browserZoomLevel + 'px';
      } else {
        this.pointsPXtext = this.pointsPXtext + ', ' + (this.pointsPX[i] + this.coreData.frameThickness/2) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1] + this.coreData.frameThickness/2) / this.browserZoomLevel + 'px';
      }
    };
  }

  rectImageOne() {
    if (this.coreData.datumType == "image") { 
      this.myRectImg.src = this.coreData.datumText;
      this.imageWidth = this.myRectImg.width;
      this.imageHeight = this.myRectImg.height;
    }
  }

  ngOnInit(): void {
    this.pos.x = this.coreData.position[0];
    this.pos.y = this.coreData.position[1];
    this.positionX = this.coreData.position[0] + "px";
    this.positionY = this.coreData.position[1] + "px";
    this.menuPosition.x = (this.coreData.position[0]) + "px";
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
    this.pointsP = [0, 0].concat(this.componentPolyLinePointsData);
    this.pointsPX = this.componentPolyLinePointsData;
    this.polyLineDefOne()
    this.textXdef();
    //shapes
    this.selectedShapeFrame = this.coreData.frameFile;

    //transparency
    this.drawingTransparency = 100;
    this.glazingTransparency = this.coreData.glazingTransparency; 
    this.frameTransparency = this.coreData.frameTransparency;

    //Core Visibility
    this.coreMenuIsVis = false;

    //Rectangle image stuff
    this.rectImageOne();
  }


  polyLineDefTwo() {
    this.svgPolyPoint = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPoint.x = this.pointsP[i] + this.coreData.frameThickness / 2;
      this.svgPolyPoint.y = this.pointsP[i + 1] + this.coreData.frameThickness / 2;
      this.svgPoly.nativeElement.points.appendItem(this.svgPolyPoint);
    }
  }

  polyLineDefThree() {
    this.svgPolyPointF = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointF.x = this.pointsP[i] + this.coreData.frameThickness/2;
      this.svgPolyPointF.y = this.pointsP[i + 1] + this.coreData.frameThickness / 2;
      this.svgPolyF.nativeElement.points.appendItem(this.svgPolyPointF);
    };
    this.svgPolyPointG = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointG.x = this.pointsP[i] + this.coreData.frameThickness/2;
      this.svgPolyPointG.y = this.pointsP[i + 1] + this.coreData.frameThickness/2;
      this.svgPolyG.nativeElement.points.appendItem(this.svgPolyPointG);
    };
    this.svgPolyPointD = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointD.x = this.pointsP[i] + this.coreData.frameThickness/2;
      this.svgPolyPointD.y = this.pointsP[i + 1] + this.coreData.frameThickness/2;
      this.svgPolyD.nativeElement.points.appendItem(this.svgPolyPointD);
    };
  }

  ngAfterViewInit(): void {
    if (this.shellShape === 'polyline') {
      this.polyLineDefTwo();
    }
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
    } else if (this.shellShape === 'polyline') {
      this.textX = this.coreData.size[0]/4;
      this.textY = this.coreData.size[1]/2;
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
    };
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

  private DesignPolyLineTimeoutId: any;
  loadPolly() {
    this.DesignPolyLineTimeoutId = setTimeout(() => { 
      if (this.shellShape === 'polyline') {
        this.polyLineDefThree();
      }
    }, 300);
  }


}
