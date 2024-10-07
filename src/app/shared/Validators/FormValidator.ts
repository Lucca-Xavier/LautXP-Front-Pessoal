import { FormControl } from "@angular/forms";

export class FormValidators {
    static celularValido(control: FormControl) {
        var value = control.value;
        if (value && value != '') {
            value = value.replace(/\D/g, '');
            if (value.length < 11 || (value.length === 11 && parseInt(value.substring(2, 3), 10) !== 9)) {
                return { celularInvalido: true };
            }
            const codigosDdd = [11, 12, 13, 14, 15, 16, 17, 18, 19,
                21, 22, 24, 27, 28, 31, 32, 33, 34,
                35, 37, 38, 41, 42, 43, 44, 45, 46,
                47, 48, 49, 51, 53, 54, 55, 61, 62,
                64, 63, 65, 66, 67, 68, 69, 71, 73,
                74, 75, 77, 79, 81, 82, 83, 84, 85,
                86, 87, 88, 89, 91, 92, 93, 94, 95,
                96, 97, 98, 99];
            if (codigosDdd.indexOf(parseInt(value.substring(0, 2), 10)) === -1) {
                return { celularInvalido: true };
            }
        }
        return null;
    }
}