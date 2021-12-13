import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Message, Stomp} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  TOPIC: string = "/topic/greetings";
  ENDPOINT: string = environment.ws;
  _SYN: number = 0;
  _ACK: number = 0;
  _PSH: number = 0;
  _RST: number = 0;
  _FIN: number = 0;
  _URG: number = 0;

  constructor() {
  }

  openSocket() {
    const _this = this;
    let config = new WebsocketService();
    // console.log("initializing WebSocket..."); //Uncomment for enable logging console

    //Configure The WebSocket
    let STOMP_JS = Stomp.over(function () {
      return new SockJS(config.ENDPOINT);
    });

    //Stomp config
    STOMP_JS.reconnectDelay = 3000;
    STOMP_JS.debug = closeDebug => closeDebug; //Disable Debug #1 - Uncomment for Enable debug
    // STOMP_JS.debug = function (str){} //Disable Debug #2 - Uncomment for Enable debug

    const headers = function (header: any) {
      //Optional
    };

    const connect_callback = function (connect: any) {
      // console.log(JSON.parse(JSON.stringify(connect))); //Comment this for disable logging on console
      let command = JSON.parse(JSON.stringify(connect));
      console.log('[Websocket status]: ' + command['command']);
      STOMP_JS.subscribe(config.TOPIC, listener_callback);
    };

    const listener_callback = function (event: Message) {
      if (event.body.length > 0) {
        _this._onReceivedMessage(event);
      }
    };

    const error_callback = function (message: any) {
      let parseMessage = JSON.parse(JSON.stringify(message)); //Comment this for disable logging on console
      // console.log(parseMessage);
    }

    const close_callback = function (message: any) {
      let parseMessage = JSON.parse(JSON.stringify(message)); //Comment this for disable logging on console
      // console.log(parseMessage);
    }

    return STOMP_JS.connect(headers, connect_callback, error_callback, close_callback);
  }

  _onReceivedMessage(event: Message) {
    let parseData = JSON.parse(event.body);
    let dateFormat: string = parseData['dateFormat'];
    let data = parseData['data'];

    if (dateFormat != null && data != null) {
      switch (data) {
        case 'SYN':
          if (this._SYN != 0) {
            this._SYN += 1;
            if (this._SYN == 101) {
              this._SYN -= 5;
            }
          } else this._SYN += 1;
          break;

        case 'ACK':
          if (this._ACK != 0) {
            this._ACK += 1;
            if (this._ACK == 101) {
              this._ACK -= 5;
            }
          } else this._ACK += 1;
          break;

        case 'PSH':
          if (this._PSH != 0) {
            this._PSH += 1;
            if (this._PSH == 101) {
              this._PSH -= 5;
            }
          } else this._PSH += 1;
          break;

        case 'RST':
          if (this._RST != 0) {
            this._RST += 1;
            if (this._RST == 101) {
              this._RST -= 5;
            }
          } else this._RST += 1;
          break;

        case 'FIN':
          if (this._FIN != 0) {
            this._FIN += 1;
            if (this._FIN == 101) {
              this._FIN -= 5;
            }
          } else this._FIN += 1;
          break;

        case 'URG':
          if (this._URG != 0) {
            this._URG += 1;
            if (this._URG == 101) {
              this._URG -= 5;
            }
          } else this._URG += 1;
          break;

        case 'NO_DATA':
          if (this._SYN != 0) {
            this._SYN -= 1
          }
          if (this._ACK != 0) {
            this._ACK -= 1
          }
          if (this._PSH != 0) {
            this._PSH -= 1
          }
          if (this._RST != 0) {
            this._RST -= 1
          }
          if (this._FIN != 0) {
            this._FIN -= 1
          }
          if (this._URG != 0) {
            this._URG -= 1
          }
          break;
      }
    }
  }
}
