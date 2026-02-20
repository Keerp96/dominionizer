import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-manual-kingdom-card-select',
    standalone: true,
    template: '',
})
export class ManualKingdomCardSelectStubComponent {
    @Input() initialValue: string[] = [];

    @Output()
    readonly valueChange: EventEmitter<string[]> = new EventEmitter<string[]>();
}
