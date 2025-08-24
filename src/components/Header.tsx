import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface HeaderProps {
  cartItemsCount: number;
  onOpenCart: () => void;
}

export const Header = ({ cartItemsCount, onOpenCart }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-brand-gradient bg-clip-text text-transparent">
              Du Dez Pastelaria
            </h1>
            <p className="text-sm text-muted-foreground">Menu Digital</p>
          </div>
          
          <Button
            variant="outline"
            size="lg"
            onClick={onOpenCart}
            className="relative border-primary/20 hover:bg-primary/5"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Carrinho
            {cartItemsCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
              >
                {cartItemsCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};