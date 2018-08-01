import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../core/logger.service';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
	messages: string[] = [];

  	constructor(private loggerService: LoggerService) { }

  	ngOnInit() {
  	    this.loggerService.messages$.subscribe( messages => this.messages = messages );
  	}

}
