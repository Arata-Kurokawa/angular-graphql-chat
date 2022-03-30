import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'chat-rooms',
    loadChildren: () => import('./pages/chat-rooms/module').then(m => m.ChatRoomModule),
  },
  {
    path: 'kafka',
    loadChildren: () => import('./pages/kafka/module').then(m => m.KafkaModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
