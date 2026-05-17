import React, { createContext, useContext, useState, useEffect } from 'react';

const QuoteContext = createContext();

export function QuoteProvider({ children }) {
  const [basket, setBasket] = useState(() => {
    const saved = localStorage.getItem('bespoke_quote_basket');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('bespoke_quote_basket', JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (item) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setBasket((prev) => [...prev, { ...item, id }]);
    setIsDrawerOpen(true);
  };

  const removeFromBasket = (id) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id, updates) => {
    setBasket((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <QuoteContext.Provider
      value={{
        basket,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        addToBasket,
        removeFromBasket,
        updateItem,
        clearBasket,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}
