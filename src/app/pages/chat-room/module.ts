import { NgModule } from '@angular/core'
import { ChatRoomIndexComponent } from './index/chat-room-index.component'
import { ChatRoomRoutingModule } from './routing.module'

@NgModule({
  declarations: [
    ChatRoomIndexComponent
  ],
  imports: [
    ChatRoomRoutingModule
  ]
})
export class ChatRoomModule {}
