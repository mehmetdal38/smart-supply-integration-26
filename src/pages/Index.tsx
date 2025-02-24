import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

const products: Product[] = [
  {
    id: 1,
    name: "Endüstriyel Bulaşık Makinesi",
    price: 45000,
    category: "Mutfak Ekipmanları",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1585090944524-75496c0e0b21",
    supplier: "Endüstriyel Mutfak Ltd.",
    description: "Profesyonel mutfaklar için yüksek kapasiteli, enerji verimli endüstriyel bulaşık makinesi. Saatte 500 tabak yıkama kapasitesi.",
    desi: 50,
    additionalImages: [
      "https://images.unsplash.com/photo-1585090944524-75496c0e0b21",
      "https://images.unsplash.com/photo-1585090944524-75496c0e0b22",
      "https://images.unsplash.com/photo-1585090944524-75496c0e0b23"
    ]
  },
  {
    id: 2,
    name: "Profesyonel Bıçak Seti",
    price: 2500,
    category: "Mutfak Gereçleri",
    unit: "set",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546",
    supplier: "Pro Ekipman A.Ş.",
    description: "Yüksek kaliteli paslanmaz çelikten üretilmiş, profesyonel kullanım için ideal bıçak seti.",
    desi: 3,
    additionalImages: [
      "https://images.unsplash.com/photo-1593618998160-e34014e67546",
      "https://images.unsplash.com/photo-1593618998160-e34014e67547",
      "https://images.unsplash.com/photo-1593618998160-e34014e67548"
    ]
  },
  {
    id: 3,
    name: "Servis Tabakları (6'lı)",
    price: 1200,
    category: "Servis Ekipmanları",
    unit: "set",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    supplier: "Endüstriyel Mutfak Ltd.",
    description: "Şık tasarımıyla dikkat çeken, dayanıklı servis tabakları seti.",
    desi: 5,
    additionalImages: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c10",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c11"
    ]
  },
  {
    id: 4,
    name: "Garson Önlüğü",
    price: 350,
    category: "Tekstil",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16",
    supplier: "Tekstil Tedarik A.Ş.",
    description: "Dayanıklı ve şık garson önlüğü, restoranlar için ideal.",
    desi: 1,
    additionalImages: [
      "https://images.unsplash.com/photo-1581299894007-aaa50297cf16",
      "https://images.unsplash.com/photo-1581299894007-aaa50297cf17",
      "https://images.unsplash.com/photo-1581299894007-aaa50297cf18"
    ]
  },
  {
    id: 5,
    name: "Endüstriyel Mikser",
    price: 8500,
    category: "Mutfak Ekipmanları",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7",
    supplier: "Pro Ekipman A.Ş.",
    description: "Yüksek kapasiteli endüstriyel mikser, profesyonel mutfaklar için tasarlandı.",
    desi: 15,
    additionalImages: [
      "https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7",
      "https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d8",
      "https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d9"
    ]
  },
  {
    id: 6,
    name: "Masa Örtüsü (10'lu)",
    price: 750,
    category: "Tekstil",
    unit: "set",
    image: "https://images.unsplash.com/photo-1563290131-a6b9a0e8bea9",
    supplier: "Tekstil Tedarik A.Ş.",
    description: "Şık masa örtüleri seti, her türlü etkinlik için uygundur.",
    desi: 2,
    additionalImages: [
      "https://images.unsplash.com/photo-1563290131-a6b9a0e8bea9",
      "https://images.unsplash.com/photo-1563290131-a6b9a0e8bea10",
      "https://images.unsplash.com/photo-1563290131-a6b9a0e8bea11"
    ]
  },
  {
    id: 7,
    name: "Endüstriyel Fırın",
    price: 35000,
    category: "Mutfak Ekipmanları",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1590433332541-12e70dd1d4a9",
    supplier: "Endüstriyel Mutfak Ltd.",
    description: "Yüksek kapasiteli endüstriyel fırın, profesyonel mutfaklar için idealdir.",
    desi: 100,
    additionalImages: [
      "https://images.unsplash.com/photo-1590433332541-12e70dd1d4a9",
      "https://images.unsplash.com/photo-1590433332541-12e70dd1d4a10",
      "https://images.unsplash.com/photo-1590433332541-12e70dd1d4a11"
    ]
  },
  {
    id: 8,
    name: "Bar Blender",
    price: 4500,
    category: "Mutfak Ekipmanları",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b",
    supplier: "Pro Ekipman A.Ş.",
    description: "Kafe ve restoranlar için ideal bar blender.",
    desi: 4,
    additionalImages: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b",
      "https://images.unsplash.com/photo-1570222094114-d054a817e56c",
      "https://images.unsplash.com/photo-1570222094114-d054a817e56d"
    ]
  },
  {
    id: 9,
    name: "Şef Kıyafeti Seti",
    price: 1200,
    category: "Tekstil",
    unit: "set",
    image: "https://images.unsplash.com/photo-1581299894681-aa3f46faddd7",
    supplier: "Tekstil Tedarik A.Ş.",
    description: "Profesyonel şef kıyafeti seti, restoranlar için tasarlandı.",
    desi: 2,
    additionalImages: [
      "https://images.unsplash.com/photo-1581299894681-aa3f46faddd7",
      "https://images.unsplash.com/photo-1581299894681-aa3f46faddd8",
      "https://images.unsplash.com/photo-1581299894681-aa3f46faddd9"
    ]
  },
  {
    id: 10,
    name: "Endüstriyel Ocak",
    price: 15000,
    category: "Mutfak Ekipmanları",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1590433332931-7437f4786d11",
    supplier: "Endüstriyel Mutfak Ltd.",
    description: "Yüksek performanslı endüstriyel ocak, profesyonel mutfaklar için idealdir.",
    desi: 40,
    additionalImages: [
      "https://images.unsplash.com/photo-1590433332931-7437f4786d11",
      "https://images.unsplash.com/photo-1590433332931-7437f4786d12",
      "https://images.unsplash.com/photo-1590433332931-7437f4786d13"
    ]
  },
  {
    id: 11,
    name: "Servis Tepsileri (4'lü)",
    price: 800,
    category: "Servis Ekipmanları",
    unit: "set",
    image: "https://images.unsplash.com/photo-1595856619767-ab951ca3b8bf",
    supplier: "Pro Ekipman A.Ş.",
    description: "Dayanıklı servis tepsileri seti, her türlü etkinlik için uygundur.",
    desi: 6,
    additionalImages: [
      "https://images.unsplash.com/photo-1595856619767-ab951ca3b8bf",
      "https://images.unsplash.com/photo-1595856619767-ab951ca3b8bg",
      "https://images.unsplash.com/photo-1595856619767-ab951ca3b8bh"
    ]
  },
  {
    id: 12,
    name: "Mutfak Önlüğü (3'lü)",
    price: 450,
    category: "Tekstil",
    unit: "set",
    image: "https://images.unsplash.com/photo-1581299894681-aa3f46faddd7",
    supplier: "Tekstil Tedarik A.Ş.",
    description: "Şık ve dayanıklı mutfak önlükleri seti.",
    desi: 1,
    additionalImages: [
      "https://images.unsplash.com/photo-1581299894681-aa3f46faddd7",
      "https://images.unsplash.com/photo-1581299894681-aa3f46faddd8",
      "https://images.unsplash.com/photo-1581299894681-aa3f46faddd9"
    ]
  }
];

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const categories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartTotalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...currentCart, { product, quantity }];
    });
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(currentCart =>
      currentCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src="https://s.tmimgcdn.com/scr/800x500/300400/yaratici-restoran-logo-tasarimi_300465-original.jpg" 
                  alt="Logo" 
                  className="h-12 w-auto object-contain" 
                />
                <h1 className="ml-4 text-2xl font-bold text-gray-900">Restoran Tedarik</h1>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {cartTotalQuantity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <div className="flex gap-2 items-center">
            <Filter className="h-5 w-5" />
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

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 1}
              onQuantityChange={(productId, newQuantity) => {
                if (newQuantity > 0) {
                  setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
                }
              }}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
