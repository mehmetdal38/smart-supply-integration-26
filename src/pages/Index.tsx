import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Filter, MessageSquare, Plus, Minus, MessageCircle, Clock, HelpCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import PastOrders from "@/components/PastOrders";
import Messages from "@/components/Messages";
import Support from "@/components/Support";
import { useIsMobile } from "@/hooks/use-mobile";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  unit: string;
  image: string;
  supplier: string;
  description?: string;
  additionalImages?: string[];
}

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
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"credit-card">("credit-card");
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    taxId: "",
    address: "",
    city: "",
    phone: ""
  });
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const isMobile = useIsMobile();

  const categories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartTotalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const calculateShippingCost = (totalQuantity: number) => {
    const desiRate = 50;
    const desiPerItem = 5; 
    const totalDesi = Math.ceil((totalQuantity * desiPerItem) / 5);
    return totalDesi * desiRate;
  };

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

  const removeFromCart = (productId: number) => {
    setCart(currentCart => currentCart.filter(item => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const incrementQuantity = (productId: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  const decrementQuantity = (productId: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col">
            <div className="flex items-center">
              <img 
                src="https://s.tmimgcdn.com/scr/800x500/300400/yaratici-restoran-logo-tasarimi_300465-original.jpg" 
                alt="Logo" 
                className="h-12 w-auto object-contain" 
              />
              <h1 className="ml-4 text-2xl font-bold text-gray-900">Restoran Tedarik</h1>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              {isMobile ? (
                <div className="flex gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <MessageCircle className="h-6 w-6 cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>Mesajlarım</DialogTitle>
                      </DialogHeader>
                      <Messages />
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Clock className="h-6 w-6 cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>Geçmiş Siparişlerim</DialogTitle>
                      </DialogHeader>
                      <PastOrders />
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <HelpCircle className="h-6 w-6 cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>Yardım Merkezi</DialogTitle>
                      </DialogHeader>
                      <Support />
                    </DialogContent>
                  </Dialog>

                  <Sheet>
                    <SheetTrigger asChild>
                      <div className="relative cursor-pointer">
                        <ShoppingCart className="h-6 w-6" />
                        {cartTotalQuantity > 0 && (
                          <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {cartTotalQuantity}
                          </span>
                        )}
                      </div>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-lg">
                      <SheetHeader>
                        <SheetTitle>Sepetim</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4 space-y-4">
                        {cart.map(item => (
                          <div key={item.product.id} className="flex justify-between items-center">
                            <div className="flex-1">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-500">
                                {item.product.price} TL
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {cart.length > 0 ? (
                          <div className="border-t pt-4">
                            <div className="space-y-2">
                              <div className="flex justify-between font-medium">
                                <span>Ara Toplam</span>
                                <span>{cartTotal} TL</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Kargo Bedeli</span>
                                <span>{calculateShippingCost(cartTotalQuantity)} TL</span>
                              </div>
                              <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Toplam</span>
                                <span>{cartTotal + calculateShippingCost(cartTotalQuantity)} TL</span>
                              </div>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="w-full mt-4">
                                  Ödemeye Geç
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Ödeme Bilgileri</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-4">
                                    <h3 className="font-medium">Fatura Bilgileri</h3>
                                    <Input
                                      placeholder="Firma Adı"
                                      value={billingInfo.name}
                                      onChange={(e) => setBillingInfo({ ...billingInfo, name: e.target.value })}
                                    />
                                    <Input
                                      placeholder="Vergi No"
                                      value={billingInfo.taxId}
                                      onChange={(e) => setBillingInfo({ ...billingInfo, taxId: e.target.value })}
                                    />
                                    <Input
                                      placeholder="Adres"
                                      value={billingInfo.address}
                                      onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                                    />
                                    <Input
                                      placeholder="Şehir"
                                      value={billingInfo.city}
                                      onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                                    />
                                    <Input
                                      placeholder="Telefon"
                                      value={billingInfo.phone}
                                      onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-4">
                                    <h3 className="font-medium">Kart Bilgileri</h3>
                                    <Input placeholder="Kart Numarası" />
                                    <div className="grid grid-cols-2 gap-4">
                                      <Input placeholder="Son Kullanma Tarihi" />
                                      <Input placeholder="CVV" />
                                    </div>
                                  </div>
                                  <Button className="w-full" onClick={() => setShowPayment(false)}>
                                    Ödemeyi Tamamla
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        ) : (
                          <p className="text-center text-gray-500">Sepetiniz boş</p>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              ) : (
                <>
                  <Messages />
                  <PastOrders />
                  <Support />
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="relative">
                        <ShoppingCart className="h-5 w-5" />
                        {cartTotalQuantity > 0 && (
                          <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {cartTotalQuantity}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-lg">
                      <SheetHeader>
                        <SheetTitle>Sepetim</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4 space-y-4">
                        {cart.map(item => (
                          <div key={item.product.id} className="flex justify-between items-center">
                            <div className="flex-1">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-500">
                                {item.product.price} TL
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {cart.length > 0 ? (
                          <div className="border-t pt-4">
                            <div className="space-y-2">
                              <div className="flex justify-between font-medium">
                                <span>Ara Toplam</span>
                                <span>{cartTotal} TL</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Kargo Bedeli</span>
                                <span>{calculateShippingCost(cartTotalQuantity)} TL</span>
                              </div>
                              <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Toplam</span>
                                <span>{cartTotal + calculateShippingCost(cartTotalQuantity)} TL</span>
                              </div>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="w-full mt-4">
                                  Ödemeye Geç
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Ödeme Bilgileri</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-4">
                                    <h3 className="font-medium">Fatura Bilgileri</h3>
                                    <Input
                                      placeholder="Firma Adı"
                                      value={billingInfo.name}
                                      onChange={(e) => setBillingInfo({ ...billingInfo, name: e.target.value })}
                                    />
                                    <Input
                                      placeholder="Vergi No"
                                      value={billingInfo.taxId}
                                      onChange={(e) => setBillingInfo({ ...billingInfo, taxId: e.target.value })}
                                    />
                                    <Input
                                      placeholder="Adres"
                                      value={billingInfo.address}
                                      onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                                    />
                                    <Input
                                      placeholder="Şehir"
                                      value={billingInfo.city}
                                      onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                                    />
                                    <Input
                                      placeholder="Telefon"
                                      value={billingInfo.phone}
                                      onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-4">
                                    <h3 className="font-medium">Kart Bilgileri</h3>
                                    <Input placeholder="Kart Numarası" />
                                    <div className="grid grid-cols-2 gap-4">
                                      <Input placeholder="Son Kullanma Tarihi" />
                                      <Input placeholder="CVV" />
                                    </div>
                                  </div>
                                  <Button className="w-full" onClick={() => setShowPayment(false)}>
                                    Ödemeyi Tamamla
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        ) : (
                          <p className="text-center text-gray-500">Sepetiniz boş</p>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                </>
              )}
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
            <Card key={product.id} className="flex flex-col">
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
                            onClick={() => decrementQuantity(product.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">
                            {quantities[product.id] || 1}
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => incrementQuantity(product.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button 
                          size="sm"
                          className="w-full"
                          onClick={() => addToCart(product, quantities[product.id] || 1)}
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
                        onClick={() => decrementQuantity(product.id)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">
                        {quantities[product.id] || 1}
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => incrementQuantity(product.id)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button 
                      size="sm"
                      className="w-full"
                      onClick={() => addToCart(product, quantities[product.id] || 1)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Sepete Ekle
                    </Button>
                  </div>
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
