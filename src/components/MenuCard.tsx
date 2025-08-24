import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { MenuItem } from "@/data/menu";

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuCard = ({ item, onAddToCart }: MenuCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-card">
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 space-y-2">
            <div className="flex items-start gap-2">
              <h3 className="font-semibold text-foreground leading-tight text-sm">
                {item.name}
              </h3>
              {item.popular && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground">
                  Popular
                </Badge>
              )}
            </div>
            
            {item.description && (
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {item.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                R$ {item.price.toFixed(2).replace('.', ',')}
              </span>
              
              <Button
                size="sm"
                onClick={() => onAddToCart(item)}
                className="h-8 w-8 p-0 bg-secondary hover:bg-secondary-dark text-secondary-foreground group-hover:scale-110 transition-transform duration-200"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};