const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.includes("PaginaCliente")) {
    document.querySelector(".menu-item.clientes").classList.add("active");
  } else if (path.includes("PaginaInventario")) {
    document.querySelector(".menu-item.inventario").classList.add("active");
  } else if (path.includes("PaginaVenta")) {
    const ventaBtn = document.querySelector(".menu-item.venta");
    ventaBtn.classList.add("active");
    ventaBtn.style.backgroundColor = "#ef5350"; // rojo para venta activa
  } else if (path.includes("PaginaReporte")) {
    document.querySelector(".menu-item.reporte").classList.add("active");
  } else if (path.includes("PaginaInicio")) {
    document.querySelector(".menu-item.inicio").classList.add("active");
  }
});


const mainContent = document.getElementById("main-content");

// Colores básicos
const colors = [
  "azul", "rojo", "amarillo", "verde", "naranja",
  "morado", "rosado", "marron", "turquesa", "gris"
];

mainContent.innerHTML = `
  <h2>Crear Nueva Nota</h2>
  <form id="nota-form" class="nota-form">
    <label>Título:</label>
    <input type="text" id="titulo" required>

    <label>Descripción:</label>
    <textarea id="descripcion" rows="3" required></textarea>

    <label>Color:</label>
    <div id="color-selector" class="color-selector">
      ${colors.map(color => `
        <label class="color-option" style="background-color:${color}">
          <input type="radio" name="color" value="${color}" required>
        </label>
      `).join('')}
    </div>

    <label>Cliente (opcional):</label>
    <input type="text" id="cliente-input" placeholder="Buscar cliente...">
    <ul id="cliente-sugerencias" class="sugerencias-lista"></ul>

    <div class="botones-formulario">
      <button type="submit">Guardar</button>
      <button type="button" id="limpiar-btn">Limpiar</button>
    </div>
  </form>

  <h2>Notas Registradas</h2>
  <table id="tabla-notas">
    <thead>
      <tr>
        <th>Título</th>
        <th>Fecha</th>
        <th>Descripción</th>
        <th>Color</th>
        <th>Cliente</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody id="notas-body">
      <!-- Aquí se renderizan las notas -->
    </tbody>
  </table>
`;

const clienteInput = document.getElementById("cliente-input");
const sugerencias = document.getElementById("cliente-sugerencias");
let clienteSeleccionado = null;

// Autocompletar clientes
clienteInput.addEventListener("input", async () => {
  const search = clienteInput.value.trim();
  if (search.length < 2) {
    sugerencias.innerHTML = "";
    return;
  }

  const response = await fetch(`/api/clientes?search=${encodeURIComponent(search)}`);
  const clientes = await response.json();

  sugerencias.innerHTML = clientes.map(cliente =>
    `<li data-id="${cliente.id}">${cliente.nombre} (${cliente.identificacion})</li>`
  ).join("");
});

// Seleccionar cliente de la lista
sugerencias.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    clienteSeleccionado = {
      id: e.target.getAttribute("data-id"),
      nombre: e.target.textContent
    };
    clienteInput.value = clienteSeleccionado.nombre;
    sugerencias.innerHTML = "";
  }
});

// Limpiar formulario
document.getElementById("limpiar-btn").addEventListener("click", () => {
  document.getElementById("nota-form").reset();
  clienteSeleccionado = null;
  sugerencias.innerHTML = "";
});

// Guardar nota
document.getElementById("nota-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const color = document.querySelector('input[name="color"]:checked').value;
  const cliente_id = clienteSeleccionado ? clienteSeleccionado.id : null;

  const nuevaNota = {
    titulo,
    descripcion,
    color,
    cliente_id
  };

  const response = await fetch("/api/notas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaNota)
  });

  if (response.ok) {
    alert("Nota creada exitosamente.");
    document.getElementById("nota-form").reset();
    clienteSeleccionado = null;
    sugerencias.innerHTML = "";
    cargarNotas(); // Refresca la tabla
  } else {
    alert("Error al crear la nota.");
  }
});

// Cargar notas en tabla
async function cargarNotas() {
  const response = await fetch("/api/notas");
  const notas = await response.json();

  const tbody = document.getElementById("notas-body");
  tbody.innerHTML = notas.map(nota => `
    <tr>
      <td>${nota.titulo}</td>
      <td>${nota.fecha_creacion}</td>
      <td>${nota.descripcion}</td>
      <td><div style="width:20px;height:20px;background:${nota.color};border-radius:50%"></div></td>
      <td>${nota.cliente_nombre ?? '-'}</td>
      <td>
        <button onclick="editarNota(${nota.id})">Editar</button>
        <button onclick="eliminarNota(${nota.id})">Eliminar</button>
      </td>
    </tr>
  `).join("");
}

// Eliminar nota
async function eliminarNota(id) {
  if (confirm("¿Estás seguro de eliminar esta nota?")) {
    const res = await fetch(`/api/notas/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Nota eliminada.");
      cargarNotas();
    } else {
      alert("Error al eliminar.");
    }
  }
}

window.editarNota = function (id) {
  alert("Funcionalidad de edición en desarrollo para nota ID: " + id);
};

// Al cargar la página
cargarNotas();
