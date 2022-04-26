import { Component, Input, OnInit } from '@angular/core';
import { Core } from './coreTypes';

//TEMPORARY DATABASE STARTS
let CoresData: Core[] = [
  {
    creator: "bob",
    parentStage: 1000000001,
    position: [54, 650],
    size: [100, 100],
    scale: 1,
    datumType: "image",
    datumText: "https://www.yucatan.gob.mx/docs/galerias/uxmal/0.jpg",
    shellDimension: 2,
    frameFile: "circle",
    frameColor: "#8c6700",
    frameTransparency: 0.4,
    frameThickness: 2,
    glazingColor: "#d899ff",
    glazingTransparency: 0.5,
    castDatum: false,
    receiveDatum: false,
  },
  {
    creator: "bob",
    parentStage: 1000000001,
    position: [200, 500],
    size: [200, 100],
    scale: 1,
    datumType: "image",
    datumText: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Palenque_temple_2.jpg/1200px-Palenque_temple_2.jpg",
    shellDimension: 4,
    frameFile: "polygon",
    frameColor: "#8c6700",
    frameTransparency: 0.75,
    frameThickness: 2,
    glazingColor: "#ccfffe",
    glazingTransparency: 0.2,
    castDatum: false,
    receiveDatum: false,
  },
  {
    creator: "bob",
    parentStage: 1000000001,
    position: [210, 704],
    size: [250, 100],
    scale: 1,
    datumType: "image",
    datumText: "https://www.yucatan.gob.mx/docs/galerias/uxmal/0.jpg",
    shellDimension: 2,
    frameFile: "rectangle",
    frameColor: "#8c6700",
    frameTransparency: 1,
    frameThickness: 2,
    glazingColor: "#ffc4b0",
    glazingTransparency: 0.9,
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
    shellDimension: 2,
    frameFile: "circle",
    frameColor: "#8c6700",
    frameTransparency: 1,
    frameThickness: 1,
    glazingColor: "#ffc4b0",
    glazingTransparency: 0,
    castDatum: false,
    receiveDatum: false,
  },
];
//TEMPORARY DATABASE ENDS

let counter = 0;


@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.sass']
})
export class StageComponent implements OnInit {

  Cores: Core[] = CoresData;
  

  constructor() { }

  ngOnInit(): void {

  }

  newPosition(pos: number[], index: number) {
    CoresData[index].position = pos
    console.log("the positions changed to: " + pos[0] + " and " + pos[1]);
  }

}
