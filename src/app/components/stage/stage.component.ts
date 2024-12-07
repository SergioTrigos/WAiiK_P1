import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Core } from './coreTypes';

//TEMPORARY DATABASE STARTS
let CoresData: Core[] = [
  {
    creator: "bob",
    parentStage: 1000000001,
    position: [54, 650],
    size: [200, 250],
    scale: 1,
    datumType: "image",
    datumText: "https://www.yucatan.gob.mx/docs/galerias/uxmal/0.jpg",
    datumSize: [500],
    shellDimension: 2,
    frameShape: "ellipse",
    frameData: [],
    frameColor: "#8c6700",
    frameTransparency: 40,
    frameThickness: 2,
    glazingColor: "#d899ff",
    glazingTransparency: 50,
    castDatum: false,
    receiveDatum: false,
  },
  {
    creator: "bob",
    parentStage: 1000000001,
    position: [200, 500],
    size: [310, 400],
    scale: 1,
    datumType: "image",
    datumText: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Palenque_temple_2.jpg/1200px-Palenque_temple_2.jpg",
    datumSize: [400],
    shellDimension: 4,
    frameShape: "polyline",
    frameData: [150, 0, 0, 260, 300, 260],
    frameColor: "#8c6700",
    frameTransparency: 75,
    frameThickness: 4,
    glazingColor: "#ccfffe",
    glazingTransparency: 20,
    castDatum: false,
    receiveDatum: false,
  },
  {
    creator: "bob",
    parentStage: 1000000001,
    position: [200, 500],
    size: [198, 198],
    scale: 1,
    datumType: "image",
    datumText: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Palenque_temple_2.jpg/1200px-Palenque_temple_2.jpg",
    datumSize: [400],
    shellDimension: 4,
    frameShape: "polyline",
    frameData: [90,0, 30,188, 180,68, 0,68, 150,188],
    frameColor: "#8c6700",
    frameTransparency: 75,
    frameThickness: 4,
    glazingColor: "#ccfffe",
    glazingTransparency: 20,
    castDatum: false,
    receiveDatum: false,
  },
  {
    creator: "bob",
    parentStage: 1000000001,
    position: [500, 704],
    size: [150, 150],
    scale: 1,
    datumType: "image",
    datumText: "https://www.yucatan.gob.mx/docs/galerias/uxmal/0.jpg",
    datumSize: [400, 200],
    shellDimension: 2,
    frameShape: "rectangle",
    frameData: [20],
    frameColor: "#8c6700",
    frameTransparency: 100,
    frameThickness: 10,
    glazingColor: "#ffc4b0",
    glazingTransparency: 90,
    castDatum: false,
    receiveDatum: false,
  },
  {
    creator: "bob",
    parentStage: 1000000001,
    position: [210, 100],
    size: [250, 250],
    scale: 1,
    datumType: "image",
    datumText: "https://www.yucatan.gob.mx/docs/galerias/uxmal/0.jpg",
    datumSize: [800, 400],
    shellDimension: 2,
    frameShape: "polygon",
    frameData: [6],
    frameColor: "#8c6700",
    frameTransparency: 100,
    frameThickness: 6,
    glazingColor: "#ffc4b0",
    glazingTransparency: 0,
    castDatum: false,
    receiveDatum: false,
  },
];
//TEMPORARY DATABASE ENDS



@Component({
    selector: 'app-stage',
    templateUrl: './stage.component.html',
    styleUrls: ['./stage.component.sass'],
    standalone: false
})
export class StageComponent implements OnInit {
  Kores: Core[] = CoresData;
  @Input() kores: any[] = []; // Full list of kores (from a service or database)
  @Input() activeTabId!: number; // Track the active tab ID

  displayedKores: any[] = []; // Filtered list of kores to display
  
  constructor() { }

  ngOnInit(): void {

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeTabId'] || changes['kores']) {
      this.updateDisplayedKores();
    }
  }  
  
  updateDisplayedKores(): void {
    if (this.activeTabId === 0) {
      // Display the default Home stage (no kores)
      this.displayedKores = [];
    } else {
      // Filter kores based on the container Kore associated with the active tab
      const containerKore = this.kores.find(kore => kore.id === this.activeTabId);
      this.displayedKores = containerKore?.containedKores || [];
    }
  }


  newPosition(pos: number[], index: number): void {
    CoresData[index].position = pos
    //this.displayedKores[index].position = pos;
    console.log("the positions changed to: " + pos[0] + " and " + pos[1]);
  }

}
