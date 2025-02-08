import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { History, Truck, RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

const pastOrders = [
  {
    id: "ORD001",
    date: "2024-02-05",
    total: 48750,
    status: "Teslim Edildi",
    trackingCode: "1234567890",
    trackingUrl: "https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula?code=1234567890",
    invoice: "INV001",
    items: [
      { name: "Endüstriyel Bulaşık Makinesi", quantity: 1, price: 45000, returnEligible: true },
      { name: "Profesyonel Bıçak Seti", quantity: 1, price: 2500, returnEligible: true },
      { name: "Servis Tabakları (6'lı)", quantity: 1, price: 1200, returnEligible: false }
    ]
  },
  {
    id: "ORD002",
    date: "2024-02-03",
    total: 9600,
    status: "Teslim Edildi",
    trackingCode: "9876543210",
    trackingUrl: "https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula?code=9876543210",
    invoice: "INV002",
    items: [
      { name: "Endüstriyel Mikser", quantity: 1, price: 8500, returnEligible: true },
      { name: "Garson Önlüğü", quantity: 3, price: 350, returnEligible: false }
    ]
  }
];

const PastOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [showReturnDialog, setShowReturnDialog] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Geçmiş Siparişler
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Geçmiş Siparişlerim</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {pastOrders.map((order) => (
            <div key={order.id} className="mb-6 border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">Sipariş No: {order.id}</p>
                  <p className="text-sm text-muted-foreground">Tarih: {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Toplam: {order.total} TL</p>
                  <p className="text-sm text-green-600">{order.status}</p>
                  <div className="flex items-center gap-2 justify-end mt-1">
                    <a
                      href={order.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Truck className="h-4 w-4" />
                      Kargo Takip: {order.trackingCode}
                    </a>
                    <a
                      href={`/invoices/${order.invoice}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Fatura
                    </a>
                  </div>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ürün</TableHead>
                    <TableHead className="text-right">Adet</TableHead>
                    <TableHead className="text-right">Fiyat</TableHead>
                    <TableHead className="text-right">Toplam</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.price} TL</TableCell>
                      <TableCell className="text-right">{item.quantity * item.price} TL</TableCell>
                      <TableCell className="text-right">
                        {item.returnEligible && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => {
                              setSelectedOrder(order.id);
                              setShowReturnDialog(true);
                            }}
                          >
                            <RefreshCw className="h-4 w-4" />
                            İade/Değişim
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </DialogContent>

      <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>İade/Değişim Talebi</DialogTitle>
            <DialogDescription>
              İade veya değişim talebinizi oluşturun. Talebiniz incelendikten sonra size dönüş yapılacaktır.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">İade/Değişim Nedeni</label>
              <textarea
                className="w-full min-h-[100px] p-2 border rounded-md"
                placeholder="Lütfen iade veya değişim talebinizin nedenini açıklayın..."
              />
            </div>
            <Button
              className="w-full"
              onClick={() => {
                setShowReturnDialog(false);
                setSelectedOrder(null);
              }}
            >
              Talebi Gönder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default PastOrders;
