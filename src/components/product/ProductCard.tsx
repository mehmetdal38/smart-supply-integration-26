
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, Plus, Minus, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
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
    <Card className="flex flex-col">
      <Dialog>
        <DialogTrigger asChild>
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
            <CardHeader className="p-4 flex-grow">
              <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
            </CardHeader>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>
              Ürün detaylarını inceleyin ve sepete ekleyin
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://www.tacev.com/image/cache/catalog/image/cache/catalog/TENCERELER/tt-1508_dekube-1200x1200.webp";
                  }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.additionalImages?.map((img, index) => (
                  <div key={index} className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://www.tacev.com/image/cache/catalog/image/cache/catalog/TENCERELER/tt-1508_dekube-1200x1200.webp";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Ürün Detayları</h3>
                <p className="text-sm text-gray-500">Kategori: {product.category}</p>
                <p className="text-sm text-gray-500">Tedarikçi: {product.supplier}</p>
                <p className="text-sm text-gray-500">Birim: {product.unit}</p>
                <p className="font-semibold text-lg mt-2">{product.price} TL</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 justify-end">
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
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Ürün Açıklaması</h3>
                  <p className="text-sm text-gray-600">
                    {product.description || "Ürün açıklaması bulunmamaktadır."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-col gap-2">
          <Badge variant="secondary" className="w-fit">
            {product.category}
          </Badge>
          <div className="flex justify-between items-center">
            <p className="font-medium">{product.price} TL</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tedarikçi ile Mesajlaş</DialogTitle>
                  <DialogDescription>
                    {product.supplier} ile iletişime geçin
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <Input placeholder="Mesajınızı yazın..." />
                    <Button className="mt-4 w-full">Gönder</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-1 justify-end">
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
              <ShoppingCart className="h-4 w-4" />
              Sepete Ekle
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
