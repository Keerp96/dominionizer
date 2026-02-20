import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ManualKingdomCardSelectComponent } from './manual-kingdom-card-select.component';

describe('ManualKingdomCardSelectComponent', () => {
    let component: ManualKingdomCardSelectComponent;
    let fixture: ComponentFixture<ManualKingdomCardSelectComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ManualKingdomCardSelectComponent, NoopAnimationsModule],
            providers: [UntypedFormBuilder],
        });

        fixture = TestBed.createComponent(ManualKingdomCardSelectComponent);
        component = fixture.componentInstance;
    });

    describe('formGroup', () => {
        it('should have a cardNames FormControl', () => {
            fixture.detectChanges();

            expect(component.formGroup.contains('cardNames')).toBeTrue();
        });

        it('should initialize cardNames with empty string when initialValue is empty', () => {
            component.initialValue = [];
            fixture.detectChanges();

            expect(component.formGroup.get('cardNames')?.value).toBe('');
        });

        it('should initialize cardNames with joined initialValue', () => {
            component.initialValue = ['Village', 'Smithy'];
            fixture.detectChanges();

            expect(component.formGroup.get('cardNames')?.value).toBe('Village, Smithy');
        });

        it('with value change should emit parsed card names', () => {
            fixture.detectChanges();
            const emitSpy = spyOn(component.valueChange, 'emit');

            component.formGroup.get('cardNames')?.setValue('Village, Smithy, Market');

            expect(emitSpy).toHaveBeenCalledWith(['Village', 'Smithy', 'Market']);
        });

        it('with value change should trim whitespace from card names', () => {
            fixture.detectChanges();
            const emitSpy = spyOn(component.valueChange, 'emit');

            component.formGroup.get('cardNames')?.setValue('  Village  ,  Smithy  ');

            expect(emitSpy).toHaveBeenCalledWith(['Village', 'Smithy']);
        });

        it('with empty value change should emit empty array', () => {
            fixture.detectChanges();
            const emitSpy = spyOn(component.valueChange, 'emit');

            component.formGroup.get('cardNames')?.setValue('');

            expect(emitSpy).toHaveBeenCalledWith([]);
        });

        it('with value containing empty entries should filter them out', () => {
            fixture.detectChanges();
            const emitSpy = spyOn(component.valueChange, 'emit');

            component.formGroup.get('cardNames')?.setValue('Village, , Smithy');

            expect(emitSpy).toHaveBeenCalledWith(['Village', 'Smithy']);
        });
    });
});
