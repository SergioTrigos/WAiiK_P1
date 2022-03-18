export interface Core { 
  creator: {};
  parentStage: number;
  position: number[];
  scale: number;
  datumType: string;
  datumText: string;
  shellDimension: number;
  frameFile: string;
  frameColor: string;
  frameTransparency: number;
  frameThickness: number;
  castDatum: boolean;
  receiveDatum: boolean;
}