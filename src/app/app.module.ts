import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreComponent } from './core/core.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { StageComponent } from './stage/stage.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FontPickerModule } from 'ngx-font-picker';
import { FONT_PICKER_CONFIG } from 'ngx-font-picker';
import { FontPickerConfigInterface } from 'ngx-font-picker';

const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  // Change this to your Google API key
  apiKey: 'AIzaSyC-CFpkbL2VN80F62gZltr1uUVa4fEK_cs'
};


@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    StageComponent,
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    DragDropModule,
    MatMenuModule,
    OverlayModule,
    MatRippleModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTooltipModule,
    MatSliderModule,
    ColorPickerModule,
    MatSelectModule,
    MatButtonToggleModule,
    FontPickerModule,
  ],
  providers: [
    {
      provide: FONT_PICKER_CONFIG,
      useValue: DEFAULT_FONT_PICKER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
