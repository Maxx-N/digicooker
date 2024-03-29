import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.css'],
})
export class AlertComponent {
    @Input() message : string;
    @Output() errorClosed : EventEmitter<void> = new EventEmitter<void>();

    onClose() : void {
        this.errorClosed.emit();
    }
}
