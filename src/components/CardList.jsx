import Card from './Card';
import Button from './Button';
import React, { useState, useEffect } from 'react';
import Search from '../components/Search'; // Import Search component

const CardList = ({ data }) => {
  const limit = 10;
  const defaultDataset = data.slice(0, limit);
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);

  // Function to filter products by tags
  const filterTags = (tagQuery) => {
    const filtered = data.filter(product => {
      if (!tagQuery) {
        return product;
    }

      return product.tags.find(({title}) => title === tagQuery)
  });

    setOffset(0);
    setProducts(filtered.slice(0, limit));
  };

  const handlePagination = (direction) => {
    const maxOffset = Math.max(0, products.length - limit); // Use products.length for filtered results
    setOffset(direction === 'next'
      ? Math.min(maxOffset, offset + limit)
      : Math.max(0, offset - limit)
    );
  };

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, data]);

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products && products.map(product => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePagination('previous')}
          disabled={offset === 0}
        />
        <Button
          text="Next"
          handleClick={() => handlePagination('next')}
          disabled={offset + limit >= products.length}
        />
      </div>
    </div>
  );
};

export default CardList;
