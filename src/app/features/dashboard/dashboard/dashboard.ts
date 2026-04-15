import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {

}
