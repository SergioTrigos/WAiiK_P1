import { Component, Input, OnInit } from '@angular/core';
import { Core } from './coreTypes';

//TEMPORARY DATABASE STARTS
let CoresData: Core[] = [
  {
    creator: "bob",
    parentStage: 1000000001,
    position: [54,104],
    scale: 1,
    datumType: "text",
    datumText: "Dog!!",
    shellDimension: 2,
    frameFile: "square",
    frameColor: "#8c6700",
    frameTransparency: 75,
    frameThickness: 2,
    castDatum: false,
    receiveDatum: false,
  },
  {
    creator: "bob",
    parentStage: 1000000001,
    position: [],
    scale: 1,
    datumType: "text",
    datumText: "Cat!!",
    shellDimension: 2,
    frameFile: "square",
    frameColor: "#8c6700",
    frameTransparency: 75,
    frameThickness: 2,
    castDatum: false,
    receiveDatum: false,
  },
  {
    creator: "bob",
    parentStage: 1000000001,
    position: [210,104],
    scale: 1,
    datumType: "text",
    datumText: "Elk biting a freeking arrow",
    shellDimension: 2,
    frameFile: "square",
    frameColor: "#8c6700",
    frameTransparency: 75,
    frameThickness: 2,
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

  Cores: Core = CoresData[1];
  

  constructor() { }

  ngOnInit(): void {

  }

  newPosition(pos: number[]) {
    CoresData[1].position = pos
    alert("the positions changed to: " + pos[0] + " and " + pos[1]);
  }

}
