
import React, { useState, useRef, useCallback } from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot field
};

const RATE_LIMIT_MS = 60_000; // 1 minute between submissions
let lastSubmitTime = 0;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormData>();

  const onSubmit = useCallback(async (data: FormData) => {
    // Honeypot check — bots fill hidden fields
    if (data.website) {
      // Silently pretend success so bots don't retry
      toast({
        title: "Message sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      reset();
      return;
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      toast({
        title: "Please wait",
        description: "You can send another message in a moment.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const templateParams = {
        to_name: "Golnoush Haddadian",
        to_email: "ghaddadian1@gsu.edu",
        from_name: data.name.trim(),
        from_email: data.email.trim(),
        subject: data.subject.trim(),
        message: data.message.trim(),
        reply_to: data.email.trim(),
      };
      
      await emailjs.send(
        'service_fsth9as',
        'template_6tebu68',
        templateParams,
        'rz60jW-JjFrTtfypQ'
      );

      lastSubmitTime = Date.now();
      
      toast({
        title: "Message sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [toast, reset]);

  return (
    <Card>
      <CardContent className="p-6">
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Honeypot — hidden from real users, bots will fill it */}
          <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input 
                id="name" 
                {...register("name", { 
                  required: "Name is required",
                  maxLength: { value: 100, message: "Name must be under 100 characters" },
                })}
                aria-invalid={errors.name ? "true" : "false"}
                placeholder="Your name"
                maxLength={100}
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
                  maxLength: { value: 255, message: "Email must be under 255 characters" },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder="your.email@example.com"
                maxLength={255}
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
              {...register("subject", { 
                required: "Subject is required",
                maxLength: { value: 200, message: "Subject must be under 200 characters" },
              })}
              aria-invalid={errors.subject ? "true" : "false"}
              placeholder="What is this regarding?"
              maxLength={200}
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
              {...register("message", { 
                required: "Message is required",
                maxLength: { value: 2000, message: "Message must be under 2000 characters" },
              })}
              aria-invalid={errors.message ? "true" : "false"}
              placeholder="Your message..." 
              rows={6}
              maxLength={2000}
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
