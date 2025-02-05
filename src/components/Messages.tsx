import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const messages = [
  {
    supplier: "Endüstriyel Mutfak Ltd.",
    lastMessage: "Ürün stokta mevcut, hemen kargoya verebiliriz.",
    date: "2024-02-05",
    unread: true
  },
  {
    supplier: "Pro Ekipman A.Ş.",
    lastMessage: "İndirim kampanyamız devam ediyor.",
    date: "2024-02-04",
    unread: false
  }
];

const Messages = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Mesajlar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Mesajlarım</DialogTitle>
          <DialogDescription>Tedarikçilerle olan mesajlaşmalarınız</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 mb-2 border rounded-lg ${message.unread ? 'bg-blue-50' : 'bg-white'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{message.supplier}</h3>
                <span className="text-sm text-gray-500">{message.date}</span>
              </div>
              <p className="text-sm text-gray-600">{message.lastMessage}</p>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Messages;