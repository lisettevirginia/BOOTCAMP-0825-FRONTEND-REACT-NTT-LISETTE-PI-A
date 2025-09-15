import React from 'react';
import './CategoryFilter.css';

interface Category {
  slug: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="category-filter">
      <h3>Categorías</h3>
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category.slug} // Usa category.slug como key
            className={selectedCategory === category.slug ? 'active' : ''}
            onClick={() => onCategoryChange(category.slug)} // Pasa el slug
          >
            {category.name} // Muestra el name
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;