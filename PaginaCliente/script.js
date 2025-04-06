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



const clienteForm = document.getElementById('cliente-form');
const tablaClientes = document.getElementById('tabla-clientes');
const filtroClientes = document.getElementById('filtro-clientes');
const limpiarBtn = document.getElementById('limpiar-form');
let clienteEditandoId = null;

async function cargarClientes() {
  const res = await fetch('http://localhost:3000/api/clientes');
  const clientes = await res.json();
  console.log(clientes);
  renderizarClientes(clientes);
}

function renderizarClientes(clientes) {
  tablaClientes.innerHTML = '';
  clientes.forEach(cliente => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${cliente.nombre}</td>
      <td>${cliente.identificacion}</td>
      <td>${cliente.correo || ''}</td>
      <td>${cliente.telefono || ''}</td>
      <td>
        <button class="editar" onclick="editarCliente(${cliente.id}, '${cliente.nombre}', '${cliente.identificacion}', '${cliente.correo}', '${cliente.telefono}')">✏️</button>
        <button class="eliminar" onclick="eliminarCliente(${cliente.id})">🗑️</button>
      </td>
    `;
    tablaClientes.appendChild(fila);
  });
}

clienteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(clienteForm));

  if (clienteEditandoId) {
    await fetch(`http://localhost:3000/api/clientes/${clienteEditandoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    clienteEditandoId = null;
  } else {
    await fetch('http://localhost:3000/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  clienteForm.reset();
  cargarClientes();
});

limpiarBtn.addEventListener('click', () => {
  clienteForm.reset();
  clienteEditandoId = null;
});

filtroClientes.addEventListener('input', async (e) => {
  const filtro = e.target.value.toLowerCase();
  const res = await fetch('http://localhost:3000/api/clientes');
  const clientes = await res.json();
  const filtrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(filtro) ||
    c.identificacion.toLowerCase().includes(filtro) ||
    (c.correo && c.correo.toLowerCase().includes(filtro)) ||
    (c.telefono && c.telefono.toLowerCase().includes(filtro))
  );
  renderizarClientes(filtrados);
});

async function eliminarCliente(id) {
  if (confirm('¿Estás seguro de eliminar este cliente?')) {
    await fetch(`http://localhost:3000/api/clientes/${id}`, {
      method: 'DELETE'
    });
    cargarClientes();
  }
}

function editarCliente(id, nombre, identificacion, correo, telefono) {
  clienteForm.nombre.value = nombre;
  clienteForm.identificacion.value = identificacion;
  clienteForm.correo.value = correo;
  clienteForm.telefono.value = telefono;
  clienteEditandoId = id;
}

cargarClientes();
