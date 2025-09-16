import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/useCart.ts';
import { useDistritos } from '../../hooks/useDistritos.ts';
import Alert from '../../components/Alert/Alert';
import './Summary.css';
import { CartItem } from '../../types'; // Importa la interfaz

interface FormData {
  nombre: string;
  apellido: string;
  distrito: string;
  direccion: string;
  referencia: string;
  celular: string;
}

interface FormErrors {
  nombre?: string;
  apellido?: string;
  distrito?: string;
  direccion?: string;
  referencia?: string;
  celular?: string;
  general?: string;
}

const Summary: React.FC = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    distrito: '',
    direccion: '',
    referencia: '',
    celular: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const distritos = useDistritos();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const phoneRegex = /^[0-9]{9}$/;
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Campo obligatorio';
    } else if (!nameRegex.test(formData.nombre)) {
      newErrors.nombre = 'Debe ingresar un valor válido';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'Campo obligatorio';
    } else if (!nameRegex.test(formData.apellido)) {
      newErrors.apellido = 'Debe ingresar un valor válido';
    }

    if (!formData.distrito) {
      newErrors.distrito = 'Campo obligatorio';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'Campo obligatorio';
    }

    if (!formData.celular.trim()) {
      newErrors.celular = 'Campo obligatorio';
    } else if (!phoneRegex.test(formData.celular)) {
      newErrors.celular = 'Debe ingresar un número válido (9 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePurchase = () => {
      if (state.items.length === 0) {
    setErrors({ general: 'No hay productos en el carrito' });
    return;
  }
    if (!validateForm()) return;

    setShowAlert(true);
    
    console.log('Datos del pedido:', {
      nombre: formData.nombre,
      apellido: formData.apellido,
      distrito: formData.distrito,
      direccion: formData.direccion,
      referencia: formData.referencia,
      celular: formData.celular,
      productos: state.items,
      total: state.total
    });
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
    clearCart();
    navigate('/home');
  };

  const handleIncrement = (id: number) => {
    const item = state.items.find((item: CartItem) => item.id === id);
    if (item && item.quantity < item.stock) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrement = (id: number) => {
    const item = state.items.find((item: CartItem) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="summary-container">
        <h2>Carrito de Compras</h2>
        <p>No hay productos en el carrito</p>
        <button onClick={() => navigate('/home')}>Seguir comprando</button>
      </div>
    );
  }

  return (
    <div className="summary-container">
      <h2>Resumen de Compra</h2>
      
      <div className="products-table">
        <div className="table-header">
          <div>Producto</div>
          <div>Nombre</div>
          <div>Precio</div>
          <div>Cantidad</div>
          <div>Acciones</div>
        </div>
        
        {state.items.map((item: CartItem) => (
          <div key={item.id} className="table-row">
            <div className="product-image">
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <div className="product-name">{item.title}</div>
            <div className="product-price">S/ {item.price.toFixed(2)}</div>
            <div className="product-quantity">
              <button onClick={() => handleDecrement(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item.id)}>+</button>
            </div>
            <div className="product-actions">
              <button 
                onClick={() => removeItem(item.id)}
                className="delete-btn"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="total-section">
        <h3>Total a pagar: S/ {state.total.toFixed(2)}</h3>
      </div>

      <div className="shipping-form">
        <h3>Información de Envío</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className={errors.nombre ? 'error' : ''}
            />
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          </div>
          
          <div className="form-group">
            <label>Apellido *</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              className={errors.apellido ? 'error' : ''}
            />
            {errors.apellido && <span className="error-message">{errors.apellido}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Distrito *</label>
          <select
            name="distrito"
            value={formData.distrito}
            onChange={handleInputChange}
            className={errors.distrito ? 'error' : ''}
          >
            <option value="">Seleccione un distrito</option>
            {distritos.map((distrito: string) => (
              <option key={distrito} value={distrito}>
                {distrito}
              </option>
            ))}
          </select>
          {errors.distrito && <span className="error-message">{errors.distrito}</span>}
        </div>

        <div className="form-group">
          <label>Dirección *</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            className={errors.direccion ? 'error' : ''}
          />
          {errors.direccion && <span className="error-message">{errors.direccion}</span>}
        </div>

        <div className="form-group">
          <label>Referencia</label>
          <input
            type="text"
            name="referencia"
            value={formData.referencia}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Celular *</label>
          <input
            type="tel"
            name="celular"
            value={formData.celular}
            onChange={handleInputChange}
            className={errors.celular ? 'error' : ''}
          />
          {errors.celular && <span className="error-message">{errors.celular}</span>}
        </div>

        <button onClick={handlePurchase} className="purchase-btn">
          Realizar Compra
        </button>
      </div>

      <Alert
        isOpen={showAlert}
        title="¡Compra Exitosa!"
        message="Su pedido se registró con éxito. Será contactado pronto para coordinar la entrega."
        onConfirm={handleAlertConfirm}
      />
    </div>
  );
};

export default Summary;