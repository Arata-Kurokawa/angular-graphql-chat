import { NgModule } from '@angular/core'
import { ChatRoomsComponent } from './chat-rooms.component'
import { ChatRoomRoutingModule } from './routing.module'
import { CommonModule } from '@angular/common'
import { ChatRoomComponent } from './room/chat-room.component'

@NgModule({
  declarations: [
    ChatRoomsComponent,
    ChatRoomComponent
  ],
  imports: [
    ChatRoomRoutingModule,
    CommonModule
  ]
})
export class ChatRoomModule {}
