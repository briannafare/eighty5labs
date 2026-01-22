# Go High Level Webhook Setup

This document explains how to connect the lead capture modal to your Go High Level (GHL) account.

## Step 1: Create a Webhook in GHL

1. Log in to your **Go High Level** account
2. Go to **Settings** → **Integrations** → **Webhooks**
3. Click **Create Webhook**
4. Name it: `Website Lead Capture - eighty5labs`
5. Copy the webhook URL (it will look like: `https://services.leadconnectorhq.com/hooks/XXXXXXXXXXXXX`)

## Step 2: Update the Webhook URL in Code

Open the file: `/components/LeadCaptureModal.tsx`

Find line ~18 and replace the placeholder URL with your actual webhook URL:

```typescript
// BEFORE:
const webhookUrl = 'https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID';

// AFTER (with your actual URL):
const webhookUrl = 'https://services.leadconnectorhq.com/hooks/abc123def456';
```

## Step 3: Field Mapping

The modal sends the following fields to GHL:

| Form Field | GHL Field Name | Type | Required |
|------------|---------------|------|----------|
| Full Name  | `full_name`   | text | Yes |
| Email      | `email`       | email | Yes |
| Phone      | `phone`       | tel | Yes |
| Website    | `website`     | url | No |

### Additional Fields Sent:
- `business_name`: "eighty5labs" (hardcoded)
- `source`: "website" (hardcoded)
- `tags`: ["website-lead", "free-audit"]

## Step 4: Configure GHL Custom Fields (Optional)

If you want to capture the website field in a custom field:

1. Go to **Settings** → **Custom Fields**
2. Create a new custom field called "Website"
3. Set field type to "Text"
4. Map it in your webhook configuration

## Step 5: Test the Integration

1. Open your website
2. Click any "Get Your Free Audit" button
3. Fill out and submit the form
4. Check your GHL account under **Contacts** or **Opportunities**
5. Verify the lead was created with all the correct information

## Troubleshooting

### Lead not appearing in GHL?

- Check the browser console for errors (F12 → Console tab)
- Verify the webhook URL is correct
- Make sure the webhook is "Active" in GHL
- Check GHL webhook logs for incoming requests

### Form submits but no data captured?

- Check field name mappings in GHL
- Verify your webhook has permission to create contacts
- Review GHL automation rules that might be filtering leads

## ROI Calculator Integration

The ROI Calculator component (`components/ROICalculator.tsx`) also has a form that needs GHL integration.

To connect it:

1. Open `/components/ROICalculator.tsx`
2. Find line ~19 (commented out)
3. Uncomment the webhook code and add your GHL webhook URL
4. The form will send additional fields:
   - `custom_field_weekly_calls`
   - `custom_field_miss_rate`
   - `custom_field_ticket_value`
   - `custom_field_monthly_loss`
   - `custom_field_recovery_potential`

## Support

For GHL webhook configuration help, refer to:
- [GHL Webhook Documentation](https://help.gohighlevel.com/)
- GHL Support Team

---

**Business Name**: eighty5labs
**Last Updated**: 2026-01-22
