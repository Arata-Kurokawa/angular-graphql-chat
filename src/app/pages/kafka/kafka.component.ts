import { Component, OnDestroy, OnInit } from '@angular/core'
import { BehaviorSubject, pipe, Subscription } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { webSocket } from 'rxjs/webSocket'
import { filter, take } from 'rxjs/operators'
import { FormControl } from '@angular/forms'


@Component({
  templateUrl: './kafka.component.html',
  styleUrls:   ['./kafka.component.scss']
})
export class KafkaComponent implements OnInit, OnDestroy {
  messages$ = new BehaviorSubject<String[]>([])

  private subscription: Subscription = new Subscription()

  errorMessage?: string

  messageForm = new FormControl()

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.subscription.add(
      webSocket<{ message: string }>({ url : 'ws://localhost:9000/kafka/consumer' })
        .pipe(
          filter(data => data.message !== "ping")
        )
        .subscribe(data => {
          const current =this.messages$.value
          const added = [...current, data.message]
          this.messages$.next(added)
        },
          error => {
            this.errorMessage = "接続失敗"
          }
        )
    )
  }


  login() {
    this.subscription.add(
      this.http.get('http://localhost:9000/kafka/login', { withCredentials: true }).pipe(take(1)).subscribe()
    )
  }

  logout() {
    this.subscription.add(
      this.http.get('http://localhost:9000/kafka/logout', { withCredentials: true }).subscribe()
    )
  }

  sendMessage() {
    const message = this.messageForm.value
    if (!!message) {
      this.subscription.add(
        this.http.post('http://localhost:9000/kafka/sendMessage', { message: message }, { withCredentials: true }).subscribe()
      )
    }
  }
}
