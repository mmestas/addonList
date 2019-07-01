import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DndModule } from 'ngx-drag-drop';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { CustomFilterPipe } from './custom-filter.pipe';
import { CustomFilter2Pipe } from './custom-filter2.pipe';
import { NgxPopper } from 'angular-popper';
import { SafeUrlPipe } from './safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    CustomFilterPipe,
    CustomFilter2Pipe,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DndModule,
    NgbModule,
    NgxPopper
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
