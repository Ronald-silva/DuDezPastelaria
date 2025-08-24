import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Minus, Plus, ShoppingCart, MessageCircle, CreditCard, Banknote, Smartphone } from "lucide-react";
import { CartItem } from "@/data/menu";
import { useState } from "react";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export const CartSheet = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem 
}: CartSheetProps) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('pickup');
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    number: '',
    neighborhood: '',
    reference: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'cash'>('pix');
  const [changeFor, setChangeFor] = useState('');

  const total = cartItems.reduce((sum, item) => {
    const extrasTotal = item.extras.reduce((extrasSum, extra) => extrasSum + extra.price, 0);
    return sum + (item.price + extrasTotal) * item.quantity;
  }, 0);

  const formatWhatsAppMessage = () => {
    const getCategoryName = (categoryId: string) => {
      const categoryMap: { [key: string]: string } = {
        'pasteis-salgados': '🥟 PASTEL SALGADO',
        'pasteis-doces': '🍰 PASTEL DOCE',
        'pizzas': '🍕 PIZZA',
        'batatas': '🍟 BATATA',
        'bebidas': '🥤 BEBIDA'
      };
      return categoryMap[categoryId] || 'PRODUTO';
    };

    let message = `🍽️ *NOVO PEDIDO - DU DEZ PASTELARIA*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    // Tipo de pedido com ícone
    message += `📦 *TIPO DE ENTREGA*\n`;
    message += `${orderType === 'delivery' ? '🚚 Delivery' : '🏪 Retirar na Loja'}\n\n`;
    
    // Dados do cliente
    message += `👤 *DADOS DO CLIENTE*\n`;
    message += `📝 Nome: ${customerData.name}\n`;
    message += `📱 Telefone: ${customerData.phone}\n`;
    
    if (orderType === 'delivery') {
      message += `📍 Endereço: ${customerData.address}, ${customerData.number}\n`;
      message += `🏘️ Bairro: ${customerData.neighborhood}\n`;
      if (customerData.reference) {
        message += `🗺️ Referência: ${customerData.reference}\n`;
      }
    }
    
    message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    // Itens do pedido organizados por categoria
    message += `🛒 *ITENS DO PEDIDO*\n\n`;
    
    // Agrupar itens por categoria
    const itemsByCategory: { [key: string]: CartItem[] } = {};
    cartItems.forEach(item => {
      if (!itemsByCategory[item.category]) {
        itemsByCategory[item.category] = [];
      }
      itemsByCategory[item.category].push(item);
    });
    
    // Exibir itens agrupados por categoria
    Object.entries(itemsByCategory).forEach(([category, items]) => {
      message += `${getCategoryName(category)}\n`;
      items.forEach(item => {
        const basePrice = item.price;
        const extrasPrice = item.extras.reduce((sum, e) => sum + e.price, 0);
        const unitPrice = basePrice + extrasPrice;
        const itemTotal = unitPrice * item.quantity;
        
        message += `▫️ ${item.name}\n`;
        if (item.extras.length > 0) {
          message += `   Adicionais: ${item.extras.map(e => `${e.name} (+R$${e.price.toFixed(2).replace('.', ',')})`).join(', ')}\n`;
        }
        message += `   Qtd: ${item.quantity}x | Valor unit.: R$${unitPrice.toFixed(2).replace('.', ',')} | Total: R$${itemTotal.toFixed(2).replace('.', ',')}\n\n`;
      });
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    // Resumo financeiro
    message += `💰 *RESUMO FINANCEIRO*\n`;
    message += `💵 Subtotal: R$${total.toFixed(2).replace('.', ',')}\n`;
    if (orderType === 'delivery') {
      message += `🚚 Taxa de entrega: A combinar\n`;
    }
    message += `🏷️ *TOTAL: R$${total.toFixed(2).replace('.', ',')}*\n\n`;
    
    // Forma de pagamento
    message += `💳 *FORMA DE PAGAMENTO*\n`;
    let paymentText = '';
    switch (paymentMethod) {
      case 'pix':
        paymentText = '📱 PIX';
        break;
      case 'card':
        paymentText = '💳 Cartão (Débito/Crédito)';
        break;
      case 'cash':
        if (changeFor && parseFloat(changeFor) > total) {
          const change = parseFloat(changeFor) - total;
          paymentText = `💵 Dinheiro - Troco para R$${parseFloat(changeFor).toFixed(2).replace('.', ',')} (Troco: R$${change.toFixed(2).replace('.', ',')})`;
        } else {
          paymentText = '💵 Dinheiro - Não precisa de troco';
        }
        break;
    }
    message += `${paymentText}\n\n`;
    
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `⏰ *Pedido realizado em:* ${new Date().toLocaleString('pt-BR')}\n\n`;
    message += `✅ *Aguardando confirmação*\n`;
    message += `🙏 Obrigado pela preferência!`;
    
    return encodeURIComponent(message);
  };

  const sendToWhatsApp = () => {
    const phoneNumber = "5585991993833";
    const message = formatWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const isFormValid = () => {
    if (!customerData.name || !customerData.phone) return false;
    if (orderType === 'delivery' && (!customerData.address || !customerData.number || !customerData.neighborhood)) {
      return false;
    }
    if (paymentMethod === 'cash' && changeFor && parseFloat(changeFor) < total) {
      return false;
    }
    return cartItems.length > 0;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-primary">
            <ShoppingCart className="h-5 w-5" />
            Seu Pedido
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Order Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Tipo do Pedido</Label>
            <RadioGroup value={orderType} onValueChange={(value: 'delivery' | 'pickup') => setOrderType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup">Retirar na Loja</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery">Delivery</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Customer Data */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Seus Dados</Label>
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={customerData.name}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(85) 99999-9999"
                />
              </div>
              
              {orderType === 'delivery' && (
                <>
                  <div>
                    <Label htmlFor="address">Endereço *</Label>
                    <Input
                      id="address"
                      value={customerData.address}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Rua, Avenida..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={customerData.number}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, number: e.target.value }))}
                        placeholder="123"
                      />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={customerData.neighborhood}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, neighborhood: e.target.value }))}
                        placeholder="Centro"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reference">Ponto de Referência</Label>
                    <Textarea
                      id="reference"
                      value={customerData.reference}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, reference: e.target.value }))}
                      placeholder="Próximo ao..."
                      rows={2}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Payment Method */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Forma de Pagamento</Label>
            <RadioGroup value={paymentMethod} onValueChange={(value: 'pix' | 'card' | 'cash') => setPaymentMethod(value)}>
              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="pix" id="pix" />
                <Smartphone className="h-4 w-4 text-primary" />
                <Label htmlFor="pix" className="cursor-pointer flex-1">PIX</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="h-4 w-4 text-primary" />
                <Label htmlFor="card" className="cursor-pointer flex-1">Cartão (Débito/Crédito)</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="cash" id="cash" />
                <Banknote className="h-4 w-4 text-primary" />
                <Label htmlFor="cash" className="cursor-pointer flex-1">Dinheiro</Label>
              </div>
            </RadioGroup>
            
            {paymentMethod === 'cash' && (
              <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                <Label htmlFor="change" className="text-sm font-medium">Precisa de troco?</Label>
                <Input
                  id="change"
                  type="number"
                  step="0.01"
                  min={total}
                  value={changeFor}
                  onChange={(e) => setChangeFor(e.target.value)}
                  placeholder={`Ex: ${(total + 10).toFixed(2)}`}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Total: R$ {total.toFixed(2).replace('.', ',')}</span>
                  {changeFor && parseFloat(changeFor) > total && (
                    <span className="text-primary font-medium">
                      Troco: R$ {(parseFloat(changeFor) - total).toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Deixe em branco se não precisar de troco
                </p>
              </div>
            )}
          </div>

          <Separator />

          {/* Cart Items */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Itens do Pedido</Label>
            
            {cartItems.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Seu carrinho está vazio
              </p>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item, index) => {
                  const itemTotal = (item.price + item.extras.reduce((sum, extra) => sum + extra.price, 0)) * item.quantity;
                  const uniqueKey = `${item.id}-${index}`;
                  return (
                    <div key={uniqueKey} className="bg-muted rounded-lg p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          {item.extras.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.extras.map((extra) => (
                                <Badge key={extra.id} variant="outline" className="text-xs">
                                  {extra.name} +R${extra.price.toFixed(2).replace('.', ',')}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="font-semibold text-primary">
                          R$ {itemTotal.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => item.quantity === 1 ? onRemoveItem(uniqueKey) : onUpdateQuantity(uniqueKey, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUpdateQuantity(uniqueKey, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onRemoveItem(uniqueKey)}
                          className="text-xs"
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <>
              <Separator />
              
              {/* Total */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                  onClick={sendToWhatsApp}
                  disabled={!isFormValid()}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Enviar Pedido via WhatsApp
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};