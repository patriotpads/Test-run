import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import BookNowDropdown from "@/components/BookNowDropdown";

interface BookingFormProps {
  price: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ price }) => {
  const [checkInDate, setCheckInDate] = React.useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = React.useState<Date | undefined>();
  const [guests, setGuests] = React.useState(1);

  // Calculate total days between check-in and check-out
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();
  const subtotal = price * nights;
  const cleaningFee = nights > 0 ? 75 : 0;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + cleaningFee + serviceFee;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Booking request submitted! We'll get back to you soon.");
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>${price} <span className="text-base font-normal text-muted-foreground">/ Night</span></span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="check-in">Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="check-in"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={setCheckInDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="check-out">Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="check-out"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    initialFocus
                    disabled={(date) => 
                      (checkInDate ? date < checkInDate : false) || 
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests">Guests</Label>
            <Input
              id="guests"
              type="number"
              min={1}
              max={10}
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
            />
          </div>

          {nights > 0 && (
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>${price} × {nights} nights</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span>${cleaningFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>${serviceFee}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          )}

          <BookNowDropdown buttonText="Request to Book" />
          <p className="text-xs text-center text-muted-foreground">
            You won't be charged yet
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
