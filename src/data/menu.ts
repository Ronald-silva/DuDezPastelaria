export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  extras: Extra[];
}

export interface Extra {
  id: string;
  name: string;
  price: number;
}

export const categories: Category[] = [
  { id: 'pasteis-salgados', name: 'Pastéis Salgados', icon: '🥟', color: 'bg-primary' },
  { id: 'pasteis-doces', name: 'Pastéis Doces', icon: '🍰', color: 'bg-secondary' },
  { id: 'pizzas', name: 'Pizzas', icon: '🍕', color: 'bg-primary' },
  { id: 'batatas', name: 'Batatas', icon: '🍟', color: 'bg-secondary' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤', color: 'bg-primary' },
];

export const extras: Extra[] = [
  { id: 'ovo', name: 'Ovo', price: 2.00 },
  { id: 'frango', name: 'Frango', price: 3.00 },
  { id: 'carne', name: 'Carne', price: 4.00 },
  { id: 'queijo', name: 'Queijo', price: 4.00 },
  { id: 'catupiry', name: 'Catupiry', price: 3.00 },
  { id: 'catupiry-carne-sol', name: 'Catupiry com Carne do Sol', price: 4.00 },
  { id: 'cheddar', name: 'Cheddar', price: 3.00 },
  { id: 'calabresa', name: 'Calabresa', price: 3.00 },
  { id: 'bacon', name: 'Bacon', price: 4.00 },
  { id: 'azeitona', name: 'Azeitona', price: 1.50 },
  { id: 'presunto', name: 'Presunto', price: 3.00 },
  { id: 'passas', name: 'Passas', price: 1.50 },
];

export const menuItems: MenuItem[] = [
  // Pastéis Salgados
  { id: 'queijo', name: 'Queijo', price: 12.00, category: 'pasteis-salgados' },
  { id: 'queijo-oregano', name: 'Queijo e Orégano', price: 12.00, category: 'pasteis-salgados' },
  { id: 'queijo-cebola', name: 'Queijo com Cebola', price: 12.00, category: 'pasteis-salgados' },
  { id: 'tres-queijos', name: 'Três Queijos (Qualho, Mussarela e Catupiry)', price: 14.00, category: 'pasteis-salgados' },
  { id: 'queijo-bacon-oregano', name: 'Queijo (Bacon e Orégano)', price: 15.00, category: 'pasteis-salgados' },
  { id: 'calabresa-queijo', name: 'Calabresa e Queijo', price: 14.00, category: 'pasteis-salgados' },
  { id: 'misto', name: 'Misto', price: 12.00, category: 'pasteis-salgados' },
  { id: 'carne', name: 'Carne', price: 12.00, category: 'pasteis-salgados' },
  { id: 'carne-queijo', name: 'Carne com Queijo', price: 13.00, category: 'pasteis-salgados' },
  { id: 'carne-presunto-queijo', name: 'Carne, Presunto e Queijo', price: 14.00, category: 'pasteis-salgados' },
  { id: 'carne-frango-queijo-presunto', name: 'Carne, Frango, Queijo e Presunto', price: 15.00, category: 'pasteis-salgados' },
  { id: 'carne-ovo-queijo', name: 'Carne, Ovo e Queijo', price: 14.00, category: 'pasteis-salgados' },
  { id: 'carne-ovo-queijo-azeitona', name: 'Carne, Ovo, Queijo e Azeitona', price: 14.00, category: 'pasteis-salgados' },
  { id: 'carne-bacon-ovo-queijo', name: 'Carne, Bacon, Ovo e Queijo', price: 15.00, category: 'pasteis-salgados' },
  { id: 'frango', name: 'Frango', price: 12.00, category: 'pasteis-salgados' },
  { id: 'frango-milho-ervilha', name: 'Frango, Milho e Ervilha', price: 12.00, category: 'pasteis-salgados' },
  { id: 'frango-milho-ervilha-passas', name: 'Frango, Milho, Ervilha e Passas', price: 13.00, category: 'pasteis-salgados' },
  { id: 'frango-queijo', name: 'Frango e Queijo', price: 13.00, category: 'pasteis-salgados' },
  { id: 'frango-queijo-bacon', name: 'Frango, Queijo e Bacon', price: 15.00, category: 'pasteis-salgados' },
  { id: 'frango-catupiry', name: 'Frango com Catupiry', price: 13.00, category: 'pasteis-salgados' },
  { id: 'frango-catupiry-queijo', name: 'Frango, Catupiry e Queijo', price: 14.00, category: 'pasteis-salgados' },
  { id: 'frango-presunto-queijo', name: 'Frango, Presunto e Queijo', price: 14.00, category: 'pasteis-salgados' },
  { id: 'frango-presunto-queijo-catupiry', name: 'Frango, Presunto, Queijo e Catupiry', price: 15.00, category: 'pasteis-salgados' },
  { id: 'pizza-pastel', name: 'Pizza (Queijo, Tomate e Orégano)', price: 12.00, category: 'pasteis-salgados' },
  { id: 'carne-sol-queijo-cebola', name: 'Carne do Sol, Queijo e Cebola', price: 16.00, category: 'pasteis-salgados' },
  { id: 'portuguesa', name: 'Portuguesa (Queijo, Presunto, Calabresa, Ovo, Cebola e Orégano)', price: 16.00, category: 'pasteis-salgados' },
  { id: 'mistao', name: 'Mistão', price: 20.00, category: 'pasteis-salgados', popular: true, description: 'Frango, Carne, Queijo, Presunto, Calabresa, Bacon, Passas, Milho e Ervilha' },
  { id: 'frango-cheddar-bacon', name: 'Frango, Cheddar e Bacon', price: 15.00, category: 'pasteis-salgados' },
  { id: 'carne-cheddar-bacon', name: 'Carne, Cheddar e Bacon', price: 15.00, category: 'pasteis-salgados' },
  { id: 'carne-calabresa-ovo-cheddar', name: 'Carne, Calabresa, Ovo e Cheddar', price: 15.00, category: 'pasteis-salgados' },
  { id: 'frango-queijo-calabresa', name: 'Frango, Queijo e Calabresa', price: 15.00, category: 'pasteis-salgados' },
  { id: 'frango-queijo-ovo', name: 'Frango, Queijo e Ovo', price: 14.00, category: 'pasteis-salgados' },
  { id: 'carne-bacon-queijo', name: 'Carne, Bacon e Queijo', price: 15.00, category: 'pasteis-salgados' },
  { id: 'carne-queijo-calabresa', name: 'Carne, Queijo e Calabresa', price: 15.00, category: 'pasteis-salgados' },
  { id: 'carne-bacon-calabresa', name: 'Carne, Bacon e Calabresa', price: 15.00, category: 'pasteis-salgados' },
  { id: 'carne-frango-calabresa', name: 'Carne, Frango e Calabresa', price: 15.00, category: 'pasteis-salgados' },
  { id: 'carne-frango-bacon', name: 'Carne, Frango e Bacon', price: 15.00, category: 'pasteis-salgados' },
  { id: 'carne-frango-ovo', name: 'Carne, Frango e Ovo', price: 15.00, category: 'pasteis-salgados' },
  { id: 'bacon-calabresa-frango', name: 'Bacon, Calabresa e Frango', price: 15.00, category: 'pasteis-salgados' },
  { id: 'frango-carne-calabresa-bacon', name: 'Frango, Carne, Calabresa e Bacon', price: 15.00, category: 'pasteis-salgados' },
  { id: 'frango-carne-calabresa-ovo', name: 'Frango, Carne, Calabresa e Ovo', price: 15.00, category: 'pasteis-salgados' },
  { id: 'frango-carne-bacon-ovo', name: 'Frango, Carne, Bacon e Ovo', price: 15.00, category: 'pasteis-salgados' },
  { id: 'frango-queijo-calabresa-carne', name: 'Frango, Queijo, Calabresa e Carne', price: 15.00, category: 'pasteis-salgados' },
  { id: 'frango-carne-queijo-bacon', name: 'Frango, Carne, Queijo e Bacon', price: 15.00, category: 'pasteis-salgados' },
  
  // Pastéis Doces
  { id: 'chocolate', name: 'Chocolate', price: 15.00, category: 'pasteis-doces' },
  { id: 'chocolate-queijo', name: 'Chocolate com Queijo', price: 17.00, category: 'pasteis-doces' },
  { id: 'sonho-valsa', name: 'Sonho de Valsa', price: 17.00, category: 'pasteis-doces' },

  // Pizzas Salgadas
  { id: 'pizza-calabresa', name: 'Calabresa', price: 30.00, category: 'pizzas', description: 'Molho, Mussarela, Calabresa, Orégano, Azeitona e Cebola' },
  { id: 'pizza-mussarela', name: 'Mussarela', price: 30.00, category: 'pizzas', description: 'Molho, Mussarela, Tomate, Orégano, Azeitona' },
  { id: 'pizza-mista', name: 'Mista', price: 30.00, category: 'pizzas', description: 'Molho, Mussarela, Presunto, Orégano e Azeitona' },
  { id: 'pizza-napolitana', name: 'Napolitana', price: 30.00, category: 'pizzas', description: 'Molho, Mussarela, Parmesão, Tomate, Orégano, Azeitona' },
  { id: 'pizza-milho', name: 'Milho Verde', price: 30.00, category: 'pizzas', description: 'Molho, Mussarela, Milho verde, Orégano, Azeitona' },
  { id: 'pizza-tres-queijos', name: 'Três Queijos', price: 32.00, category: 'pizzas', description: 'Molho, Mussarela, Qualho, Catupiry, Orégano e Azeitona' },
  { id: 'pizza-quatro-queijos', name: 'Quatro Queijos', price: 35.00, category: 'pizzas', description: 'Molho, Mussarela, Qualho, Catupiry, Parmesão, Orégano e Azeitona' },
  { id: 'pizza-frango-cheddar', name: 'Frango com Cheddar', price: 33.00, category: 'pizzas', description: 'Molho, Mussarela, Frango, Cheddar, Orégano e Azeitona' },
  { id: 'pizza-frango-catupiry', name: 'Frango com Catupiry', price: 33.00, category: 'pizzas', description: 'Molho, Mussarela, Frango, Catupiry, Orégano e Azeitona' },
  { id: 'pizza-brasileira', name: 'Brasileira', price: 32.00, category: 'pizzas', description: 'Molho, Frango, Ervilha, Milho, Cobertura de Mussarela, Orégano e Azeitona' },
  { id: 'pizza-paulista', name: 'Paulista', price: 31.00, category: 'pizzas', description: 'Molho, Calabresa, Cobertura de Mussarela, Orégano e Azeitona' },
  { id: 'pizza-bacon', name: 'Bacon', price: 34.00, category: 'pizzas', description: 'Molho, Mussarela, Bacon, Catupiry, Milho, Orégano e Azeitona' },
  { id: 'pizza-jardineira', name: 'Jardineira', price: 31.00, category: 'pizzas', description: 'Molho, Mussarela, Frango, Catupiry, Milho, Orégano e Azeitona' },
  { id: 'pizza-portuguesa-especial', name: 'Portuguesa Especial', price: 34.00, category: 'pizzas', description: 'Molho, Mussarela, Presunto, Calabresa, Ovo, Catupiry, Milho, Ervilha, Azeitona e Orégano' },
  { id: 'pizza-portuguesa-simples', name: 'Portuguesa Simples', price: 31.00, category: 'pizzas', description: 'Molho, Mussarela, Presunto, Calabresa, Milho, Ervilha, Ovo e Cebola' },
  { id: 'pizza-carne-sol-simples', name: 'Carne do Sol Simples', price: 34.00, category: 'pizzas', description: 'Molho, Mussarela, Carne do Sol, Cebola, Orégano e Azeitona' },
  { id: 'pizza-carne-sol-premium', name: 'Carne do Sol Premium', price: 36.00, category: 'pizzas', popular: true, description: 'Molho, Mussarela, Carne do Sol, Catupiry, Cheddar, Bacon, Orégano e Azeitona' },
  { id: 'pizza-toscana', name: 'Toscana', price: 32.00, category: 'pizzas', description: 'Molho, Mussarela, Calabresa Moída, Ovo, Catupiry, Orégano e Azeitona' },
  { id: 'pizza-grega', name: 'A Grega', price: 35.00, category: 'pizzas', description: 'Molho, Mussarela, Bacon, Cobertura de Mussarela, Orégano e Azeitona' },
  { id: 'pizza-moda-casa', name: 'A Moda da Casa', price: 37.00, category: 'pizzas', description: 'Molho, Mussarela, Presunto, Frango, Bacon, Milho, Orégano e Azeitona' },
  { id: 'pizza-moda-cheff', name: 'A Moda do Cheff', price: 37.00, category: 'pizzas', description: 'Molho, Mussarela, Frango, Calabresa, Cheddar, Catupiry, Orégano e Azeitona' },
  { id: 'pizza-margherita', name: 'Margherita', price: 31.00, category: 'pizzas', description: 'Molho, Mussarela, Tomate, Folhas de Manjericão, Orégano e Azeitona' },

  // Pizzas Doces
  { id: 'pizza-brigadeiro', name: 'Brigadeiro', price: 35.00, category: 'pizzas', description: 'Chocolate com granulado' },
  { id: 'pizza-mms', name: 'MMS', price: 35.00, category: 'pizzas', description: 'Chocolate com MMS' },

  // Batatas
  { id: 'batata-tradicional', name: 'Tradicional 300g', price: 16.00, category: 'batatas' },
  { id: 'batata-cheddar-bacon', name: 'Batata, Cheddar e Bacon 300g', price: 20.00, category: 'batatas' },

  // Bebidas
  { id: 'suco-300ml', name: 'Sucos 300ml', price: 6.00, category: 'bebidas' },
  { id: 'lata-350ml', name: 'Lata 350ml', price: 6.00, category: 'bebidas' },
  { id: 'refrigerante-1l', name: 'Refrigerante 1L', price: 8.00, category: 'bebidas' },
  { id: 'cajuina-1l', name: 'Cajuína 1L', price: 9.00, category: 'bebidas' },
  { id: 'coca-cola-1l', name: 'Coca Cola 1L', price: 9.00, category: 'bebidas' },
];