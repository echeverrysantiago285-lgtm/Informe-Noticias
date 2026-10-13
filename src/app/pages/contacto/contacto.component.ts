import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
})
export class ContactoComponent {
  modelo = { nombre: '', correo: '', asunto: '', mensaje: '' };
  envioExitoso = false;
  mensajeConfirmacion = '';

  enviar(formulario: NgForm): void {
    if (formulario.invalid) {
      this.envioExitoso = false;
      return;
    }

    // Simulación de envío exitoso (no hay backend real en este prototipo)
    this.mensajeConfirmacion = `¡Gracias, ${this.modelo.nombre}! Tu mensaje fue enviado correctamente. Te responderemos a ${this.modelo.correo} en las próximas 24 horas.`;
    this.envioExitoso = true;
    formulario.resetForm();
  }
}
