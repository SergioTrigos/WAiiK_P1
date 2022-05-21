import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef, HostListener} from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FontPickerDirective } from 'ngx-font-picker';

//let positionX: string;
//let positionY: string; 
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.sass'],
})
export class CoreComponent implements OnInit, AfterViewInit {

  positionX!: string;
  positionY!: string; //value

  designIsOpen = false;
  desLinePos = { x1: 0, y1: 0, x2: 0, y2: 0 }
  desLineRef = {x2: 0, y2: 0}
  designLineVis = 'hidden';
  shouldOpen!: boolean;
  menuPosition = { x: '0', y: '0' };
  pos = { x: 0, y: 0 };
  browserZoomLevel = window.devicePixelRatio;


  //Frame Data
  shellShape!: string;
  shellSize!: [number, number];
  frameThickness!: number;
  colorFrame!: string;
  rectBorderRadius!: number;  //This is the Recatngl Corner's Filet radius

  componentPolyLinePointsData!: number[];
  pointsP!: number[];
  pointsPX!: number[];
  pointsPXtext!: string;
  pointsPYtext!: string;

  //Glazing Data
  drawingThickness!: number;
  colorBackground!: string;
  
  colorDrawing!: string;

  //Datum Data
  datumType!: string;
  textX!: number;
  textY!: number;
  colorText: string = '#2889e9';
  

  //Shape dynamics
  selectedShapeFrame!: string;
  selectedShapeDrawing = 'elipse';
  numOfSides!: number;

  //polyLine vars
  @ViewChild('svgPolyFrame')
  svgPolyFrame!: ElementRef;

  @ViewChild('svgPoly')
  svgPoly!: ElementRef;

  svgPolyPoint!: SVGPoint;
  svgPolyPointTh!: SVGPoint;

  @ViewChild('svgPolyGlaz')
  svgPolyGlaz!: ElementRef;

  svgPolyPointGlaz!: SVGPoint;
  svgPolyPointGlazTh!: SVGPoint;

  //Design Frame PolyLine Dynamics

  @ViewChild('svgPolyF')
  svgPolyF!: ElementRef

  svgPolyPointF!: SVGPoint;
  svgPolyPointFTh!: SVGPoint;

  //Design Glazing PolyLine Dynamics

  @ViewChild('svgPolyG')
  svgPolyG!: ElementRef

  svgPolyPointG!: SVGPoint;
  svgPolyPointGTh!: SVGPoint;

  @ViewChild('svgPolyG2')
  svgPolyG2!: ElementRef

  svgPolyPointG2!: SVGPoint;
  svgPolyPointG2Th!: SVGPoint;

  //Design Datum PolyLine Dynamics
  
  @ViewChild('svgPolyD')
  svgPolyD!: ElementRef

  svgPolyPointD!: SVGPoint;
  svgPolyPointDTh!: SVGPoint;

  //Polygon vars
  @ViewChild('svgPolygonFrame')
  svgPolygonFrame!: ElementRef;
  
  @ViewChild('svgPolyX')
  svgPolyX!: ElementRef
  
  svgPolyPointX!: SVGPoint;
  svgPolyPointXTh!: SVGPoint;
  
  @ViewChild('svgPolyX2')
  svgPolyX2!: ElementRef
  
  svgPolyPointX2!: SVGPoint;
  svgPolyPointX2Th!: SVGPoint;

  pointsPolyXText!: string;
  pointsPolyYText!: string;
  polygonPonts!: number[];

  //Rectangle dynamics
  @ViewChild('rectImage')
  rectPoly!: ElementRef;
  myRectImg = new Image();
  
  imageHeight!: number;
  imageWidth!: number;

  //

  //tRANSPARENCY DYNAMICS
  drawingTransparency!: number;
  glazingTransparency!: number;
  frameTransparency!: number;

  formatLabel(value: number) {
    return value + '%';
  }

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;


  //Core Data
  @Input()
  coreData: any = {}; 

  @Output()
  coreMoved = new EventEmitter();

  //Datum Dynamics
  selectedDatumType = "verse";

  @ViewChild('fontPickerElement', { static: true })
  fontPicker!: FontPickerDirective;  //this is currently not being used

  fontX = {family: "helvetica", style: "normal", size: "12"};
  
  constructor() {
  }

  //Core Visibility dynamics
  coreMenuIsVis!: boolean;

  mouseOverCore() {
    this.coreMenuIsVis = true;
  };

