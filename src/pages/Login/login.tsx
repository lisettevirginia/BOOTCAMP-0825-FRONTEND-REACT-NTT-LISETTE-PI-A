import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { LoginFormData } from '../../types';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import './Login.css';

const Login: React.FC = () => {
    const { login, isLoading } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data: LoginFormData) => {
        try {
            setErrorMessage('');
            
            // Llamada a la API requerida por el proyecto
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: data.username.trim(),
                    password: data.password.trim(),
                })
            });

            if (!response.ok) {
                if (response.status === 400) {
                    setErrorMessage('Usuario o contraseña incorrectos');
                    setShowErrorModal(true);
                    return;
                }
                throw new Error('Server Error');
            }

            const result = await response.json();
            await login(result); // Guardar datos de usuario en contexto
            
            // La redirección se manejará en el AuthContext o Router
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Algo salió mal, inténtelo más tarde');
            setShowErrorModal(true);
        }
    };

    const handleForgotPassword = (email: string) => {
        // Simulación de envío de correo según requerimientos
        console.log('Correo enviado a:', email);
        setShowForgotPassword(false);
        setShowSuccessModal(true);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <h2>Iniciar Sesión</h2>

                <Input
                    label="Usuario"
                    type="text"
                    {...register('username', {
                        required: 'El usuario es obligatorio',
                        validate: {
                            noSpaces: (value) => 
                                !value.includes(' ') || 'No se permiten espacios en blanco',
                            notEmpty: (value) => 
                                value.trim().length > 0 || 'No se permiten espacios en blanco'
                        }
                    })}
                    error={errors.username?.message}
                    required
                />
                
                <Input
                    label="Contraseña"
                    type="password"
                    {...register('password', {
                        required: 'La contraseña es obligatoria',
                        validate: {
                            notEmpty: (value) => 
                                value.trim().length > 0 || 'No se permiten espacios en blanco',
                            minLength: (value) => 
                                value.trim().length >= 3 || 'Mínimo 3 caracteres'
                        }
                    })}
                    error={errors.password?.message}
                    required
                />

                <Button type="submit" variant="primary" disable={isLoading}>
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>

                <button
                    type="button"
                    className="forgot-password"
                    onClick={() => setShowForgotPassword(true)}
                >
                    ¿Olvidaste tu contraseña?
                </button>
            </form>

            {/* Modal para Olvidé Contraseña */}
            <ForgotPasswordModal
                isOpen={showForgotPassword}
                onClose={() => setShowForgotPassword(false)}
                onSubmit={handleForgotPassword}
            />

            {/* Modal de Éxito - Correo Enviado */}
            <Modal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Éxito"
            >
                <p>Correo enviado correctamente. Revisa tu bandeja de entrada.</p>
                <Button onClick={() => setShowSuccessModal(false)}>Aceptar</Button>
            </Modal>

            {/* Modal de Error - Credenciales o Servidor */}
            <Modal
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                title="Error"
            >
                <p>{errorMessage}</p>
                <Button onClick={() => setShowErrorModal(false)}>Aceptar</Button>
            </Modal>
        </div>
    );
};

// Componente Modal para Olvidé la Contraseña
const ForgotPasswordModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };

    const handleSubmit = () => {
        const trimmedEmail = email.trim();
        
        if (!trimmedEmail) {
            setEmailError('El correo electrónico es obligatorio');
            return;
        }
        
        if (!validateEmail(trimmedEmail)) {
            setEmailError('Ingrese un correo electrónico válido');
            return;
        }
        
        setEmailError('');
        onSubmit(trimmedEmail);
        setEmail(''); // Limpiar campo después del envío
    };

    const handleClose = () => {
        setEmail('');
        setEmailError('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Recuperar contraseña">
            <div className="forgot-password-modal">
                <p>Ingresa tu correo electrónico para recuperar tu contraseña</p>

                <Input
                    label="Correo Electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError(''); // Limpiar error al escribir
                    }}
                    error={emailError}
                    placeholder="tu.email@ejemplo.com"
                    required
                />

                <div className="modal-actions">
                    <Button variant="secundary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Enviar
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default Login;