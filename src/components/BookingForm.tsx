import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaMusic, FaCalendar, FaUser, FaDollarSign } from "react-icons/fa";

export interface BookingData {
  eventName: string;
  eventDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  djType: string;
  paymentMethod: string;
  hours: string;
  location: string;
  totalAmount: string;
  advanceAmount: string;
  notes: string;
}

interface BookingFormProps {
  onSubmit: (data: BookingData) => void;
  initialData: BookingData;
}

export const BookingForm = ({ onSubmit, initialData }: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingData>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onSubmit(updatedData);
  };

  const handleSelectChange = (name: string, value: string) => {
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onSubmit(updatedData);
  };

  return (
    <Card className="p-6 shadow-card border-border/50 bg-card/80 backdrop-blur">
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="p-3 bg-gradient-primary rounded-lg">
            <FaMusic className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DJ Booking Details
            </h2>
            <p className="text-sm text-muted-foreground">Fill in the booking information</p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Event Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <FaCalendar />
              <h3 className="font-semibold">Event Information</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="Birthday Party, Wedding, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location">Event Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Venue address"
                />
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-secondary">
              <FaUser />
              <h3 className="font-semibold">Customer Details</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="customerEmail">Email Address</Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <FaDollarSign />
              <h3 className="font-semibold">Package & Pricing</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="djType">DJ Type</Label>
                <Select
                  value={formData.djType}
                  onValueChange={(value) => handleSelectChange("djType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select DJ type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trolly">Trolly</SelectItem>
                    <SelectItem value="stage-show">Stage Show</SelectItem>
                    <SelectItem value="floor">Floor</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Duration (Hours)</Label>
                <Input
                  id="hours"
                  name="hours"
                  type="number"
                  value={formData.hours}
                  onChange={handleChange}
                  placeholder="4"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalAmount">Total Amount (₹)</Label>
                <Input
                  id="totalAmount"
                  name="totalAmount"
                  type="number"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  placeholder="50000"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="advanceAmount">Advance Paid (₹)</Label>
                <Input
                  id="advanceAmount"
                  name="advanceAmount"
                  type="number"
                  value={formData.advanceAmount}
                  onChange={handleChange}
                  placeholder="25000"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Special requirements, equipment details, etc."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
