import { Component, OnInit } from '@angular/core'
import { Apollo, graphql } from 'apollo-angular'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ChatRoom } from '@app/models/chat-room'

const GET_CHAT_ROOMS = graphql`
  query GetChatRooms {
    chatRooms {
      id
      name
    }
  }
`

const GET_CHAT_ROOM = graphql`
  query GetChatRoom($id: Long!) {
    chatRoom(id: $id) {
      id
      name
    }
  }
`

@Component({
  templateUrl: './chat-rooms.component.html',
  styleUrls:   ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit {
  chatRooms$!: Observable<ChatRoom[]>
  
  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.chatRooms$ = this.apollo.watchQuery<any>({
      query: GET_CHAT_ROOMS,
    })
      .valueChanges
      .pipe(
        map(({data, loading}) => data.chatRooms)
      )
  }
}
