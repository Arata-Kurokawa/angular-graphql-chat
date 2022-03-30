import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { KafkaComponent } from '@app/pages/kafka/kafka.component'

const routes: Routes = [
  {
    path: '',
    component: KafkaComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KafkaRoutingModule {

}
