import React, { useState, useEffect } from 'react';
import withAuth from '../../hocs/withAuth';
import { apiService } from '../../services/api';
import type { Product, Category } from '../../services/api';
import { useCart } from '../../context';
import CartIcon from '../../components/cart/CartIcon';
import usePagination from '../../hocs/usePagination';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import Pagination from '../../components/Pagination/Pagination';
import './Home.css';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  const { addItem } = useCart();

 const filteredProducts = products.filter(product => {
  const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
  const matchesSearch = searchQuery === '' || 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesCategory && matchesSearch;
});

  const { currentData, currentPage, totalPages, goToPage, nextPage, prevPage } = 
    usePagination({ data: filteredProducts, itemsPerPage: 8 });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);      
    const [productsData, categoriesData] = await Promise.all([
        apiService.getProducts(100),
        apiService.getCategories()
      ]);
      setProducts(productsData.products);
      setCategories([
        { slug: 'all', name: 'Todos' },
        ...categoriesData
      ]);

    } catch (err) {
      console.error('❌ Error loading data:', err);
      setError('Error al cargar los productos',);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (query.length >= 3 || query.length === 0) {
      setSearchQuery(query);
      goToPage(1);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    goToPage(1);
  };

  const handleAddToCart = (product: Product) => {
  if (product.stock > 0) {
    addItem(product);
    // ✅ Mensaje de éxito
    setModalMessage(`¡${product.title} agregado al carrito!`);
    setModalType('success');
    setShowModal(true);
  } else {
    // ✅ Mensaje de error de stock
    setModalMessage(`No hay stock disponible para ${product.title}`);
    setModalType('error');
    setShowModal(true);
  }
};

  if (isLoading) {
    return <div className="loading">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <header className="home-header">
        <div className="header-title">
          <h1>My Market</h1>
          <p>Encuentra los mejores productos al mejor precio</p>
        </div>
        <div className="header-actions">
          <CartIcon />
        </div>
      </header>
      <div className="filters-container">
        <SearchBar
          onSearch={handleSearch}
          minLength={3} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange} />
      </div>
      <div className="products-grid">
        {currentData.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No se encontraron productos</p>
        </div>
      )}

      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onNextPage={nextPage}
          onPrevPage={prevPage}
        />
      )}

      {showModal && (
      <div className="modal-overlay">
        <div className={`modal ${modalType}`}>
        <h3>{modalType === 'success' ? '¡Éxito!' : 'Stock no disponible'}</h3>
        <p>{modalMessage}</p>
        <button onClick={() => setShowModal(false)}>Cerrar</button>
        </div>
      </div>
    )}
    </>
  );
};

const HomePageWithAuth = withAuth(HomePage);
export default HomePageWithAuth;