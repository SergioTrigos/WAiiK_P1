import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

let positionX: string;
let positionY: string; 
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.sass']
})
export class CoreComponent implements OnInit {

  designIsOpen = false;

  constructor() { }
  //Core Data
  @Input()
  coreData: any = {}; 

  @Output()
  coreMoved = new EventEmitter();

  ngOnInit(): void {
    positionX = this.coreData.position[0] + "px";
    positionY = this.coreData.position[1] + "px";
  }

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

 


}
