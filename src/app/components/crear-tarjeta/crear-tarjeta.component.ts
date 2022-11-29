import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaCredito } from '../../models/TarjetaCredito';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private tarjetaService: TarjetaService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    })
   }

  ngOnInit(): void {
    this.tarjetaService.getTarjetaEdit().subscribe(data => {
      console.log(data);
    })
  }

  crerTarjeta(){
    const TARJETA: TarjetaCredito = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }

    this.loading = true;

    console.log(TARJETA);
    this.tarjetaService.guardarTarjeta(TARJETA).then(() =>{
      this.loading = false;
      console.log('tarjeta hecho');
      this.form.reset();
    }, error => {
      this.loading = false;
      console.log(error);
    })
  }

}
