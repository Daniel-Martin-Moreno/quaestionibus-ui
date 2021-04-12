export class Pregunta {
    idConvocatoria: number;
    idPregunta: number;
    enunciado: string;
    respuesta1: string;
    respuesta2: string;
    respuesta3: string;
    respuesta4: string;
    comentarios: string;    
    solucion: number;
    anulada: boolean;
    numero:number;
    parte: string;
    rutaImagen: string;
    temas: Tema[]
  }
  export class Tema {
    idTema: number;
    idConvocatoria: number;
    enunciado: string;
    numero: number;
    parte: string;
  }  
  export class PreguntaForSaving {
    idPregunta: number;
    comentarios: string;    
    rutaImagen: string;
  }