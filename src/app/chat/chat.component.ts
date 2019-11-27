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

  onSend(input: any) {
    const text = input.value;

    if (!text.length) {
      return;
    }

    input.value = '';

    this.messages.push({
      text,
      ts: Date.now(),
      name: 'You',
    });

    input.scrollIntoView();

    setTimeout(() => {
      this.messages.push({
        text: `${this.name} responded to '${text}'`,
        ts: Date.now(),
        name: this.name,
      });

      input.scrollIntoView();
    }, 1000);
  }

  onKey(event, input) {
    if (event.key === 'Enter') {
      this.onSend(input);
    }
  }
}
