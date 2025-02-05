import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Filter, Package } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  unit: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Dana Kıyma",
    price: 450,
    category: "Et Ürünleri",
    unit: "kg",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Domates",
    price: 25,
    category: "Sebze",
    unit: "kg",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Ayçiçek Yağı",
    price: 120,
    category: "Yağlar",
    unit: "L",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Pirinç",
    price: 85,
    category: "Bakliyat",
    unit: "kg",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Tavuk Göğsü",
    price: 180,
    category: "Et Ürünleri",
    unit: "kg",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Patates",
    price: 30,
    category: "Sebze",
    unit: "kg",
    image: "/placeholder.svg"
  }
];

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);

  const categories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { product, quantity: 1 }];
    });
  };

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ürün Kataloğu</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sepetim</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} {item.product.unit} x {item.product.price} TL
                      </p>
                    </div>
                    <p className="font-medium">{item.product.price * item.quantity} TL</p>
                  </div>
                ))}
                {cart.length > 0 ? (
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Toplam</span>
                      <span>{cartTotal} TL</span>
                    </div>
                    <Button className="w-full mt-4">Siparişi Tamamla</Button>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">Sepetiniz boş</p>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Filter className="h-5 w-5 mt-3" />
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square relative bg-gray-100">
                <Package className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-gray-400" />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <p className="font-medium text-lg">{product.price} TL / {product.unit}</p>
                  </div>
                  <Button size="sm" onClick={() => addToCart(product)}>
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;