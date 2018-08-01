import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

import { AtsService } from '../core/ats.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	@Output() showEditor = new EventEmitter();

  	constructor(private atsService: AtsService) { }

  	ngOnInit() { }

	openEditor() {
		this.showEditor.emit(true);
	}

	mouseDown(ev: any) {
		// This is how I mock how Ats constroller/service will emit some event with our click
		this.atsService.emitLeftClick(ev.x, ev.y);
	}
}
