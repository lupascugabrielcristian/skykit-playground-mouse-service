import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoggerService {
	messagesSource = new BehaviorSubject<string[]>([]);
	messages$ = this.messagesSource.asObservable();

  	constructor() { }

  	log(message: string) {
		const messages = this.messagesSource.getValue();
		messages.push(message);
  	}
}
