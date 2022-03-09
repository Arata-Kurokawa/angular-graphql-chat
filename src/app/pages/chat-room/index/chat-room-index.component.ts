import { Component, OnInit } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'

const GET_CHAT_ROOMS = gql`
  query GetChatRooms {
    chatRooms {
      id
      name
    }
  }
`

const GET_CHAT_ROOM = gql`
  query GetChatRoom($id: Long!) {
    chatRoom(id: $id) {
      id
      name
    }
  }
`

@Component({
  templateUrl: './chat-room-index.html',
  styleUrls:   ['./chat-room-index.scss']
})
export class ChatRoomIndexComponent implements OnInit {
  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: GET_CHAT_ROOM,
      variables: {
        id: 1
      },
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(JSON.stringify(data))
      });
  }
}
