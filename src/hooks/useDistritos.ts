import { useState, useEffect } from 'react';

export const useDistritos = (): string[] => {
  const [distritos, setDistritos] = useState<string[]>([]);

  useEffect(() => {
    const mockDistritos = [
      'Lima',
      'Miraflores',
      'San Isidro',
      'Barranco',
      'Surco',
      'La Molina',
      'Jesus María',
      'Lince',
      'Magdalena',
      'Pueblo Libre'
    ];
    setDistritos(mockDistritos);
  }, []);

  return distritos;
};