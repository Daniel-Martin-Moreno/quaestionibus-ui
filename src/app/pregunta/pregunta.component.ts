import { Component, OnInit } from '@angular/core';
import { PreguntaService } from '../pregunta.service';
import { Pregunta, PreguntaForSaving} from '../pregunta';
import { Tema} from '../pregunta';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '115',
      minHeight: '115',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  pregunta: Pregunta;
  preguntaFS: PreguntaForSaving
  idTemaNuevo: string;
  idConvocatoriaTemaNuevo: string;
  numeroTemaNuevo: string;
  parteTemaNuevo: string;

  partes = [
    {id: "COMUN", name: "COMUN"},
    {id: "ESPECIFICA", name: "ESPECIFICA"},
    {id: "NO_APLICA", name: "NO_APLICA"}
  ];
  selectedParte = {id: "ESPECIFICA", name: "ESPECIFICA"};

  constructor(private actRoute: ActivatedRoute,
    private preguntaService: PreguntaService) { 
      var idConvocatoria = this.actRoute.snapshot.paramMap.get('idConvocatoria');
      var numero = this.actRoute.snapshot.paramMap.get('numero');
      this.idTemaNuevo = "";
      this.idConvocatoriaTemaNuevo = "18";
      this.numeroTemaNuevo = "";
      this.parteTemaNuevo = "";
      this.getPregunta(idConvocatoria,numero);
      this.preguntaFS = {idPregunta:0,comentarios:"",rutaImagen:""}
    }

  ngOnInit() {
    console.log("en el OnInit");
    console.log("preguntaFS->"+this.preguntaFS)
  }


  getPregunta(idConvocatoria, numero): void {
    this.preguntaService.getPregunta(idConvocatoria, numero)
    .subscribe(pregunta => this.pregunta = pregunta);
  }

  /*
  save():void{
    this.preguntaService.updatePreguntaComentarios(this.pregunta.idPregunta, this.pregunta.comentarios)
    .subscribe(pregunta => this.pregunta = pregunta);
    alert("Datos guardados");
  }
  */
  
 
  save():void{
    this.preguntaFS.idPregunta = this.pregunta.idPregunta;
    this.preguntaFS.comentarios = this.pregunta.comentarios;
    this.preguntaFS.rutaImagen = (this.pregunta.rutaImagen === "")?null:this.pregunta.rutaImagen;
    this.preguntaService.updatePregunta(this.pregunta.idPregunta, this.preguntaFS)
    .subscribe(pregunta => this.pregunta = pregunta);
    alert("Datos guardados");
  }
 
  desasociarTema(idTema): void{
    this.preguntaService.removeTemaToPregunta(this.pregunta.idPregunta, idTema)
    .subscribe(pregunta => this.pregunta = pregunta);
  }

  asociarTema(): void{
    //alert("asociandoTema"+this.idTemaNuevo);
    if (this.idTemaNuevo!=null && this.idTemaNuevo!="")
    this.preguntaService.addTemaToPregunta(this.pregunta.idPregunta, this.idTemaNuevo)
    .subscribe(pregunta => this.pregunta = pregunta);
  }

  asociarTemaPorPropiedadesTema(): void{
    //alert("asociandoTema"+this.idTemaNuevo);
    if (this.idConvocatoriaTemaNuevo!=null && this.idConvocatoriaTemaNuevo!=""
    && this.numeroTemaNuevo!=null && this.numeroTemaNuevo!="")
    this.preguntaService.addTemaToPreguntaByCaractsTema(this.pregunta.idPregunta, this.idConvocatoriaTemaNuevo, this.numeroTemaNuevo, this.selectedParte.id)
    .subscribe(pregunta => this.pregunta = pregunta);
    this.idConvocatoriaTemaNuevo = "18";
    this.numeroTemaNuevo = "";
    this.parteTemaNuevo = "";
  }


}
