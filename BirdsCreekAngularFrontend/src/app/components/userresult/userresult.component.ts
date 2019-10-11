import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-userresult',
  templateUrl: './userresult.component.html',
  styleUrls: ['./userresult.component.scss']
})
export class UserresultComponent{

  @Input() username: string;
  @Input() name: string;
  @Input() image: string;

  constructor() { }


}
