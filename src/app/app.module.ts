import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { EditorComponent } from './editor/editor.component';
import { LoggerComponent } from './logger/logger.component';
import { LoggerService } from './core/logger.service';
import { EditorService } from './core/editor.service';
import { MouseService } from './core/mouse.service';
import { AtsService } from './core/ats.service';
import { HandlersWatcherComponent } from './handlers-watcher/handlers-watcher.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    EditorComponent,
    LoggerComponent,
    HandlersWatcherComponent
  ],
  imports: [
    BrowserModule,
	CommonModule
  ],
  providers: [LoggerService,
  			EditorService,
			MouseService,
			AtsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
