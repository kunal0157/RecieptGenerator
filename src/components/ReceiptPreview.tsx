import { BookingData } from "./BookingForm";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";

interface ReceiptPreviewProps {
  data: BookingData;
}

export const ReceiptPreview = ({ data }: ReceiptPreviewProps) => {
  const balance = data.totalAmount && data.advanceAmount 
    ? (parseFloat(data.totalAmount) - parseFloat(data.advanceAmount)).toFixed(2)
    : "0";

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const receiptNumber = `KMS-${Math.floor(Math.random() * 9000) + 1000}`;

  return (
    <div id="receipt-preview" className="bg-slate-50 p-4 md:p-8 flex justify-center overflow-auto">
      <div className="a4-container font-sans text-slate-900 relative">
        <div className="watermark">OFFICIAL</div>
        
        {/* Header Section */}
        <div className="flex justify-between items-start border-b-2 border-primary/20 pb-8 mb-8 relative z-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tighter text-primary">
              KUKU MAHI <span className="text-secondary">SOUND EFFECT</span>
            </h1>
            <p className="text-sm font-bold tracking-widest text-slate-500 uppercase">
              Professional DJ & Sound Services
            </p>
            <div className="pt-4 space-y-1 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-secondary" />
                <span>Indore, Madhya Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-secondary" />
                <span>+91 91799 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-secondary" />
                <span>contact@kukumahesound.com</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-black text-slate-200 uppercase tracking-tighter mb-2">
              Receipt
            </h2>
            <div className="space-y-1 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p><span className="text-slate-400 font-bold uppercase text-[10px]">No:</span> <span className="font-mono font-bold text-primary">{receiptNumber}</span></p>
              <p><span className="text-slate-400 font-bold uppercase text-[10px]">Date:</span> <span className="font-bold">{currentDate}</span></p>
            </div>
          </div>
        </div>

        {/* Customer & Event Details Section */}
        <div className="grid grid-cols-2 gap-12 mb-10 relative z-10">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-3">
              Customer Details
            </h3>
            <div className="space-y-1">
              <p className="text-lg font-bold text-primary">{data.customerName || "Customer Name"}</p>
              <p className="text-sm font-medium text-slate-600">{data.customerPhone || "Phone Number"}</p>
              {data.customerEmail && <p className="text-sm font-medium text-slate-600">{data.customerEmail}</p>}
              <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
                {data.location || "Event Location"}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-3">
              Event Details
            </h3>
            <div className="space-y-1">
              <p className="text-lg font-bold text-primary">{data.eventName || "Event Name"}</p>
              <p className="text-sm font-bold text-slate-600">
                {data.eventDate ? new Date(data.eventDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }) : "Event Date"}
              </p>
              <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Type: {data.djType || "Standard"} DJ
              </p>
              <p className="text-sm font-bold text-slate-500">
                Duration: {data.hours || "0"} Hours
              </p>
            </div>
          </div>
        </div>

        {/* Payment Summary Table */}
        <div className="flex-grow relative z-10">
          <table className="w-full mb-10">
            <thead>
              <tr className="border-y-2 border-slate-200">
                <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-6">
                  <p className="font-bold text-primary">DJ Booking Service</p>
                  <p className="text-xs text-slate-400 mt-1">Professional sound setup and performance for {data.eventName || "event"}</p>
                </td>
                <td className="py-6 text-right font-bold text-primary">
                  ₹{data.totalAmount ? parseInt(data.totalAmount).toLocaleString("en-IN") : "0"}
                </td>
              </tr>
              {data.notes && (
                <tr>
                  <td colSpan={2} className="py-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Additional Notes</p>
                    <p className="text-xs text-slate-600 italic leading-relaxed">{data.notes}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Totals Section */}
          <div className="flex justify-end relative z-10">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-sm py-1">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Total Amount</span>
                <span className="font-bold">₹{parseInt(data.totalAmount || "0").toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm py-1 text-green-600">
                <span className="font-bold uppercase text-[10px]">Advance Paid</span>
                <span className="font-bold">- ₹{parseInt(data.advanceAmount || "0").toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-lg py-3 border-t-2 border-primary bg-primary text-white px-4 rounded-lg shadow-lg">
                <span className="font-black uppercase text-[10px] self-center">Remaining</span>
                <span className="font-black text-2xl">₹{parseInt(balance).toLocaleString("en-IN")}</span>
              </div>
              <p className="text-[9px] text-right text-slate-400 font-bold italic mt-2">
                * To be cleared before the event starts.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t-2 border-slate-100 pt-10 mt-10 relative z-10">
          <div className="flex justify-between items-end px-4">
            <div className="flex flex-col items-center">
              <div className="bg-white p-2 rounded-xl border-2 border-primary/10 mb-4 shadow-sm">
                <QRCodeCanvas 
                  value={`upi://pay?pa=8271929970@axl&pn=KUKU%20MAHI%20SOUND%20EFFECT&cu=INR`}
                  size={80}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-tighter">Scan to Pay</p>
              <p className="text-[8px] text-slate-400 font-bold leading-tight uppercase text-center">
                UPI ID: 8271929970@axl
              </p>
            </div>
            
            <div className="text-center w-48">
              <div className="border-b-2 border-slate-200 mb-3 h-12"></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Customer Signature</p>
            </div>

            <div className="text-center w-48">
              <div className="border-b-2 border-primary/20 mb-3 h-12"></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Authorized Signatory</p>
            </div>
          </div>
          
          <div className="mt-12 text-center text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]">
            Thank You For Choosing Kuku Mahi Sound Effect
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 -ml-16 -mb-16 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};
