import React, { useState } from 'react';
import asignaciones from '@site/static/tps/1c2026/correctores_tp1.json';

export default function BuscadorCorrector() {
  const [padron, setPadron] = useState('');
  const [resultado, setResultado] = useState(null);

  const buscar = () => {
    const padronLimpio = padron.trim();
    
    if (asignaciones[padronLimpio]) {
      setResultado({
        encontrado: true,
        mensaje: `Tu corrector/a asignado es: ${asignaciones[padronLimpio]}`
      });
    } else {
      setResultado({
        encontrado: false,
        mensaje: 'Padrón no encontrado. Revisá que esté bien escrito.'
      });
    }
  };

  return (
    <div style={{ 
      margin: '2rem auto', 
      padding: '1.5rem', 
      border: '1px solid #e0e0e0', 
      borderRadius: '8px', 
      maxWidth: '400px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ marginTop: 0 }}> Consultar corrector</h3>
      
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '1rem' }}>
        <input 
            type="number" 
            value={padron}
            onChange={(e) => setPadron(e.target.value)}
            onWheel={(e) => e.currentTarget.blur()} 
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    buscar();
                }
            }}
            placeholder="Ingresá tu padrón"
            style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '60%'
            }}
        />
        <button 
          onClick={buscar}
          style={{
            backgroundColor: '#FDD835',
            color: '#1a1a1a',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Buscar
        </button>
      </div>

      {resultado && (
        <div style={{
          padding: '10px',
          borderRadius: '6px',
          backgroundColor: resultado.encontrado ? '#e8f5e9' : '#ffebee',
          color: resultado.encontrado ? '#2e7d32' : '#c62828',
          fontWeight: '500'
        }}>
          {resultado.mensaje}
        </div>
      )}
    </div>
  );
}