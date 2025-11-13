import { Card } from "@/components/ui/card";
import { BookingData } from "./BookingForm";

interface ReceiptPreviewProps {
  data: BookingData;
}

export const ReceiptPreview = ({ data }: ReceiptPreviewProps) => {
  const balance = data.totalAmount && data.advanceAmount 
    ? (parseFloat(data.totalAmount) - parseFloat(data.advanceAmount)).toFixed(2)
    : "0";

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const receiptNumber = "";

  return (
    <div id="receipt-preview" className="bg-white p-8 pb-16">
      {/* Double Border Container */}
      <div className="border-[3px] border-[#1e3a5f] p-1 max-w-4xl mx-auto">
        <div className="border-2 border-[#1e3a5f] bg-[#f5f3e8] p-8 pb-12">
          
          {/* Header Section */}
          <div className="text-center mb-6 pb-6 border-b-[3px] border-[#1e3a5f]">
            <div className="flex justify-center mb-4">
              <img 
                src="/kmse.png" 
                alt="KMSE Logo" 
                className="h-16 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <h1 className="text-2xl font-bold text-[#1e3a5f] mb-1">
              KUKU MAHI SOUND EFFECT
            </h1>
            <h2 className="text-3xl font-bold text-[#1e3a5f]">
              DJ BOOKING RECEIPT
            </h2>
          </div>

          {/* Receipt Number and Date */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b-2 border-[#1e3a5f]">
            <div className="flex gap-2">
              <span className="font-bold text-[#1e3a5f]">Receipt No:</span>
              <span className="font-semibold text-[#1e3a5f]">{receiptNumber}</span>
            </div>
            <div className="flex gap-2 justify-end">
              <span className="font-bold text-[#1e3a5f]">Date:</span>
              <span className="font-semibold text-[#1e3a5f]">{currentDate}</span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-6 pb-6 border-b-2 border-[#1e3a5f]">
            <div className="grid gap-2">
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="font-bold text-[#1e3a5f]">Customer Name</span>
                <span className="font-medium text-[#1e3a5f]">{data.customerName || "-"}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="font-bold text-[#1e3a5f]">Contact No</span>
                <span className="font-medium text-[#1e3a5f]">{data.customerPhone || "-"}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="font-bold text-[#1e3a5f]">Address</span>
                <span className="font-medium text-[#1e3a5f]">{data.location || "-"}</span>
              </div>
            </div>
          </div>

          {/* Event Details and Booking Details - Two Columns */}
          <div className="grid md:grid-cols-2 gap-6 mb-6 pb-6 border-b-2 border-[#1e3a5f]">
            {/* Event Details Column */}
            <div>
              <h3 className="font-bold text-[#1e3a5f] mb-3">Event Details</h3>
              <div className="space-y-2">
                <div>
                  <p className="font-bold text-[#1e3a5f]">Event Type</p>
                  <p className="font-medium text-[#1e3a5f]">{data.eventName || "-"}</p>
                </div>
                {data.eventDate && (
                  <div>
                    <p className="font-medium text-[#1e3a5f]">
                      {new Date(data.eventDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}
                {data.djType && (
                  <div>
                    <p className="font-bold text-[#1e3a5f]">DJ Type</p>
                    <p className="font-medium text-[#1e3a5f] capitalize">{data.djType.replace('-', ' ')}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Details Column */}
            <div>
              <h3 className="font-bold text-[#1e3a5f] mb-3">Booking Details</h3>
              <div className="space-y-2">
                {data.hours && (
                  <div>
                    <p className="font-bold text-[#1e3a5f]">Duration</p>
                    <p className="font-medium text-[#1e3a5f]">{data.hours} Hours</p>
                  </div>
                )}
                <div>
                  <p className="font-bold text-[#1e3a5f]">Total Amount</p>
                  <p className="font-semibold text-lg text-[#1e3a5f]">
                    ₹{data.totalAmount ? parseFloat(data.totalAmount).toLocaleString("en-IN") : "0"}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-[#1e3a5f]">Advance Paid</p>
                  <p className="font-semibold text-lg text-[#1e3a5f]">
                    ₹{data.advanceAmount ? parseFloat(data.advanceAmount).toLocaleString("en-IN") : "0"}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-[#1e3a5f]">Remaining Amount</p>
                  <p className="font-semibold text-lg text-[#1e3a5f]">
                    ₹{parseFloat(balance).toLocaleString("en-IN")} (To be paid on event day)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Mode and Received By */}
          <div className="mb-6 pb-6 border-b-2 border-[#1e3a5f]">
            <div className="grid gap-2">
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="font-bold text-[#1e3a5f]">Payment Mode</span>
                <span className="font-medium text-[#1e3a5f] capitalize">
                  {data.paymentMethod || "Cash"}
                </span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="font-bold text-[#1e3a5f]">Received By</span>
                <span className="font-medium text-[#1e3a5f]">
                  KUKU MAHI SOUND EFFECT<br/>
                  <span className="text-sm">(Authorized Representative)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          {data.notes && (
            <div className="mb-6 pb-6 border-b-2 border-[#1e3a5f]">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Additional Notes</h3>
              <p className="text-sm text-[#1e3a5f] whitespace-pre-wrap">{data.notes}</p>
            </div>
          )}

          {/* Signature Section */}
          <div className="pt-4">
            <h3 className="font-bold text-[#1e3a5f] mb-4">Signature</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="border-b-2 border-dotted border-[#1e3a5f] pb-2 mb-2 min-h-[60px]">
                  
                </div>
                <p className="text-sm text-[#1e3a5f] text-center">Authorized Sign</p>
              </div>
              <div>
                <div className="border-b-2 border-dotted border-[#1e3a5f] pb-2 mb-2 min-h-[60px]">
                  
                </div>
                <p className="text-sm text-[#1e3a5f] text-center">Customer Sign</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
