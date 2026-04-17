import { useState } from "react";
import { BookingForm, BookingData } from "@/components/BookingForm";
import { ReceiptPreview } from "@/components/ReceiptPreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { Camera, Mail, MessageCircle, Share2, Sparkles } from "lucide-react";

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

  const generateImage = async (isForShare = false) => {
    const element = document.getElementById("receipt-preview");
    if (!element) return null;

    // Temporarily adjust for ideal capture
    const originalStyle = element.style.cssText;
    const container = element.querySelector(".a4-container") as HTMLElement;
    const originalContainerStyle = container.style.cssText;

    // Force A4 dimensions (at approx 300 DPI equivalent for quality)
    container.style.width = "794px"; // Standard web A4 width
    container.style.height = "1123px"; // Standard web A4 height
    container.style.position = "absolute";
    container.style.left = "-9999px"; // Move off-screen to avoid visual jump
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        scale: 3, // Quality boost (results in ~2382px width)
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
        allowTaint: true,
        windowWidth: 794,
        windowHeight: 1123,
      });

      // Cleanup
      element.appendChild(container);
      container.style.cssText = originalContainerStyle;
      element.style.cssText = originalStyle;
      return canvas;
    } catch (error) {
      console.error("Capture failed", error);
      element.appendChild(container);
      container.style.cssText = originalContainerStyle;
      element.style.cssText = originalStyle;
      return null;
    }
  };

  const handleDownloadImage = async () => {
    setIsGenerating(true);
    const canvas = await generateImage();
    
    if (canvas) {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `Receipt_${bookingData.customerName || "Customer"}_${Date.now()}.png`;
      link.click();

      toast({
        title: "Photo Saved!",
        description: "Your receipt has been saved as a high-quality photo.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to generate photo. Please try again.",
        variant: "destructive",
      });
    }
    setIsGenerating(false);
  };

  const shareDetails = (platform: "whatsapp" | "email") => {
    const remaining = bookingData.totalAmount && bookingData.advanceAmount 
      ? (parseFloat(bookingData.totalAmount) - parseFloat(bookingData.advanceAmount)).toFixed(2)
      : "0";
      
    const message = `*KUKU MAHI SOUND EFFECT*
---------------------------
*DJ Booking Receipt*
Customer: ${bookingData.customerName || "-"}
Event: ${bookingData.eventName || "-"}
Date: ${bookingData.eventDate || "-"}
Total: ₹${bookingData.totalAmount || "0"}
Advance: ₹${bookingData.advanceAmount || "0"}
*Remaining: ₹${remaining}*
---------------------------
Please check the attached receipt photo for more details.`;

    if (platform === "whatsapp") {
      const waUrl = `https://wa.me/${bookingData.customerPhone?.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
    }
  };

  const handleWebShare = async () => {
    const canvas = await generateImage(true);
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "receipt.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "DJ Booking Receipt",
            text: "Here is your receipt from Kuku Mahi Sound Effect.",
          });
        } catch (error) {
          console.log("Sharing failed", error);
        }
      } else {
        toast({
          title: "Not Supported",
          description: "Direct sharing not supported on this browser. Please use Download instead.",
        });
      }
    }, "image/png");
  };

  const handleGenerateAndShareAll = async () => {
    setIsGenerating(true);
    
    // 1. Download Image
    const canvas = await generateImage();
    if (canvas) {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `Receipt_${bookingData.customerName || "Customer"}_${Date.now()}.png`;
      link.click();
      
      toast({
        title: "Receipt Downloaded!",
        description: "Opening WhatsApp share...",
      });

      // 2. Try Web Share API first (for mobile/supported browsers to share actual image)
      canvas.toBlob(async (blob) => {
        if (blob && navigator.share && navigator.canShare({ files: [new File([blob], "receipt.png", { type: "image/png" })] })) {
          const file = new File([blob], "receipt.png", { type: "image/png" });
          try {
            await navigator.share({
              files: [file],
              title: "DJ Booking Receipt",
              text: "Receipt from Kuku Mahi Sound Effect",
            });
          } catch (error) {
            console.log("Web Share failed, falling back to URL share");
            shareDetails("whatsapp");
          }
        } else {
          // Fallback to text WhatsApp share
          shareDetails("whatsapp");
        }
      }, "image/png");

    } else {
      toast({
        title: "Error",
        description: "Failed to generate receipt.",
        variant: "destructive",
      });
    }
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-primary text-white py-8 px-4 shadow-xl border-b border-white/10 overflow-hidden">
        <div className="container mx-auto text-center space-y-4 max-w-4xl relative z-10">
          <div className="flex justify-center mb-2 animate-fade-in">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Sparkles className="w-8 h-8 text-secondary" />
            </div>
          </div>
          <div className="space-y-1 animate-slide-up">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter">
              KUKU MAHI <span className="text-secondary">RECEIPT</span>
            </h1>
            <p className="text-sm md:text-base text-white/60 font-medium tracking-widest uppercase">
              Premium DJ Booking Generator
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto items-start">
          {/* Form Section */}
          <div className="space-y-6">
            <BookingForm onSubmit={setBookingData} initialData={bookingData} />
            
            {/* Quick Actions for Mobile */}
            <div className="lg:hidden grid grid-cols-2 gap-3">
              <Button onClick={handleDownloadImage} disabled={isGenerating} className="h-12 bg-primary">
                <Camera className="mr-2 w-4 h-4" /> Save Photo
              </Button>
              <Button onClick={() => shareDetails("whatsapp")} className="h-12 bg-green-600 hover:bg-green-700">
                <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-6 bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-4 z-20">
              <div>
                <h2 className="text-xl font-black text-primary uppercase tracking-tight">Receipt View</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">A4 Premium Layout</p>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button
                  onClick={handleGenerateAndShareAll}
                  disabled={isGenerating}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 h-12 shadow-lg animate-pulse hover:animate-none group"
                >
                  <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  {isGenerating ? "Preparing..." : "Share on WhatsApp"}
                </Button>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleDownloadImage}
                    title="Download Photo Only"
                    className="rounded-full"
                  >
                    <Camera className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleWebShare}
                    className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
                    title="More Share Options"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="shadow-2xl rounded-2xl overflow-hidden border border-slate-200 bg-white">
              <ReceiptPreview data={bookingData} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-12 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="font-black text-primary tracking-tighter text-xl">
            KUKU MAHI <span className="text-secondary">SOUND</span>
          </p>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.5em]">
            Quality Excellence Since 2010
          </p>
          <p className="text-xs text-slate-300">© 2025 Kuku Mahi Sound Effect. Generator v2.0</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
