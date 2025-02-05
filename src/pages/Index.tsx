import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

const DomainManager = () => {
  const [domain, setDomain] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Domain yönlendirme başarılı!",
        description: `${domain} başarıyla yönlendirildi.`,
      });

      // Reset form
      setDomain("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata!",
        description: "Domain yönlendirme sırasında bir hata oluştu.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bayi Profil Yönetimi</h1>
          <p className="mt-2 text-gray-600">Domain yönlendirme ve profil ayarlarınızı buradan yönetebilirsiniz.</p>
        </div>

        <Tabs defaultValue="domain" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="domain">Domain Yönetimi</TabsTrigger>
            <TabsTrigger value="profile">Profil Bilgileri</TabsTrigger>
          </TabsList>

          <TabsContent value="domain">
            <Card>
              <CardHeader>
                <CardTitle>Subdomain Yönetimi</CardTitle>
                <CardDescription>
                  Yenitoptancı altyapısına yönlendirilecek subdomain'inizi buradan ayarlayabilirsiniz.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="domain" className="text-sm font-medium text-gray-700">
                      Subdomain Adresi
                    </label>
                    <Input
                      id="domain"
                      type="text"
                      placeholder="market.firmaadi.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full"
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Örnek: market.firmaadi.com
                    </p>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-700">
                      Girdiğiniz subdomain otomatik olarak Yenitoptancı altyapısına yönlendirilecektir.
                    </AlertDescription>
                  </Alert>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Yönlendiriliyor..." : "Yönlendirmeyi Başlat"}
                  </Button>
                </form>

                {domain && (
                  <div className="mt-6">
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        DNS ayarlarınızı tamamladıktan sonra yönlendirme aktif olacaktır.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profil Bilgileri</CardTitle>
                <CardDescription>
                  Firma bilgilerinizi buradan güncelleyebilirsiniz.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Firma Adı</label>
                      <Input placeholder="Firma Adı" disabled value="Demo Firma" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Vergi No</label>
                      <Input placeholder="Vergi No" disabled value="1234567890" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input placeholder="Email" disabled value="demo@firma.com" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DomainManager;