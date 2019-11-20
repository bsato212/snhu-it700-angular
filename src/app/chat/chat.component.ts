import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Message {
  text: string;
  ts: number;
  name: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  name: string;
  messages: Message[];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.name = this.route.snapshot.queryParamMap.get('name');
    this.messages = [];
  }

  onSend(text: string) {
    this.messages.push({
      text,
      ts: Date.now(),
      name: 'You',
    });

    setTimeout(() => {
      this.messages.push({
        text: `${this.name} responded to '${text}'`,
        ts: Date.now(),
        name: this.name,
      });
    }, 1000);
  }
}
