import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';

@Injectable()
export class MaskService {

    // date = [/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /[1-2]/, /\d/, /\d/, /\d/]; // '00/00/0000';
    date = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]; // '00/00/0000';
    time = [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]; // '00:00:00';
    datetime = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/];
    timeshort = [/\d/, /\d/, ':', /\d/, /\d/]; // '00:00';
    cep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]; // '00000-000';
    telFixo = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]; //  '(00) 0000-0000';
    telCelular = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]; //  '(00) 00000-0000';
    cpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]; // '000.000.000-00';
    // tslint:disable-next-line:max-line-length
    cnpj = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]; // '00.000.000/0000-00';
    cei = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]; // 11 ou 12 digitos numericos
    money = [/{0-3}/, /\d/, '.', /[0-1]/, /\d/, ',', /[1-2]/, /\d/, /\d/, /\d/];
    altura = [/[0-2]/, ',', /\d/, /\d/];
    peso = [/\d/, /\d/, /\d/];
    digito = [/\d/];
    placaVeiculo = [/[a-z]/, /[a-z]/, /[a-z]/, '-', /\d/, /\d/, /\d/, /\d/];
    renavam = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    ano = [/\d/, /\d/, /\d/, /\d/];
    rg = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    compentencia = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

    datePipe: any;

    constructor() {
        // this.datePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');
    }

    telefone(input: string) {
        let mask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]; //  '(00) 00000-0000';
        if (input) {
            if (input.length > 14) {
                mask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]; //  '(00) 00000-0000';
            }
        }
        return mask;
    }

    toDatePicker(isoDate: string): Date {
        if (!isoDate) {
            return new Date;
        }
        return moment(isoDate).toDate();
    }

    toDateFormat(isoDate: string): string {
        if (!isoDate) {
            return '';
        }
        return moment(isoDate).format('DD/MM/YYYY');
    }

    toDecimalFormat(value: number) {
        if (!value) {
            return;
        }
        return value.toString().replace('.', ',');
    }

    toMoneyFormat(value: number): string {
        if (!value) {
            return '';
        }
        let nextValue: string = value.toFixed(2).toString()

        while (nextValue.includes(',')) {
            nextValue.replace(',', ';')
        }

        while (nextValue.includes('.')) {
            nextValue.replace('.', ',')
        }

        while (nextValue.includes(';')) {
            nextValue.replace(';', '.')
        }

        return nextValue
    }

    unmaskNumber(maskedNumber: string) {
        if (!maskedNumber) {
            return maskedNumber;
        }
        return maskedNumber.replace(/\D/g, '');
    }

    unmaskDate(maskedDate: string): string {
        if (!maskedDate) {
            return '';
        }
        return moment(maskedDate, 'DD/MM/YYYY').toISOString();
    }

    unmaskDecimal(maskedDecimal: string | number): number | any {
        if (typeof maskedDecimal === 'number') {
            return maskedDecimal;
        }
        if (!maskedDecimal) {
            return maskedDecimal;
        }
        const value = (<string>maskedDecimal).replace('.', '').replace(',', '.');
        return parseFloat(value);
    }
    unmaskCep(maskedCep: string): string {
        if (!maskedCep) { return ''; }

        return maskedCep.replace('.', '').replace('-', '');
    }

    unmaskTelefone(maskedTelefone: string): string {
        if (!maskedTelefone) { return ''; }

        return maskedTelefone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '');
    }
    unmaskCnpj(maskedCnpj: string): string {
        if (!maskedCnpj) { return ''; }

        maskedCnpj = maskedCnpj.replace('_', '');
        return maskedCnpj.replace(/[\.\-\/]/g, '');
    }

    unmaskCpf(maskedCpf: string): string {
        if (!maskedCpf) { return ''; }

        return maskedCpf.replace(/[\.\-]/g, '');
    }

    unmaskRg(maskedRg: string): string {
        if (!maskedRg) { return ''; }

        return maskedRg.replace(/[\-\.]/g, '');
    }
}
