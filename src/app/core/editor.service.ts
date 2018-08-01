import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoggerService } from './logger.service';
import { MouseService } from '../core/mouse.service';
import { MouseEventHandler } from '../core/mouse.event.handler';
import { EditorStates } from '../core/editor.states';

@Injectable()
export class EditorService {
	private state: EditorStates = EditorStates.NONE;
	private unregisterFc: () => void = function(){};
	private componentDisplayedSource = new BehaviorSubject<boolean>(false);
	componentDisplayed$ = this.componentDisplayedSource.asObservable();

  	constructor(private loggerService: LoggerService,
				private mouseService: MouseService) { }

  	toggleEditor() {
		if (this.state === EditorStates.NONE) {
			this.componentDisplayedSource.next(true);
			this.switchToView();
		}
		else {
			this.state = EditorStates.NONE;
			this.componentDisplayedSource.next(false);
			this.unregisterFc();
		}
  	}

	switchToView() {
		this.state = EditorStates.VIEW;
		this.unregisterFc();
		this.registerViewStateHandlers();
	}

	switchToEdit() {
		this.state = EditorStates.EDIT;
		this.unregisterFc();
		this.registerEditStateHandlers();
	}

	switchToCreate() {
		this.state = EditorStates.CREATE;
		this.unregisterFc();
		this.registerCreateStateHandlers();
	}

	private registerViewStateHandlers() {
		this.loggerService.log("Registering 'view state' handlers");
		this.unregisterFc = this.mouseService.register().forLeftClick( this.getHandlerForViewState() );
	}

	private registerEditStateHandlers() {
		this.loggerService.log("Registering 'edit state' handlers");
		this.unregisterFc = this.mouseService.register().forLeftClick( this.getHandlerForEditState() );
	}

	private registerCreateStateHandlers() {
		this.loggerService.log("Registering 'create state' handlers");
		this.unregisterFc = this.mouseService.register().forLeftClick( this.getHandlerForCreateState() );
	}

	private getHandlerForViewState() {
		const action = atsEvent => this.loggerService.log("AtsEvent handled for View State");
		return new MouseEventHandler( action, 'View State - Left Click');
	}

	private getHandlerForEditState() {
		const action = atsEvent => this.loggerService.log("AtsEvent handled for Edit State");
		return new MouseEventHandler( action, 'Edit State - Left Click');
	}

	private getHandlerForCreateState() {
		const action = atsEvent => this.loggerService.log("AtsEvent handled for Create State");
		return new MouseEventHandler( action, 'Create State - Left Click');
	}
}
