import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

import * as maptilersdk from '@maptiler/sdk';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    maptilersdk.config.apiKey = environment.maptilerToken;

  }

}
