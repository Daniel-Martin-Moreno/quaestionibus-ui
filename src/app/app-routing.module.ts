import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConvocatoriaComponent } from './convocatoria/convocatoria.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { TemaDetailComponent } from './tema-detail/tema-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'convocatoria', component: ConvocatoriaComponent },
  { path: 'convocatoria/:idConvocatoria/pregunta/:numero', component: PreguntaComponent },
  { path: 'convocatoria/:idConvocatoria/tema/:numero/parte/:parte/preguntas', component: TemaDetailComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
