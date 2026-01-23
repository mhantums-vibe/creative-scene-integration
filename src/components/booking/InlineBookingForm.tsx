import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const bookingSchema = z.object({
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),
  notes: z.string().max(500, "Notes must be less than 500 characters").optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface InlineBookingFormProps {
  serviceTitle: string;
  className?: string;
}

export function InlineBookingForm({ serviceTitle, className }: InlineBookingFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to book a service.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        service_name: serviceTitle,
        booking_date: format(data.date, "yyyy-MM-dd"),
        booking_time: data.time,
        notes: data.notes || null,
        status: "pending",
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Booking Confirmed!",
        description: `Your ${serviceTitle} consultation has been scheduled.`,
      });
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={cn("bg-primary/5 border border-primary/20 rounded-xl p-8 text-center", className)}>
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
        <p className="text-muted-foreground mb-4">
          We've received your booking request for {serviceTitle}. 
          You'll receive a confirmation email shortly.
        </p>
        <Button onClick={() => navigate("/dashboard")}>
          View My Bookings
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={cn("bg-muted/50 border border-border rounded-xl p-8 text-center", className)}>
        <h3 className="text-xl font-bold text-foreground mb-2">Ready to Get Started?</h3>
        <p className="text-muted-foreground mb-4">
          Log in or create an account to book a consultation for {serviceTitle}.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => navigate("/login")}>Log In</Button>
          <Button variant="outline" onClick={() => navigate("/signup")}>Sign Up</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-card border border-border rounded-xl p-6 lg:p-8", className)}>
      <h3 className="text-xl font-bold text-foreground mb-6">Book a Consultation</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const day = date.getDay();
                          return date < new Date() || day === 0 || day === 6;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Time</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a time slot" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Details (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project requirements..."
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              "Book Consultation"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
