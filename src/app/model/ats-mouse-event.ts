import { AtsFeature } from './ats-feature';

export class AtsMouseEvent {
	x: number;
	y: number;
	featuresList: AtsFeature[];
	button: string;
	
	constructor(x: number, y: number, buttonName: string) {
		this.x = x;
		this.y = y;
		this.button = buttonName;
	}
}
