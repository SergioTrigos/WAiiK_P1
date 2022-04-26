export interface Core { 
  creator: {};
  parentStage: number;
  position: number[];
  size: number[];
  scale: number;
  datumType: string;
  datumText: string;
  shellDimension: number;
  frameFile: string;
  frameColor: string;
  frameTransparency: number;
  frameThickness: number;
  glazingColor: string;
  glazingTransparency: number;
  castDatum: boolean;
  receiveDatum: boolean;
}