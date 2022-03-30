import { NgModule } from '@angular/core'
import { KafkaComponent } from '@app/pages/kafka/kafka.component'
import { KafkaRoutingModule } from '@app/pages/kafka/routing.module'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    KafkaComponent
  ],
  imports: [
    KafkaRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class KafkaModule {}
