import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100, "Name must be 100 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address.").max(254, "Email must be 254 characters or fewer."),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters.").max(150, "Subject must be 150 characters or fewer."),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(5000, "Message must be 5,000 characters or fewer."),
}).strict();

export type ContactFormData = z.infer<typeof contactSchema>;
