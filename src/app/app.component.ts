import { Component, OnInit } from '@angular/core';
import { LoggerService } from './core/logger.service';
import { EditorService } from './core/editor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	editorComponentIsVisible: boolean = false;

	constructor(private editorService: EditorService){};

	ngOnInit() {
		this.editorService.componentDisplayed$.subscribe(visible => this.editorComponentIsVisible = visible );
	}

  	toggleEditor() {
		this.editorService.toggleEditor();
  	}
}
