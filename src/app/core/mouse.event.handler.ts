import { AtsMouseEvent } from '../model/ats-mouse-event';

export class MouseEventHandler {
	private action: Function = null;
	name: string = 'No name handler';

	constructor(toDo: (atsEvent: AtsMouseEvent) => void, name ) {
		this.action = toDo;
		this.name = name;
	}

	handleEvent(atsEvent: AtsMouseEvent) {
		this.action(atsEvent);
	}
}
