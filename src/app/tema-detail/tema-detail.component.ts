import { Component, OnInit } from '@angular/core';
import { PreguntaService } from '../pregunta.service';
import { Pregunta} from '../pregunta';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tema-detail',
  templateUrl: './tema-detail.component.html',
  styleUrls: ['./tema-detail.component.css']
})
export class TemaDetailComponent implements OnInit {

  preguntas: Pregunta[];

  constructor(private actRoute: ActivatedRoute,
    private preguntaService: PreguntaService) { 
      var idConvocatoria = this.actRoute.snapshot.paramMap.get('idConvocatoria');
      var numero = this.actRoute.snapshot.paramMap.get('numero');
      var parte = this.actRoute.snapshot.paramMap.get('parte');
      this.getPreguntasTema(idConvocatoria,numero,parte);
    }

  ngOnInit() {
    console.log("en el OnInit");
  }


  getPreguntasTema(idConvocatoria, numero, parte): void {
    this.preguntaService.getPreguntasTema(idConvocatoria, numero, parte)
    .subscribe( preguntas => this.preguntas = preguntas);
  }

  


}
