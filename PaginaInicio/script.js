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



document.addEventListener('DOMContentLoaded', async () => {
  const notasContainer = document.querySelector('.notas-container');

  try {
    const response = await fetch('http://localhost:3000/api/notas');
    const notas = await response.json();

    notasContainer.innerHTML = ''; // Limpiar contenido anterior

    notas.forEach(nota => {
      const notaCard = document.createElement('div');
      notaCard.className = 'nota-card';
      notaCard.style.backgroundColor = nota.color || '#333'; // Color por defecto

      notaCard.innerHTML = `
        <div class="nota-titulo">${nota.titulo}</div>
        <div class="nota-fecha">${new Date(nota.fecha_creacion).toLocaleDateString()}</div>
        <div class="nota-descripcion">${nota.descripcion}</div>
        <div class="nota-acciones">
          <button class="btn-eliminar" data-id="${nota.id}">🗑</button>
          <input type="checkbox" class="checkbox-realizada" data-id="${nota.id}" ${nota.realizada ? 'checked' : ''}>
        </div>
      `;

      notasContainer.appendChild(notaCard);
    });

    // Delegar eventos para eliminar o actualizar estado
    notasContainer.addEventListener('click', async (e) => {
      if (e.target.classList.contains('btn-eliminar')) {
        const id = e.target.dataset.id;
        await fetch(`http://localhost:3000/api/notas/${id}`, { method: 'DELETE' });
        location.reload();
      }
    });

    notasContainer.addEventListener('change', async (e) => {
      if (e.target.classList.contains('checkbox-realizada')) {
        const id = e.target.dataset.id;
        const realizada = e.target.checked;
        await fetch(`http://localhost:3000/api/notas/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ realizada })
        });
      }
    });

  } catch (error) {
    console.error('Error cargando notas:', error);
    notasContainer.innerHTML = '<p style="color: red;">Error cargando notas.</p>';
  }
});
