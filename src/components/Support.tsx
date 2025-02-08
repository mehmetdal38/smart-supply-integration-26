import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    question: "Nasıl sipariş verebilirim?",
    answer: "Ürünleri seçip sepete ekledikten sonra ödeme adımlarını takip ederek siparişinizi tamamlayabilirsiniz."
  },
  {
    question: "Ödeme seçenekleri nelerdir?",
    answer: "Kredi kartı ve tedarikçi finansmanı seçenekleriyle ödeme yapabilirsiniz."
  },
  {
    question: "Kargo takibini nasıl yapabilirim?",
    answer: "Siparişlerim bölümünden kargo takip numaranızla takip edebilirsiniz."
  }
];

const guides = [
  {
    title: "Sipariş Verme Rehberi",
    content: "Adım adım sipariş verme sürecini anlatan detaylı rehber..."
  },
  {
    title: "Tedarikçi İletişimi",
    content: "Tedarikçilerle nasıl etkili iletişim kurulacağını anlatan rehber..."
  },
  {
    title: "İade ve Değişim",
    content: "İade ve değişim süreçlerini anlatan detaylı rehber..."
  }
];

const Support = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Yardım
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Yardım Merkezi</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="faq" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">Sık Sorulan Sorular</TabsTrigger>
            <TabsTrigger value="guides">Kullanım Kılavuzları</TabsTrigger>
            <TabsTrigger value="support">Destek Talebi</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[calc(100vh-250px)] sm:h-[500px] mt-4">
            <TabsContent value="faq">
              <Accordion type="single" collapsible>
                {faqData.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            <TabsContent value="guides">
              <div className="space-y-4">
                {guides.map((guide, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="support">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Destek talebinizi aşağıdaki iletişim kanallarından iletebilirsiniz:
                </p>
                <div className="space-y-2">
                  <p className="text-sm">Email: destek@restorantedarik.com</p>
                  <p className="text-sm">Telefon: 0850 123 45 67</p>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Support;
