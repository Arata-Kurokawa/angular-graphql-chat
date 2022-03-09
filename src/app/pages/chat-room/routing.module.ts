import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChatRoomIndexComponent } from './index/chat-room-index.component'

const routes: Routes = [
  {
    path: '',
    component: ChatRoomIndexComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoomRoutingModule {

}
