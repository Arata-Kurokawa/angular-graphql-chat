import {Component, OnDestroy, OnInit} from '@angular/core'
import {Apollo, graphql} from "apollo-angular";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {ChatRoom} from "@app/models/chat-room";
import {map, take} from "rxjs/operators";
import {FormControl} from "@angular/forms";

const GET_CHAT_ROOM = graphql`
  query GetChatRoom($id: Long!) {
    chatRoom(id: $id) {
      id
      name
      messages {
        id
        chatRoomId
        message
      }
    }
  }
`

const ADD_CHAT_MESSAGE = graphql`
  mutation AddChatMessage($chatRoomId: Long!, $message: String!) {
    addChatMessage(chatRoomId: $chatRoomId, message: $message) {
      id
      chatRoomId
      message
    }
  }
`

const ADDED_CHAT_MESSAGE = graphql`
  subscription AddedChatMessage($chatRoomId: Long!) {
    onAddChatMessage(chatRoomId: $chatRoomId) {
      id
      chatRoomId
      message
    }
  }
`

@Component({
  templateUrl: './chat-room.component.html',
  styleUrls:   ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  chatRoomId!: number

  chatRoom$!: Observable<ChatRoom>

  messageForm = new FormControl()

  private subscription: Subscription = new Subscription()

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {
  }


  ngOnInit() {
    this.chatRoomId = Number(this.route.snapshot.params["id"])
    this.chatRoom$ = this.apollo.watchQuery<any>({
      query: GET_CHAT_ROOM,
      variables: { id: this.chatRoomId }
    })
      .valueChanges
      .pipe(
        map(({data, loading}) => data.chatRoom)
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  addMessage() {
    const message = this.messageForm.value
    if (!!message) {
      this.subscription.add(
        this.apollo.mutate({
          mutation: ADD_CHAT_MESSAGE,
          variables: {
            chatRoomId: this.chatRoomId,
            message: message
          }
        })
        .pipe(
          take(1)
        )
        .subscribe()
      )
    }
  }
}
