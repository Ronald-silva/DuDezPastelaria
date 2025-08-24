import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/data/menu";

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  onSelect: (categoryId: string) => void;
}

export const CategoryCard = ({ category, isActive, onSelect }: CategoryCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 border-2 ${
        isActive 
          ? 'border-primary bg-brand-gradient text-primary-foreground shadow-lg scale-105' 
          : 'border-border hover:border-primary/50 hover:shadow-md'
      }`}
      onClick={() => onSelect(category.id)}
    >
      <CardContent className="p-4 text-center">
        <div className="text-2xl mb-2">{category.icon}</div>
        <h3 className={`font-semibold text-sm leading-tight ${
          isActive ? 'text-primary-foreground' : 'text-foreground'
        }`}>
          {category.name}
        </h3>
      </CardContent>
    </Card>
  );
};