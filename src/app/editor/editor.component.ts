import { Component, OnInit } from '@angular/core';
import { EditorService } from '../core/editor.service';
import { LoggerService } from '../core/logger.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  	constructor(private editorService: EditorService, private logger: LoggerService) { }

  	ngOnInit() { }

	switchToView() {
		this.editorService.switchToView();
	}

	switchToEdit() {
		this.editorService.switchToEdit();
	}

	switchToCreate() {
		this.editorService.switchToCreate();
	}
}
