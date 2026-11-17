const modal = document.getElementById('demoModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');

let stockItems = [
  { nombre: 'Taladro Percutor 650W', stock: 4, precio: '$85.000' },
  { nombre: 'Juego Destornilladores x6', stock: 15, precio: '$18.500' },
  { nombre: 'Cinta Métrica 5m', stock: 2, precio: '$6.200' }
];

function renderStockDemo() {
  let rows = stockItems.map((item, idx) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #e9d5ff;">
      <div>
        <strong>${item.nombre}</strong><br>
        <small style="color:${item.stock <= 4 ? '#dc2626' : '#6b7280'}">
          Stock: ${item.stock} un. ${item.stock <= 4 ? '(⚠ Stock Bajo)' : ''} · ${item.precio}
        </small>
      </div>
      <div style="display:flex;gap:6px;">
        <button onclick="updateStock(${idx}, -1)" style="padding:4px 10px;cursor:pointer;">-1</button>
        <button onclick="updateStock(${idx}, 1)" style="padding:4px 10px;cursor:pointer;">+1</button>
      </div>
    </div>
  `).join('');

  modalContent.innerHTML = `
    <p style="margin-bottom:12px;color:#4b5563;">Probá sumar o restar unidades para ver las alertas de stock:</p>
    ${rows}
  `;
}

function updateStock(index, delta) {
  if (stockItems[index].stock + delta >= 0) {
    stockItems[index].stock += delta;
    renderStockDemo();
  }
}

function openDemo(tipo) {
  modal.classList.add('open');
  if (tipo === 'stock') {
    modalTitle.textContent = 'Demo: Control de Stock en Tiempo Real';
    renderStockDemo();
  } else if (tipo === 'turnos') {
    modalTitle.textContent = 'Demo: Reserva de Turnos Online';
    modalContent.innerHTML = `
      <p style="margin-bottom:10px;">Simulá la reserva de un turno:</p>
      <input id="pacienteInput" type="text" placeholder="Nombre del paciente" style="width:100%;padding:8px;margin-bottom:10px;border:1px solid #d8b4fe;border-radius:6px;">
      <select id="horaInput" style="width:100%;padding:8px;margin-bottom:12px;border:1px solid #d8b4fe;border-radius:6px;">
        <option>Mañana - 10:30 hs (Clínica Médica)</option>
        <option>Mañana - 11:15 hs (Odontología)</option>
        <option>Jueves - 16:00 hs (Pediatría)</option>
      </select>
      <button onclick="confirmarTurno()" class="btn btn-primary" style="width:100%;border:none;cursor:pointer;">Confirmar Turno</button>
      <div id="turnoResultado" style="margin-top:12px;font-weight:600;color:#7c3aed;"></div>
    `;
  } else {
    modalTitle.textContent = 'Vista Previa: Catálogo Mayorista';
    modalContent.innerHTML = `
      <p>✔ Carga rápida de productos por curva de talles y colores.</p>
      <p style="margin:10px 0;">✔ Cálculo automático de mínimos de compra mayorista.</p>
      <p>✔ Comprobante de pedido directo a WhatsApp y panel de gestión.</p>
    `;
  }
}

function confirmarTurno() {
  const pac = document.getElementById('pacienteInput').value || 'Paciente de prueba';
  const hora = document.getElementById('horaInput').value;
  document.getElementById('turnoResultado').textContent = `✅ Turno reservado para ${pac} (${hora}).`;
}

function closeDemo() {
  modal.classList.remove('open');
}