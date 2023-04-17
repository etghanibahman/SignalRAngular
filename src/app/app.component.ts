import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SignalRClient';

  private hubConnectionBuilder!: HubConnection;
  offers: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl('https://localhost:7219/offers')
      .configureLogging(LogLevel.Information)
      .build();
    this.hubConnectionBuilder
      .start()
      .then(() => console.log('Connection started.......!'))
      .catch(err => console.log('Error while connect with server'));

    this.startNewHttpRequest();
    this.hubConnectionBuilder.on('SendOffersToUser', (data: any) => {
      console.log('got the offers');
      console.log(data);
      this.offers.push(data);
    });
  }

  private startNewHttpRequest = () => {
    this.http.post('https://localhost:7219/api/ProductOffer/TestData','hi')
      .subscribe(res => {
        console.log(res);
      },
      error => console.log('oops', error))
      
  }
}