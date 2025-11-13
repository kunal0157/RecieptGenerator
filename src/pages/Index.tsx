import { useState } from "react";
import { BookingForm, BookingData } from "@/components/BookingForm";
import { ReceiptPreview } from "@/components/ReceiptPreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download, FileText, Sparkles } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [bookingData, setBookingData] = useState<BookingData>({
    eventName: "",
    eventDate: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    djType: "",
    paymentMethod: "",
    hours: "",
    location: "",
    totalAmount: "",
    advanceAmount: "",
    notes: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    const element = document.getElementById("receipt-preview");
    if (!element) return;

    setIsGenerating(true);
    
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        windowHeight: element.scrollHeight + 100,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min((pdfWidth - 10) / imgWidth, (pdfHeight - 20) / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      const fileName = `DJ_Booking_Receipt_${Date.now()}.pdf`;
      pdf.save(fileName);

      toast({
        title: "Receipt Downloaded!",
        description: "Your DJ booking receipt has been saved as PDF.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero text-white py-4 sm:py-6 px-4 shadow-glow overflow-hidden animate-gradient">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        <div className="container mx-auto text-center space-y-2 relative z-10 max-w-4xl">
          <div className="flex justify-center mb-2 animate-fade-in">
            <div className="p-2 bg-white/20 backdrop-blur-lg rounded-xl shadow-glow">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
            </div>
          </div>
          <div className="space-y-1 animate-slide-up px-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              DJ Booking Receipt Generator
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto px-4">
              Fill in the details and download as PDF in seconds
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="space-y-4 sm:space-y-6">
            <BookingForm onSubmit={setBookingData} initialData={bookingData} />
          </div>

          {/* Preview Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 animate-fade-in">
              <div className="w-full sm:w-auto">
                <h2 className="text-2xl sm:text-3xl font-bold">Receipt Preview</h2>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">Live preview of your receipt</p>
              </div>
              <Button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-glow h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base font-semibold w-full sm:w-auto"
                size="lg"
              >
                <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                {isGenerating ? "Generating..." : "Download PDF"}
              </Button>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <ReceiptPreview data={bookingData} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 mt-12 sm:mt-16 py-6 sm:py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-xs sm:text-sm">© 2025 DJ Booking Receipt Generator. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
