import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {

}
