import { Component, OnInit } from '@angular/core'

@Component({
  templateUrl: './chat-room.component.html',
  styleUrls:   ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  chatRoomId!: number

  ngOnInit() {
  }
}
