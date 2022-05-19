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
  rectBorderRadius = 10;  //This is the Recatngl Corner's Filet radius

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

  //polyLine Dynamicss 
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

  //Triangle dynamics
  @ViewChild('svgPolyTri')
  svgPolyTri!: ElementRef

  svgPolyPointTri!: SVGPoint;
  svgPolyPointTriTh!: SVGPoint;

  @ViewChild('svgPolyTri2')
  svgPolyTri2!: ElementRef

  svgPolyPointTri2!: SVGPoint;
  svgPolyPointTri2Th!: SVGPoint;

  pointsPXtriText!: string;
  pointsPYtriText!: string;
  triPonts!: number[];

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
    this.triangleDefOne();
  }

  polyLineDefOne() {
    console.log(this.browserZoomLevel);
    for (let i = 0; i < this.pointsPX.length; i = i + 2) {
      if (i == 0) {
        this.pointsPXtext = ' ' + (this.pointsPX[i] + this.frameThickness) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1] + this.frameThickness) / this.browserZoomLevel + 'px';
        this.pointsPYtext = ' ' + (this.pointsPX[i]) / this.browserZoomLevel + 'px '+ (-this.frameThickness)/this.browserZoomLevel +'px, ' + (this.pointsPX[i]) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1]) / this.browserZoomLevel + 'px';
      } else if (i == this.pointsPX.length-2) {
        this.pointsPXtext = this.pointsPXtext + ', ' + (this.pointsPX[i] + this.frameThickness) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1] + this.frameThickness) / this.browserZoomLevel + 'px' + ', ' + (this.pointsPX[0] + this.frameThickness) / this.browserZoomLevel + 'px ' + (this.pointsPX[1] + this.frameThickness) / this.browserZoomLevel + 'px';
        this.pointsPYtext = this.pointsPYtext + ', ' + (this.pointsPX[i]) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1]) / this.browserZoomLevel + 'px' + ', ' + (this.pointsPX[0]) / this.browserZoomLevel + 'px ' + (this.pointsPX[1]) / this.browserZoomLevel + 'px, ' + (this.pointsPX[0]) / this.browserZoomLevel + 'px '+ (-this.frameThickness)/this.browserZoomLevel +'px' 
      } else {
        this.pointsPXtext = this.pointsPXtext + ', ' + (this.pointsPX[i] + this.frameThickness) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1] + this.frameThickness) / this.browserZoomLevel + 'px';
        this.pointsPYtext = this.pointsPYtext + ', ' + (this.pointsPX[i]) / this.browserZoomLevel + 'px ' + (this.pointsPX[i + 1]) / this.browserZoomLevel + 'px';
      }
    };
  }
  
  
  triangleDefOne() {
    this.pointsPXtriText = ' ' + ((this.shellSize[0] / 2) + this.frameThickness) / this.browserZoomLevel + 'px ' + (this.frameThickness) / this.browserZoomLevel + 'px, '
      + (this.frameThickness) / this.browserZoomLevel + 'px ' + (this.shellSize[1] + this.frameThickness) / this.browserZoomLevel + 'px, '
      + (this.shellSize[0] + this.frameThickness) / this.browserZoomLevel + 'px ' + (this.shellSize[1] + this.frameThickness) / this.browserZoomLevel + 'px ';
      
    this.pointsPYtriText = ' ' + (this.shellSize[0] / 2) / this.browserZoomLevel + 'px ' + (-this.frameThickness) / this.browserZoomLevel + 'px, '
      + (this.shellSize[0] / 2) / this.browserZoomLevel + 'px 0px, '
      + '0px ' + (this.shellSize[1]) / this.browserZoomLevel + 'px, '
      + (this.shellSize[0]) / this.browserZoomLevel + 'px ' + (this.shellSize[1]) / this.browserZoomLevel + 'px, '
      + ((this.shellSize[0] / 2)) / this.browserZoomLevel + 'px 0px,'
      + (this.shellSize[0] / 2) / this.browserZoomLevel + 'px ' + (-this.frameThickness) / this.browserZoomLevel + 'px';
  };

  rectDefOne() {
    if (this.coreData.datumType == "image") { 
      this.myRectImg.src = this.coreData.datumText;
      this.imageWidth = this.myRectImg.width;
      this.imageHeight = this.myRectImg.height;
    }
  }

  shapesDefOne() {
    if (this.shellShape == 'polyline') {
      this.polyLineDefOne();
    } else if (this.shellShape == 'polygon' && this.numOfSides == 3) {
      this.triangleDefOne();
    } else if (this.shellShape == 'polygon' && this.numOfSides == 4) {
      this.rectDefOne();
    }
  }
  

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

  triangleDefTwo() {
    this.svgPolyPointTri = this.svgPolyFrame.nativeElement.createSVGPoint();
    this.triPonts = [0,0,((this.shellSize[0]/2) + this.frameThickness), this.frameThickness,
      this.frameThickness, (this.shellSize[1] + this.frameThickness),
      (this.shellSize[0] + this.frameThickness), (this.shellSize[1] + this.frameThickness)];
    for (let i = 0; i < this.triPonts.length; i = i + 2) {
      this.svgPolyPointTri.x = this.triPonts[i];
      this.svgPolyPointTri.y = this.triPonts[i+1];
      this.svgPolyTri.nativeElement.points.appendItem(this.svgPolyPointTri);
    }
    this.svgPolyPointTri2 = this.svgPolyFrame.nativeElement.createSVGPoint();
    for (let i = 0; i < this.triPonts.length; i = i + 2) {
      this.svgPolyPointTri2.x = this.triPonts[i];
      this.svgPolyPointTri2.y = this.triPonts[i+1];
      this.svgPolyTri2.nativeElement.points.appendItem(this.svgPolyPointTri2);
    }
  }

  ngAfterViewInit(): void {
    if (this.shellShape == 'polyline') {
      this.polyLineDefTwo();
    } else if (this.shellShape == 'polygon' && this.numOfSides == 3) {
      this.triangleDefTwo();
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

  //Frame Dynamics  [150, 0, 0, 260, 300, 260];

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
