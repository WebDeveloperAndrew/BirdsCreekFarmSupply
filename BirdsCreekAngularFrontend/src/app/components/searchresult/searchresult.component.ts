import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss']
})
export class SearchresultComponent {
  
  @Input() title: string;
  @Input() subtitle: string;
  @Input() logo: string;
  @Input() brand: string;
  @Input() info: string;
  @Input() description: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

}
