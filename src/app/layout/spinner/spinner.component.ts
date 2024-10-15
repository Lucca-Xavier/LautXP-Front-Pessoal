import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loader.getLoading()" class="cssload-container">
    <div class="cssload-speeding-wheel"></div>
</div>
  `,
  styleUrls: ['./spinner.scss']
})
export class SpinnerComponent {
  loading: boolean;
  constructor(public loader: LoaderService) { }

}