  mouseOutCore() {
    this.coreMenuIsVis = false;
  };

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.browserZoomLevel = window.devicePixelRatio;
    console.log("the window was zoomed");
    this.polyLineDefOne();
    this.regularPolygonDefOne();
  }

  //SHELL SHAPE GENERAL

  shapesDefOne() {
    if (this.shellShape == 'polyline') {
      this.polyLineDefOne();
    } else if (this.shellShape == 'polygon') {
      this.calcPolyPoints();
      this.regularPolygonDefOne();
    } else if (this.shellShape == 'rectangle') {
      this.rectDefOne();
    }
  }

  //POLYGON METHODS

    //Polygon Complex number multiplication dynamics
  complexP!: number[];
  complexPtemp!: number[];
  realPol!: number;
  lateralPol!: number;
  rads!: number;
  a = 0;
  b!: number;
  c!: number;
  d!: number;
  pointIndexRP!: number;
  angRP!: number;
  distanceFixRP!: number;
    
  complex_miltiply_Poly(polyNum: number, index: number, xFix: number) {
    this.rads = ((2 * Math.PI) / polyNum) * index;
    this.b = this.shellSize[1] / 2;
    this.c = Math.cos(this.rads);
    this.d = Math.sin(this.rads);
    this.realPol = (Math.round(((this.a * this.c) - (this.b * this.d)) * 100) / 100) + (this.shellSize[0] / 2) - xFix;
    this.lateralPol = (Math.round(((this.a * this.d) + (this.b * this.c)) * 100) / 100) - (this.shellSize[1] / 2);
    return [this.realPol, this.lateralPol];
  }
  
  calcPolyPoints() {
    //I need to calcuate the distance from the left most point of the polygon to the left edge of the SVG container
    this.pointIndexRP = Math.round(this.numOfSides / 4);
    this.angRP = this.rads = ((2 * Math.PI) / this.numOfSides) * this.pointIndexRP;
    this.distanceFixRP = (this.shellSize[0] / 2) * (1 - Math.cos((Math.PI / 2) - this.angRP))

    this.complexP = [(this.shellSize[0] / 2) - this.distanceFixRP, 0];
    for (let j = 1; j < this.numOfSides; j++) { 
      this.complexPtemp = this.complex_miltiply_Poly(this.numOfSides, j, this.distanceFixRP);
      this.complexP.push(...this.complexPtemp);
    };
  }
    
  regularPolygonDefOne() {
    for (let i = 0; i < this.complexP.length; i = i + 2) {
      if (i == 0) {
        this.pointsPolyXText = ' ' + (this.complexP[i] + this.frameThickness) / this.browserZoomLevel + 'px ' + (-this.complexP[i + 1] + this.frameThickness) / this.browserZoomLevel + 'px ';
        
        this.pointsPolyYText = ' ' + (this.complexP[i]) / this.browserZoomLevel + 'px ' + (-this.frameThickness) / this.browserZoomLevel + 'px, '
          + (this.complexP[i]) / this.browserZoomLevel + 'px ' + (-this.complexP[i + 1]) / this.browserZoomLevel + 'px ';
        
      } else if (i == this.complexP.length - 2) {
        this.pointsPolyXText = this.pointsPolyXText + ', '
          + (this.complexP[i] + this.frameThickness) / this.browserZoomLevel + 'px ' + (-this.complexP[i + 1] + this.frameThickness) / this.browserZoomLevel + 'px ';
      
        this.pointsPolyYText = this.pointsPolyYText + ', '
          + (this.complexP[i]) / this.browserZoomLevel + 'px ' + (-this.complexP[i + 1]) / this.browserZoomLevel + 'px, '
          + (this.complexP[0]) / this.browserZoomLevel + 'px ' + (-this.complexP[1]) / this.browserZoomLevel + 'px, '
          + (this.complexP[0]) / this.browserZoomLevel + 'px ' + (-this.frameThickness) / this.browserZoomLevel + 'px';
      
      } else {
        this.pointsPolyXText = this.pointsPolyXText + ', '
          + (this.complexP[i] + this.frameThickness) / this.browserZoomLevel + 'px ' + (-this.complexP[i + 1] + this.frameThickness) / this.browserZoomLevel + 'px';
        
        this.pointsPolyYText = this.pointsPolyYText + ', '
          + (this.complexP[i]) / this.browserZoomLevel + 'px ' + (-this.complexP[i + 1]) / this.browserZoomLevel + 'px';
         
      };
    };
  };
    
  regularPolygonDefTwo() {
    this.svgPolyPointX = this.svgPolygonFrame.nativeElement.createSVGPoint();
    for (let i = -2; i < this.complexP.length; i = i+2) {
      this.svgPolyPointX.x = this.complexP[i] + this.frameThickness;
      this.svgPolyPointX.y = -this.complexP[i+1] + this.frameThickness;
      this.svgPolyX.nativeElement.points.appendItem(this.svgPolyPointX);
    }
    this.svgPolyPointX2 = this.svgPolygonFrame.nativeElement.createSVGPoint();
    for (let i = -2; i < this.complexP.length; i = i+2) {
      this.svgPolyPointX2.x = this.complexP[i] + this.frameThickness;
      this.svgPolyPointX2.y = -this.complexP[i+1] + this.frameThickness;
      this.svgPolyX2.nativeElement.points.appendItem(this.svgPolyPointX2);
    }
  }
  

  //POLYLINE METHODS
  polyLineDefOne() {
    for (let i = 0; i < this.pointsPX.length; i = i + 2) {
      if (i == 0) {
        this.pointsPXtext = ' ' + (this.pointsPX[i] + this.frameThickness) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1] + this.frameThickness) / this.browserZoomLevel + 'px';
        this.pointsPYtext = ' ' + (this.pointsPX[i]) / this.browserZoomLevel + 'px '+ (-this.frameThickness)/this.browserZoomLevel +'px, ' + (this.pointsPX[i]) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1]) / this.browserZoomLevel + 'px';
      } else if (i == this.pointsPX.length-2) {
        this.pointsPXtext = this.pointsPXtext + ', ' + (this.pointsPX[i] + this.frameThickness) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1] + this.frameThickness) / this.browserZoomLevel + 'px' + ', ' + (this.pointsPX[0] + this.frameThickness) / this.browserZoomLevel + 'px ' + (this.pointsPX[1] + this.frameThickness) / this.browserZoomLevel + 'px';
        this.pointsPYtext = this.pointsPYtext + ', ' + (this.pointsPX[i]) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1]) / this.browserZoomLevel + 'px, ' + (this.pointsPX[0]) / this.browserZoomLevel + 'px ' + (this.pointsPX[1]) / this.browserZoomLevel + 'px, ' + (this.pointsPX[0]) / this.browserZoomLevel + 'px '+ (-this.frameThickness)/this.browserZoomLevel +'px' 
      } else {
        this.pointsPXtext = this.pointsPXtext + ', ' + (this.pointsPX[i] + this.frameThickness) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1] + this.frameThickness) / this.browserZoomLevel + 'px';
        this.pointsPYtext = this.pointsPYtext + ', ' + (this.pointsPX[i]) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1]) / this.browserZoomLevel + 'px';
      }
    };
  }

  polyLineDefTwo() {
    this.svgPolyPoint = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPoint.x = this.pointsP[i] + this.frameThickness;
      this.svgPolyPoint.y = this.pointsP[i + 1] + this.frameThickness;
      this.svgPoly.nativeElement.points.appendItem(this.svgPolyPoint);
    }
    this.svgPolyPointGlaz = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointGlaz.x = this.pointsP[i] + this.frameThickness;
      this.svgPolyPointGlaz.y = this.pointsP[i + 1] + this.frameThickness;
      this.svgPolyGlaz.nativeElement.points.appendItem(this.svgPolyPointGlaz);
    }
  }
  
  polyLineDefThree() {
    this.svgPolyPointF = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointF.x = this.pointsP[i] + this.frameThickness;
      this.svgPolyPointF.y = this.pointsP[i + 1] + this.frameThickness;
      this.svgPolyF.nativeElement.points.appendItem(this.svgPolyPointF);
    };
    this.svgPolyPointG = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointG.x = this.pointsP[i] + this.frameThickness;
      this.svgPolyPointG.y = this.pointsP[i + 1] + this.frameThickness;
      this.svgPolyG.nativeElement.points.appendItem(this.svgPolyPointG);
    };
    this.svgPolyPointG2 = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointG2.x = this.pointsP[i] + this.frameThickness;
      this.svgPolyPointG2.y = this.pointsP[i + 1] + this.frameThickness;
      this.svgPolyG2.nativeElement.points.appendItem(this.svgPolyPointG2);
    };
    this.svgPolyPointD = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointD.x = this.pointsP[i] + this.frameThickness;
      this.svgPolyPointD.y = this.pointsP[i + 1] + this.frameThickness;
      this.svgPolyD.nativeElement.points.appendItem(this.svgPolyPointD);
    };
  }

  polyLineDefThick() {
    this.svgPoly.nativeElement.points.clear();
    this.svgPolyPointTh = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointTh.x = this.pointsP[i] + this.frameThickness;
      this.svgPolyPointTh.y = this.pointsP[i + 1] + this.frameThickness;
      this.svgPoly.nativeElement.points.appendItem(this.svgPolyPointTh);
    }
    this.svgPolyGlaz.nativeElement.points.clear();
    this.svgPolyPointGlazTh = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointGlazTh.x = this.pointsP[i] + this.frameThickness;
      this.svgPolyPointGlazTh.y = this.pointsP[i + 1] + this.frameThickness;
      this.svgPolyGlaz.nativeElement.points.appendItem(this.svgPolyPointGlazTh);
    }
    this.svgPolyF.nativeElement.points.clear();
    this.svgPolyPointFTh = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointFTh.x = this.pointsP[i] + this.frameThickness;
      this.svgPolyPointFTh.y = this.pointsP[i + 1] + this.frameThickness;
      this.svgPolyF.nativeElement.points.appendItem(this.svgPolyPointFTh);
    };
    this.svgPolyG.nativeElement.points.clear();
    this.svgPolyPointGTh = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointGTh.x = this.pointsP[i] + this.frameThickness;
      this.svgPolyPointGTh.y = this.pointsP[i + 1] + this.frameThickness;
      this.svgPolyG.nativeElement.points.appendItem(this.svgPolyPointGTh);
    };
    this.svgPolyG2.nativeElement.points.clear();
    this.svgPolyPointG2Th = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointG2Th.x = this.pointsP[i] + this.frameThickness;
      this.svgPolyPointG2Th.y = this.pointsP[i + 1] + this.frameThickness;
      this.svgPolyG2.nativeElement.points.appendItem(this.svgPolyPointG2Th);
    };
    this.svgPolyD.nativeElement.points.clear();
    this.svgPolyPointDTh = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.pointsP.length; i = i + 2) {
      this.svgPolyPointDTh.x = this.pointsP[i] + this.frameThickness;
      this.svgPolyPointDTh.y = this.pointsP[i + 1] + this.frameThickness;
      this.svgPolyD.nativeElement.points.appendItem(this.svgPolyPointDTh);
    };
  }


  //RECTANGLE METHODS

  rectDefOne() {
    this.rectBorderRadius = this.coreData.frameData[0];
    if (this.coreData.datumType == "image") { 
      this.myRectImg.src = this.coreData.datumText;
      this.imageWidth = this.myRectImg.width;
      this.imageHeight = this.myRectImg.height;
    }
  }

  //DATUM METHODS
  textXdef() {
    if (this.shellShape === 'rectangle') {
      this.textX = this.coreData.size[0] / 4;
      this.textY = this.coreData.size[1] / 2;
    } else if (this.shellShape === 'circle') {
      this.textX = this.coreData.size[0] / 4;
      this.textY = this.coreData.size[1] / 2;
    } else if (this.shellShape === 'polyline') {
      this.textX = this.coreData.size[0] / 4;
      this.textY = this.coreData.size[1] / 2;
    }
  }

  compX!: number[];

  ngOnInit(): void {
    //Core position data init
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

    //Core Visibility
    this.coreMenuIsVis = false;
    this.shouldOpen = true;

    //Frame Data Init
    this.frameThickness = this.coreData.frameThickness;
    this.colorFrame = this.coreData.frameColor;
    this.numOfSides = this.coreData.frameData[0];
    this.componentPolyLinePointsData = this.coreData.frameData;
    this.shellShape = this.coreData.frameShape;
    this.shellSize = this.coreData.size;
    this.pointsP = [0, 0].concat(this.componentPolyLinePointsData);
    this.pointsPX = this.componentPolyLinePointsData;
    this.shapesDefOne();
    this.selectedShapeFrame = this.coreData.frameFile;

    //Glazing Data Init  
    this.colorBackground = this.coreData.glazingColor;
    
    this.drawingThickness = 4;
    this.colorDrawing = "black";

    //Datum Data Init
    this.datumType = this.coreData.datumType;
    this.textXdef();

    //shapes

    //transparency
    this.drawingTransparency = 100;
    this.glazingTransparency = this.coreData.glazingTransparency; 
    this.frameTransparency = this.coreData.frameTransparency;



  }


  ngAfterViewInit(): void {
    if (this.shellShape == 'polyline') {
      this.polyLineDefTwo();
    } else if (this.shellShape == 'polygon') {
      this.regularPolygonDefTwo();
    }
  }

  //Position Dynamcs
  initialPos() { 
    return {
      'top': this.positionY,
      'left': this.positionX
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
    this.coreMenuIsVis = true;
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

  //Frame Dynamics;


  frameThickUp() { 
    if (this.frameThickness < 100) {
      ++this.frameThickness;
      if (this.shellShape === 'polyline') {
        this.polyLineDefOne();
        this.polyLineDefThick();
      }
    }
  };

  frameThickDown() { 
    if (this.frameThickness > 1) {
      --this.frameThickness;
      if (this.shellShape === 'polyline') {
        this.polyLineDefOne();
        this.polyLineDefThick();
      }
    }
  };

  //Glazing Dynamics
  drawingThickUp() {
    ++this.drawingThickness;
  };

  drawingThickDown() { 
    --this.drawingThickness;
  };
  
  //Datum Dynamics

}
