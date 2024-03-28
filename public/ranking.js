class BodyMSG {
    constructor(ranking, nombre, monto) {
      this.ranking = ranking;
      this.nombre = nombre;
      this.monto = monto;
    }
  
    render() {
      return `
        <ul class="list-group-item">
          <div class="row align-items-start" style="margin-top: 3px;">
            <div class="col">
            ${this.ranking}
            </div>
            <div class="col">
            ${this.nombre}
            </div>
            <div class="col">
            ${this.monto}
            </div>
          </div>
        </ul>
      `;
    }
  }

  window.addEventListener('load', () => {
    let datos;
    fetch('/datos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        data.sort((a, b) => b.cantidad - a.cantidad);
        let contador = 1
        // Recorrer los elementos del JSON y mostrarlos en la tabla
        data.forEach(element => {
          const ejemplo = new BodyMSG(contador++, element.nombre, element.cantidad);
          const div = document.createElement("div");
          div.innerHTML = ejemplo.render();
          table.appendChild(div); // Agregar el div generado a la tabla
        });
        // Aquí puedes realizar operaciones con los datos obtenidos
      })
      .catch(error => {
        console.error('Error:', error);
      });

  });

const table =document.getElementById("tabla")
const div = document.createElement("div");


table.appendChild(div)
