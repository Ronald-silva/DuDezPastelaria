import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { MenuItem, Extra, extras } from "@/data/menu";
import { useState } from "react";

interface ExtrasModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  onAddToCart: (item: MenuItem, selectedExtras: Extra[], quantity: number) => void;
}

export const ExtrasModal = ({ isOpen, onClose, item, onAddToCart }: ExtrasModalProps) => {
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [quantity, setQuantity] = useState(1);

  const handleExtraToggle = (extra: Extra, checked: boolean) => {
    if (checked) {
      setSelectedExtras(prev => [...prev, extra]);
    } else {
      setSelectedExtras(prev => prev.filter(e => e.id !== extra.id));
    }
  };

  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const totalPrice = item ? (item.price + extrasTotal) * quantity : 0;

  const handleAddToCart = () => {
    if (item) {
      onAddToCart(item, selectedExtras, quantity);
      onClose();
      setSelectedExtras([]);
      setQuantity(1);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedExtras([]);
    setQuantity(1);
  };

  if (!item) return null;

  // Show extras modal only for items that can have extras (pastéis and pizzas)
  const canHaveExtras = item.category === 'pasteis-salgados' || item.category === 'pasteis-doces' || item.category === 'pizzas';

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto z-50">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold text-primary">{item.name}</DialogTitle>
          <p className="text-lg font-semibold text-secondary">
            R$ {item.price.toFixed(2).replace('.', ',')}
          </p>
          {item.description && (
            <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
          )}
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Quantity Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-foreground">Quantidade</Label>
            <div className="flex items-center justify-center gap-4 bg-muted/30 rounded-lg p-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="h-12 w-12 p-0 rounded-full"
              >
                -
              </Button>
              <span className="w-16 text-center font-bold text-2xl text-primary">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                className="h-12 w-12 p-0 rounded-full"
              >
                +
              </Button>
            </div>
          </div>

          {/* Extras Selection */}
          {canHaveExtras && (
            <>
              <Separator />
              <div className="space-y-4">
                <Label className="text-base font-semibold text-foreground">Acréscimos (opcional)</Label>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {extras.map((extra) => (
                    <div key={extra.id} className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                      <Checkbox
                        id={extra.id}
                        checked={selectedExtras.some(e => e.id === extra.id)}
                        onCheckedChange={(checked) => handleExtraToggle(extra, checked as boolean)}
                        className="h-5 w-5"
                      />
                      <Label htmlFor={extra.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">{extra.name}</span>
                          <Badge variant="secondary" className="text-xs font-semibold">
                            +R$ {extra.price.toFixed(2).replace('.', ',')}
                          </Badge>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Selected Extras Summary */}
          {selectedExtras.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">Acréscimos selecionados:</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedExtras.map((extra) => (
                    <Badge key={extra.id} variant="default" className="text-xs bg-secondary text-secondary-foreground">
                      {extra.name} +R${extra.price.toFixed(2).replace('.', ',')}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Subtotal dos acréscimos: R$ {extrasTotal.toFixed(2).replace('.', ',')}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Total and Add Button */}
          <div className="space-y-4 bg-muted/20 rounded-lg p-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-foreground">Total:</span>
              <span className="text-primary text-2xl">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
            
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full h-14 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg rounded-xl"
            >
              <Plus className="mr-3 h-5 w-5" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};