import { Component, OnInit } from '@angular/core';
import { ConvocatoriaService } from '../convocatoria.service';
import { Convocatoria} from '../convocatoria';

@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.css']
})
export class ConvocatoriaComponent implements OnInit {

  convocatorias: Convocatoria[];

  constructor(private convocatoriaService: ConvocatoriaService) { }

  ngOnInit() {
    console.log("en el OnInit");
    this.getConvocatorias();
  }

  getConvocatorias(): void {
    this.convocatoriaService.getConvocatorias()
    .subscribe(convocatorias => this.convocatorias = convocatorias);
  }

}
