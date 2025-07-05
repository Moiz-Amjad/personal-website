# EmailJS Setup Guide

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps:
   - For Gmail: Click "Connect Account" and authorize EmailJS
   - For others: Follow the specific provider instructions
5. Set a **Service ID** (e.g., `service_portfolio`)
6. Click **Create Service**

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Set up your template:
   - **Template Name**: Contact Form
   - **Template ID**: `template_contact` (note this down)
   - **Subject**: `New message from {{user_name}}`
   - **Content**:
     ```
     Hello,

     You have received a new message from your portfolio website:

     Name: {{user_name}}
     Email: {{user_email}}
     
     Message:
     {{message}}

     Best regards,
     Your Portfolio Website
     ```
4. In **Settings**, set:
   - **To Email**: your-email@domain.com
   - **From Name**: {{user_name}}
   - **Reply To**: {{user_email}}
5. Click **Save**

## Step 4: Get Your Public Key

1. Go to **Account** in your dashboard
2. Find **API Keys** section
3. Copy your **Public Key** (starts with something like `user_`)

## Step 5: Update Your Code

1. Open `components/sections/Contact.tsx`
2. Find the EmailJS configuration section (around line 30)
3. Replace the placeholder values:

```typescript
// Replace these with your actual EmailJS credentials
const result = await emailjs.sendForm(
  'service_portfolio', // Your Service ID
  'template_contact',  // Your Template ID
  form.current,
  'user_your_public_key' // Your Public Key
)
```

4. Uncomment the EmailJS import at the top:
```typescript
import emailjs from '@emailjs/browser'
```

## Step 6: Test Your Setup

1. Run your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email for the message
5. Check the browser console for any errors

## Troubleshooting

### Common Issues:

1. **"User ID is required"**: Make sure you've added your public key
2. **"Service not found"**: Verify your Service ID is correct
3. **"Template not found"**: Check your Template ID
4. **No email received**: 
   - Check your spam folder
   - Verify the "To Email" in your template
   - Make sure your email service is properly connected

### Template Variables:

Make sure your form field names match the template variables:
- Form field `name="user_name"` → Template variable `{{user_name}}`
- Form field `name="user_email"` → Template variable `{{user_email}}`
- Form field `name="message"` → Template variable `{{message}}`

## Free Plan Limits

- 200 emails per month
- EmailJS branding in emails
- Basic support

For higher limits, consider upgrading to a paid plan.

## Security Notes

- Your Public Key is safe to expose in client-side code
- Never expose your Private Key
- EmailJS handles the security of sending emails
- Consider adding CAPTCHA for production use 