import { Controller, Post, Body } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  @Post()
  async submit(@Body() dto: CreateContactDto) {
    // Log for now - replace with email service, database, or CRM integration
    console.log('[Contact Form]', {
      name: dto.name,
      email: dto.email,
      subject: dto.subject,
      message: dto.message,
      at: new Date().toISOString(),
    });
    return { success: true, message: 'Thank you for your message. We will get back to you soon.' };
  }
}
