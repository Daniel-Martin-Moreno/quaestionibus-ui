import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { ConvocatoriaComponent } from './convocatoria/convocatoria.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule }   from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TemaDetailComponent } from './tema-detail/tema-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ConvocatoriaComponent,
    PreguntaComponent,    
    HomeComponent, TemaDetailComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
