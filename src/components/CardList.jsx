import Card from './Card';
import Button from './Button';
import React, { useState, useEffect } from 'react';
import Search from '../components/Search';

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState(data);
  const [products, setProducts] = useState(data.slice(0, limit));

  const filterTags = (tagQuery) => {
    const filtered = data.filter(product => {
      if (!tagQuery) {
        return true;
      }
      return product.tags.some(({ title }) => title === tagQuery);
    });

    setFilteredData(filtered);
    setOffset(0);
    setProducts(filtered.slice(0, limit));
  };

  const handlePagination = (direction) => {
    const maxOffset = Math.max(0, filteredData.length - limit);
    const newOffset =
      direction === 'next'
        ? Math.min(offset + limit, maxOffset)
        : Math.max(0, offset - limit);

    setOffset(newOffset);
  };

  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.map(product => (
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
          disabled={offset + limit >= filteredData.length}
        />
      </div>
    </div>
  );
};

export default CardList;
