import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
      if (!isLoading && !user) {
        navigate('/login');
      }
    }, [user, isLoading, navigate]);

    if (isLoading) {
      return <div>Cargando...</div>;
    }

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuth;