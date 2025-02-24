
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: number, newQuantity: number) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard = ({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <Card className="flex flex-col h-full">
      <div className="cursor-pointer">
        <div className="aspect-square relative bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://www.tacev.com/image/cache/catalog/image/cache/catalog/TENCERELER/tt-1508_dekube-1200x1200.webp";
            }}
          />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-sm h-[40px] line-clamp-2 overflow-hidden">{product.name}</CardTitle>
        </CardHeader>
      </div>
      <CardContent className="p-4 pt-0 flex flex-col flex-grow">
        <div className="flex flex-col h-full">
          <Badge variant="secondary" className="w-fit mb-2">
            {product.category}
          </Badge>
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">{product.price} TL</p>
          </div>
          <div className="mt-auto">
            <div className="flex items-center gap-1 justify-end mb-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onQuantityChange(product.id, quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center">
                {quantity}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onQuantityChange(product.id, quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Button 
              size="sm"
              className="w-full"
              onClick={() => onAddToCart(product, quantity)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Sepete Ekle
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
