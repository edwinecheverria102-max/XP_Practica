import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Ver } from './Equipo_7';

describe('test del equipo 7', () => {
  it('debería mostrar los datos del inventario en la tabla', async () => {
    // Mock de fetch para la URL del backend
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    Object.defineProperty(globalThis, 'fetch', {
      value: fetchMock,
      configurable: true,
    });

    render(<Ver />);

    // Esperar a que se carguen los datos
    await waitFor(() => {
      expect(screen.getByText('Cien años de soledad')).toBeInTheDocument();
      expect(screen.getByText('1984')).toBeInTheDocument();
      expect(screen.getByText('La casa de los espíritus')).toBeInTheDocument();
    });

    // Verificar estados
    expect(screen.getAllByText('Disponible')).toHaveLength(2);
    expect(screen.getByText('Rentado')).toBeInTheDocument();

    // Verificar información de préstamo para libros rentados
    expect(screen.getByText(/Usuario: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Devolución: 2026-05-05/)).toBeInTheDocument();
    expect(screen.getByText(/Usuario: 4/)).toBeInTheDocument();
    expect(screen.getByText(/Devolución: 2026-05-01/)).toBeInTheDocument();
  });
});

const mockData = [
  {
    "id_libro": 1,
    "titulo": "Cien años de soledad",
    "estado": "Disponible",
    "prestamo_activo": null
  },
  {
    "id_libro": 2,
    "titulo": "1984",
    "estado": "Rentado",
    "prestamo_activo": {
      "id_usuario": 1,
      "fecha_devolucion_prevista": "2026-05-05"
    }
  },
  {
    "id_libro": 3,
    "titulo": "La casa de los espíritus",
    "estado": "Disponible",
    "prestamo_activo": {
      "id_usuario": 4,
      "fecha_devolucion_prevista": "2026-05-01"
    }
  }
];