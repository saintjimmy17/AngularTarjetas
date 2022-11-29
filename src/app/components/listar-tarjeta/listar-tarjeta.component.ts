import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../services/tarjeta.service';
import { TarjetaCredito } from '../../models/TarjetaCredito';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {
  listTarjetas: TarjetaCredito[] = [];

  constructor(private tarjetaService: TarjetaService) { }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this.tarjetaService.obtenerTarjetas().subscribe(doc => {
      this.listTarjetas = []
      doc.forEach((element: any) => {
        this.listTarjetas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  eliminarTarjeta(id: any){
    this.tarjetaService.eliminarTarjeta(id).then(()=>{
      console.log('Tarjeta eliminada');
    },error => {
      console.log(error)
    })
  }

  editarTarjeta(tarjeta: TarjetaCredito){
    this.tarjetaService.addTarjetaEdit(tarjeta);
  }

}
