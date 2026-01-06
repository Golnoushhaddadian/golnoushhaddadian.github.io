
import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';

// Define the form data structure
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Initialize react-hook-form
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormData>();

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Create template parameters for EmailJS
      const templateParams = {
        to_name: "Golnoush Haddadian",
        to_email: "ghaddadian1@gsu.edu",
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        reply_to: data.email,
      };
      
      // Send email using EmailJS
      await emailjs.send(
        'service_fsth9as',
        'template_6tebu68',
        templateParams,
        'rz60jW-JjFrTtfypQ'
      );
      
      toast({
        title: "Message sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input 
                id="name" 
                {...register("name", { required: "Name is required" })}
                aria-invalid={errors.name ? "true" : "false"}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input 
                id="email" 
                type="email" 
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder="your.email@example.com" 
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <Input 
              id="subject" 
              {...register("subject", { required: "Subject is required" })}
              aria-invalid={errors.subject ? "true" : "false"}
              placeholder="What is this regarding?" 
            />
            {errors.subject && (
              <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea 
              id="message" 
              {...register("message", { required: "Message is required" })}
              aria-invalid={errors.message ? "true" : "false"}
              placeholder="Your message..." 
              rows={6} 
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
