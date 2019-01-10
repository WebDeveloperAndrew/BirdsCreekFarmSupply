import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brandresult',
  templateUrl: './brandresult.component.html',
  styleUrls: ['./brandresult.component.scss']
})
export class BrandresultComponent {

  @Input() name: string;
  @Input() link: string;
  @Input() description: string;
  @Input() info: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

}
