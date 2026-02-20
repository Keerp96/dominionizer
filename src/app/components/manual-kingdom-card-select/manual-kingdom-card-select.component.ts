import { Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-manual-kingdom-card-select',
    imports: [MatFormField, MatLabel, MatHint, MatInput, ReactiveFormsModule],
    templateUrl: './manual-kingdom-card-select.component.html',
    styleUrls: ['./manual-kingdom-card-select.component.scss'],
})
export class ManualKingdomCardSelectComponent implements OnInit {
    private formBuilder = inject(UntypedFormBuilder);
    private destroyRef = inject(DestroyRef);

    @Input() initialValue: string[] = [];

    @Output()
    readonly valueChange: EventEmitter<string[]> = new EventEmitter<string[]>();

    formGroup: UntypedFormGroup = new UntypedFormGroup({});

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            cardNames: [this.initialValue.join(', ')],
        });

        this.formGroup
            .get('cardNames')
            ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((value: string) => {
                const names = value
                    ? value
                          .split(',')
                          .map((name: string) => name.trim())
                          .filter((name: string) => name.length > 0)
                    : [];
                this.valueChange.emit(names);
            });
    }
}
