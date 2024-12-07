import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { StageComponent } from './components/stage/stage.component';
import { CoreComponent } from './components/core/core.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
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
import { MatInputModule } from '@angular/material/input';

const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  // Change this to your Google API key
  apiKey: 'AIzaSyC-CFpkbL2VN80F62gZltr1uUVa4fEK_cs'
};


@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    StageComponent,
    LoginComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,             // Required for [(ngModel)]
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
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
    MatInputModule,
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
