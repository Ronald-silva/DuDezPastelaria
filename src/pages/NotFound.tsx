import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="text-8xl font-bold text-primary/20">404</div>
        <h1 className="text-3xl font-bold text-foreground">Página não encontrada</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Ops! A página que você está procurando não existe ou foi movida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          
          <Button 
            onClick={() => window.location.href = "/"}
            size="lg"
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark"
          >
            <Home className="h-4 w-4" />
            Ir para o Menu
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-brand-gradient-soft rounded-lg">
          <p className="text-sm text-muted-foreground">
            Que tal dar uma olhada no nosso delicioso menu? 
            <br />
            Temos pastéis e pizzas incríveis esperando por você! 🥟🍕
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
