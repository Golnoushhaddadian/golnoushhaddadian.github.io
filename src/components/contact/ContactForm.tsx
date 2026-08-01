
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
  stage: string;
  institution: string;
  cvLink: string;
  collaboration: string;
  interests: string;
  experience: string;
  anythingElse: string;
  website: string; // honeypot field
};

const STAGE_OPTIONS = [
  "Undergraduate student",
  "Master's student",
  "PhD student / candidate",
  "Postdoctoral researcher",
  "Faculty / Professor",
  "Researcher / Scientist",
  "Industry professional",
  "Other",
];

const COLLAB_OPTIONS = [
  "Research collaboration",
  "Co-authoring / publication",
  "Mentorship or advising",
  "Speaking or guest lecture",
  "Consulting / advisory",
  "Other",
];

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
      const details: string[] = [];
      details.push(`Stage: ${data.stage}`);
      details.push(`Institution/Organization: ${data.institution.trim()}`);
      details.push(`Collaboration interest: ${data.collaboration}`);
      if (data.cvLink?.trim()) details.push(`CV/Website: ${data.cvLink.trim()}`);
      details.push(`Areas of interest: ${data.interests.trim()}`);
      details.push(`Relevant skills/experience: ${data.experience.trim()}`);
      if (data.anythingElse?.trim()) details.push(`Anything else: ${data.anythingElse.trim()}`);

      const composedMessage = details.join("\n");
      const composedSubject = `New inquiry from ${data.name.trim()} — ${data.collaboration}`;

      const templateParams = {
        to_name: "Golnoush Haddadian",
        to_email: "ghaddadian1@gsu.edu",
        from_name: data.name.trim(),
        from_email: data.email.trim(),
        subject: composedSubject,
        message: composedMessage,
        stage: data.stage || "",
        institution: data.institution?.trim() || "",
        cv_link: data.cvLink?.trim() || "",
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
                Name <span className="text-destructive">*</span>
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
                Email <span className="text-destructive">*</span>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="stage" className="text-sm font-medium">
                Current academic/professional stage <span className="text-destructive">*</span>
              </label>
              <select
                id="stage"
                {...register("stage", { required: "Please select your stage" })}
                defaultValue=""
                aria-invalid={errors.stage ? "true" : "false"}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="" disabled>Select your stage</option>
                {STAGE_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.stage && (
                <p className="text-sm text-destructive mt-1">{errors.stage.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="institution" className="text-sm font-medium">
                Institution or Organization <span className="text-destructive">*</span>
              </label>
              <Input
                id="institution"
                {...register("institution", {
                  required: "Institution or organization is required",
                  maxLength: { value: 200, message: "Must be under 200 characters" },
                })}
                aria-invalid={errors.institution ? "true" : "false"}
                placeholder="e.g., Georgia State University"
                maxLength={200}
              />
              {errors.institution && (
                <p className="text-sm text-destructive mt-1">{errors.institution.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="collaboration" className="text-sm font-medium">
              What kind of collaboration are you looking for? <span className="text-destructive">*</span>
            </label>
            <select
              id="collaboration"
              {...register("collaboration", { required: "Please select a type of collaboration" })}
              defaultValue=""
              aria-invalid={errors.collaboration ? "true" : "false"}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="" disabled>Select a type of collaboration</option>
              {COLLAB_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.collaboration && (
              <p className="text-sm text-destructive mt-1">{errors.collaboration.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="cvLink" className="text-sm font-medium">
              Link to CV/Website
            </label>
            <Input
              id="cvLink"
              type="url"
              {...register("cvLink", {
                maxLength: { value: 500, message: "Link must be under 500 characters" },
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Please enter a valid URL starting with http:// or https://",
                },
              })}
              aria-invalid={errors.cvLink ? "true" : "false"}
              placeholder="https://your-cv-or-website.com"
              maxLength={500}
            />
            {errors.cvLink && (
              <p className="text-sm text-destructive mt-1">{errors.cvLink.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="interests" className="text-sm font-medium">
              What are your areas of interest related to my work? <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="interests"
              {...register("interests", {
                required: "This field is required",
                maxLength: { value: 1000, message: "Must be under 1000 characters" },
              })}
              aria-invalid={errors.interests ? "true" : "false"}
              placeholder="Tell me which aspects of my work interest you, and why..."
              rows={3}
              maxLength={1000}
            />
            {errors.interests && (
              <p className="text-sm text-destructive mt-1">{errors.interests.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="experience" className="text-sm font-medium">
              Any relevant skills or experiences I should know about? <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="experience"
              {...register("experience", {
                required: "This field is required",
                maxLength: { value: 1000, message: "Must be under 1000 characters" },
              })}
              aria-invalid={errors.experience ? "true" : "false"}
              placeholder="Briefly describe relevant skills, background, or experience..."
              rows={3}
              maxLength={1000}
            />
            {errors.experience && (
              <p className="text-sm text-destructive mt-1">{errors.experience.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="anythingElse" className="text-sm font-medium">
              Anything else you'd like me to know?{" "}
              <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <Textarea
              id="anythingElse"
              {...register("anythingElse", {
                maxLength: { value: 2000, message: "Must be under 2000 characters" },
              })}
              aria-invalid={errors.anythingElse ? "true" : "false"}
              placeholder="Anything else you'd like to add..."
              rows={4}
              maxLength={2000}
            />
            {errors.anythingElse && (
              <p className="text-sm text-destructive mt-1">{errors.anythingElse.message}</p>
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
