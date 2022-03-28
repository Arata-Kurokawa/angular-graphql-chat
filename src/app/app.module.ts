import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { HttpClientModule } from '@angular/common/http'
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache, split } from '@apollo/client/core'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities/graphql/getFromAST'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        // Create an http link:
        const http = httpLink.create({
          uri: 'http://localhost:9000/graphql',
        });

        // // Create a WebSocket link:
        // const ws = new WebSocketLink({
        //   uri: `ws://localhost:9000/webSocket`,
        //   options: {
        //     reconnect: false,
        //   },
        // });
        //
        // // using the ability to split links, you can send data to each link
        // // depending on what kind of operation is being sent
        // const link = split(
        //   // split based on operation type
        //   ({query}) => {
        //     const definitionNode = getMainDefinition(query)
        //     return definitionNode.kind === 'OperationDefinition' && definitionNode.operation === 'subscription'
        //   },
        //   ws,
        //   http,
        // )

        return {
          cache: new InMemoryCache(),
          link: http,
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
