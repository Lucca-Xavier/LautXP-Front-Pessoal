import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="this.loading" class="cssload-container">
    <div class="cssload-speeding-wheel"></div>
</div>
  `,
  styleUrls: ['./spinner.scss']
})
export class SpinnerComponent implements OnInit {
  loading: boolean;
  constructor(public loader: LoaderService) { }
  ngOnInit(): void {
    this.loading = this.loader.getLoading();
  }
}
