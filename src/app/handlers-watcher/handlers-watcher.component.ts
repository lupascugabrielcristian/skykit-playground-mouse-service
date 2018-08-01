import { Component, OnInit } from '@angular/core';
import { MouseService } from '../core/mouse.service'; 
import { MouseEventHandler } from '../core/mouse.event.handler';

@Component({
  selector: 'app-handlers-watcher',
  templateUrl: './handlers-watcher.component.html',
  styleUrls: ['./handlers-watcher.component.css']
})
export class HandlersWatcherComponent implements OnInit {
	handlers: MouseEventHandler[];

  	constructor(private mouseService: MouseService) { }

  	ngOnInit() {
		this.mouseService.leftClickHandlers$.subscribe(hs => { 
			console.log("This is handlers received in handlers wathcher: %o", hs);
			this.handlers = hs;
		});
  	}
}
