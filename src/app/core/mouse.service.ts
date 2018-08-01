import { Injectable } from '@angular/core';
import { MouseEventHandler } from './mouse.event.handler';
import { AtsService } from './ats.service';
import { LoggerService } from './logger.service';
import { AtsMouseEvent } from '../model/ats-mouse-event';
import { BehaviorSubject } from 'rxjs';

// so this is the class that receives the events from the atsIceEngine
// and uses the registered handlers to process the received events
// I'm describing here only for the mouse but I guess the keyboard events
// can be processed by subscribing to the specific event emmiters 

@Injectable()
export class MouseService {
	private handlers = new Handlers();
	private leftClickHandlersSource = new BehaviorSubject<MouseEventHandler[]>(this.handlers.leftClick);
	leftClickHandlers$ = this.leftClickHandlersSource.asObservable();

  	constructor(private atsService: AtsService, 
				private logger: LoggerService) {
		this.subscribeToEventEmmiters();
	}

	register(): RegistrationFunctions {
		return this.getRegisterFunctions();
	}

	private subscribeToEventEmmiters(): void {
		this.atsService.mouseEvent$.subscribe( (mouseEvent: AtsMouseEvent) => this.handleAtsEvent(mouseEvent) );
	}

	private getRegisterFunctions(): RegistrationFunctions {
		return {
			forRightClick: this.getRightClickRegisterFunction(),
			forLeftClick: this.getLeftClickRegisterFunction()
		}
	}

	private getRightClickRegisterFunction(): any {
		return ( handler: MouseEventHandler ) => this.registerHandler(handler, this.handlers.rightClick);
	}

	private getLeftClickRegisterFunction(): any {
		return ( handler: MouseEventHandler ) => { 
			this.leftClickHandlersSource.next(this.handlers.leftClick);
			this.handlers.leftClick.push(handler);
			return () => {
				this.logger.log("Removing handler " + handler.name );
				this.handlers.leftClick = this.handlers.leftClick.filter( (h) => h.name !== handler.name);
				this.leftClickHandlersSource.next(this.handlers.leftClick);
			}
		}
	}

	// This returns a function that removes the handler from the list *****
	// Why this is not working? In case of getRightClickRegisterFunction, collection will not update this.handlers.rightClick
  	private registerHandler( handler: MouseEventHandler, collection: MouseEventHandler[] ): any {
		collection.push(handler);
		return () =>  {
			this.logger.log("Removing handler " + handler.name );
			collection = collection.filter( (h) => h.name !== handler.name);
			console.log('After removing: %o', this.handlers.leftClick);
		}
	}

	private handleAtsEvent(atsEvent: AtsMouseEvent): void {
		console.log("handling");
		if (atsEvent.button === "left") {
			this.handlers.leftClick.forEach(handler => handler.handleEvent(atsEvent));
		}
		
		if (atsEvent.button === "right") {
			this.handlers.rightClick.forEach(handler => handler.handleEvent(atsEvent));
		}
	}
}

interface RegistrationFunctions {
	forRightClick: any;
	forLeftClick: any;
}

export class Handlers {
	rightClick: MouseEventHandler[] = [];
	leftClick: MouseEventHandler[] = [];
}
