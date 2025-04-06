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
