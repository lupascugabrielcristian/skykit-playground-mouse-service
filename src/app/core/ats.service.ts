import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AtsMouseEvent } from '../model/ats-mouse-event';

@Injectable()
export class AtsService {
	// I want this to mock the part of the ats Engine that emits the events
	// I believe it could be the controller because the 'gestureProbe' method
	// is found there. We can insert there event emmiters that will be activated
	// be the Ats Engine

	private mouseEventSource = new Subject<AtsMouseEvent>();
	mouseEvent$ = this.mouseEventSource.asObservable();

  	constructor() { }

	emitRightClick(x: number, y: number) {
		this.mouseEventSource.next(new AtsMouseEvent(x, y, 'right'));
	}
	
	emitLeftClick(x: number, y: number) {
		this.mouseEventSource.next(new AtsMouseEvent(x, y, 'left'));
	}
}
