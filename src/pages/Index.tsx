import { useState } from "react";
import { Header } from "@/components/Header";
import { CategoryCard } from "@/components/CategoryCard";
import { MenuCard } from "@/components/MenuCard";
import { CartSheet } from "@/components/CartSheet";
import { ExtrasModal } from "@/components/ExtrasModal";
import { categories, menuItems, MenuItem, CartItem, Extra } from "@/data/menu";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('pasteis-salgados');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isExtrasModalOpen, setIsExtrasModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { toast } = useToast();

  const filteredItems = menuItems.filter(item => item.category === activeCategory);
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (item: MenuItem) => {
    // Check if item can have extras (pastéis and pizzas)
    const canHaveExtras = item.category === 'pasteis-salgados' || item.category === 'pasteis-doces' || item.category === 'pizzas';
    
    if (canHaveExtras) {
      setSelectedItem(item);
      setIsExtrasModalOpen(true);
    } else {
      addToCart(item, [], 1);
    }
  };

  const addToCart = (item: MenuItem, extras: Extra[], quantity: number) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(cartItem => 
        cartItem.id === item.id && 
        JSON.stringify(cartItem.extras) === JSON.stringify(extras)
      );
      
      if (existingItemIndex !== -1) {
        return prev.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity, extras }];
      }
    });

    toast({
      title: "Item adicionado!",
      description: `${item.name} foi adicionado ao carrinho.`,
    });
  };

  const updateQuantity = (uniqueKey: string, quantity: number) => {
    const index = parseInt(uniqueKey.split('-').pop() || '0');
    setCartItems(prev =>
      prev.map((item, idx) =>
        idx === index ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (uniqueKey: string) => {
    const index = parseInt(uniqueKey.split('-').pop() || '0');
    setCartItems(prev => prev.filter((_, idx) => idx !== index));
    toast({
      title: "Item removido",
      description: "O item foi removido do carrinho.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-8 bg-brand-gradient-soft rounded-2xl animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo à Du Dez!
          </h2>
          <p className="text-lg text-muted-foreground">
            Os melhores pastéis e pizzas da cidade, agora no seu celular
          </p>
        </section>

        {/* Categories */}
        <section className="animate-fade-in">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Categorias</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onSelect={setActiveCategory}
              />
            ))}
          </div>
        </section>

        {/* Menu Items */}
        <section className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-foreground">
              {categories.find(c => c.id === activeCategory)?.name}
            </h3>
            <span className="text-sm text-muted-foreground">
              {filteredItems.length} itens
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="animate-scale-in">
                <MenuCard
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-muted-foreground border-t">
          <p className="text-sm">
            © 2024 Du Dez Pastelaria. Todos os direitos reservados.
          </p>
          <p className="text-xs mt-2">
            Desenvolvido por Ronald-Dev para oferecer a melhor experiência digital
          </p>
        </footer>
      </main>

      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      <ExtrasModal
        isOpen={isExtrasModalOpen}
        onClose={() => setIsExtrasModalOpen(false)}
        item={selectedItem}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default Index;