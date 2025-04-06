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

const notas = [
  { titulo: "Pedido Urgente", fecha: "2025-04-06", descripcion: "Revisar disponibilidad de acetaminofén.", color: "#4db6ac" },
  { titulo: "Actualizar precios", fecha: "2025-04-05", descripcion: "Revisar márgenes en dispositivos médicos.", color: "#9575cd" },
  { titulo: "Nueva normativa", fecha: "2025-04-04", descripcion: "Incluir ley 2025 en la facturación.", color: "#ff8a65" },
  { titulo: "Capacitación", fecha: "2025-04-03", descripcion: "Formación en manejo de inventario.", color: "#7986cb" },
  { titulo: "Visita proveedor", fecha: "2025-04-02", descripcion: "Coordinar cita con Biofarma.", color: "#81c784" },
  { titulo: "Limpieza general", fecha: "2025-04-01", descripcion: "Jueves a las 6 PM.", color: "#f06292" },
  { titulo: "Verificar caducidades", fecha: "2025-03-31", descripcion: "Control de vencimientos semanales.", color: "#ba68c8" },
  { titulo: "Actualizar clientes", fecha: "2025-03-30", descripcion: "Ingresar nuevos registros en sistema.", color: "#4fc3f7" },
  { titulo: "Revisión caja", fecha: "2025-03-29", descripcion: "Balance y arqueo diario.", color: "#a1887f" },
];

const grid = document.getElementById("notasGrid");

notas.forEach((nota, index) => {
  const card = document.createElement("div");
  card.classList.add("nota-card");
  card.style.backgroundColor = nota.color;

  card.innerHTML = `
    <h3>${nota.titulo}</h3>
    <p class="fecha">${nota.fecha}</p>
    <p class="descripcion">${nota.descripcion}</p>
    <div class="nota-actions">
      <button class="eliminar-btn" onclick="eliminarNota(${index})">Eliminar</button>
      <input type="checkbox" class="checkbox-realizada" title="Marcar como realizada">
    </div>
  `;

  grid.appendChild(card);
});

function eliminarNota(index) {
  const notaCards = document.querySelectorAll(".nota-card");
  if (notaCards[index]) {
    notaCards[index].remove();
  }
}
