# Go High Level Integration Guide - Snapshot Form

Complete guide for integrating the **Local Authority Snapshot™** form with Go High Level.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Form Field Mapping](#form-field-mapping)
3. [Webhook Setup](#webhook-setup)
4. [Partial Submission Handling](#partial-submission-handling)
5. [Tags & Automation](#tags--automation)
6. [Custom Fields Setup](#custom-fields-setup)
7. [Testing & Validation](#testing--validation)

---

## 🎯 Overview

The Snapshot Form is a **5-step multi-step form** with:

### Key Features:
- ✅ **Auto-save functionality** - Data is saved every 30 seconds
- ✅ **Partial submissions** - Incomplete forms are sent with special tags
- ✅ **Complete submissions** - Finished forms tagged differently
- ✅ **Mandatory fields** - Only name, email, and phone are required
- ✅ **Smart tagging** - Different tags for complete vs partial submissions

### Submission Types:

| Type | Description | Tags Applied |
|------|-------------|--------------|
| **Partial** | User hasn't completed form | `snapshot-form`, `partial-submission`, `needs-follow-up` |
| **Complete** | User finished all steps | `snapshot-form`, `complete-submission` |

---

## 📊 Form Field Mapping

### Standard GHL Fields (Direct Mapping)

These map directly to standard Go High Level contact fields:

| Form Field | GHL Field | Required | Type |
|------------|-----------|----------|------|
| `full_name` | `name` | ✅ Yes | Text |
| `email` | `email` | ✅ Yes | Email |
| `phone` | `phone` | ✅ Yes | Phone |

### Custom Fields (Need to be Created in GHL)

Create these custom fields in your GHL account before integration:

| Form Field | GHL Custom Field Name | Type | Options |
|------------|----------------------|------|---------|
| `primary_city` | Primary City | Text | - |
| `state` | State | Text | - |
| `brokerage` | Brokerage | Text | - |
| `website` | Website URL | URL | - |
| `google_business_profile` | Google Business Profile | Text | - |
| `years_in_real_estate` | Years in Real Estate | Dropdown | 0-2, 3-5, 6-10, 10+ |
| `primary_focus` | Primary Focus | Multi-Select | Buyers, Sellers, Both, Investors, Luxury, Commercial |
| `inquiry_handling` | Inquiry Handling Method | Multi-Select | Manual, CRM, AI, Not Sure, Unanswered |
| `improvement_goals` | Improvement Goals | Text Area | - |

### Metadata Fields

Additional fields sent with every submission:

| Field | Description | Example Value |
|-------|-------------|---------------|
| `form_status` | Complete or partial | `"complete"` or `"partial"` |
| `form_step` | Last completed step (for partials) | `3` |
| `total_steps` | Total form steps | `5` |
| `submission_type` | Type of submission | `"full_submission"` or `"auto_save"` |
| `submitted_at` | ISO timestamp | `"2024-01-29T10:30:00Z"` |
| `tags` | Array of tags | `["snapshot-form", "complete-submission"]` |

---

## 🔗 Webhook Setup

### Step 1: Create Webhook in Go High Level

1. Log into your **Go High Level** account
2. Navigate to **Settings** → **API & Webhooks**
3. Click **Create Webhook** → **Inbound Webhook**
4. Name it: `Snapshot Form Webhook`
5. Copy the webhook URL provided

### Step 2: Configure Form to Use Webhook

In `snapshot-form.js`, find this line:

```javascript
const GHL_WEBHOOK_URL = 'YOUR_GHL_WEBHOOK_URL_HERE';
```

Replace with your actual webhook URL:

```javascript
const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID';
```

### Step 3: Uncomment the Integration Code

In `snapshot-form.js`, find the `sendToGHL()` method and **uncomment** this section:

```javascript
// Uncomment and configure when you have your GHL webhook URL:
/*
const response = await fetch(GHL_WEBHOOK_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
});

if (!response.ok) {
    throw new Error('Failed to submit form to GHL');
}

return await response.json();
*/
```

Remove the `/*` and `*/` to activate.

---

## 🔄 Partial Submission Handling

### How It Works

1. **Every 30 seconds**, if user has entered data, form auto-saves
2. **Partial data is sent to GHL** with special tags
3. **Minimum requirement**: Must have at least `full_name` OR `email`
4. **Tags applied**: `partial-submission`, `needs-follow-up`

### Partial Submission Data Structure

```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "primary_city": "Austin",
  "form_status": "partial",
  "form_step": 2,
  "total_steps": 5,
  "submission_type": "auto_save",
  "tags": [
    "snapshot-form",
    "partial-submission",
    "needs-follow-up"
  ]
}
```

### Setting Up Follow-Up for Partial Submissions

#### Option 1: Workflow Automation (Recommended)

Create a **Workflow** in GHL:

**Trigger:** Contact is tagged with `partial-submission`

**Actions:**
1. Wait 1 hour
2. Check if contact has tag `complete-submission`
   - **If YES**: End workflow (they finished!)
   - **If NO**: Send follow-up SMS/Email

**Follow-Up Message Template:**
```
Hi {first_name}! 👋

We noticed you started your Local Authority Snapshot but didn't finish.

Would you like us to help you complete it?

Just reply YES and we'll send you the link.

- Out of This World AI Team
```

#### Option 2: Manual Follow-Up

Create a **Smart List** in GHL:

**Filters:**
- Has tag: `partial-submission`
- Does NOT have tag: `complete-submission`
- Date added: Last 7 days

Review this list daily and manually reach out.

---

## 🏷️ Tags & Automation

### Tag Strategy

| Tag | Applied When | Use Case |
|-----|--------------|----------|
| `snapshot-form` | All submissions | General form identifier |
| `complete-submission` | Form fully completed | Mark as qualified lead |
| `partial-submission` | Form incomplete | Trigger follow-up sequence |
| `needs-follow-up` | Partial submission | Add to manual review queue |

### Recommended Workflows

#### Workflow 1: Complete Submission

**Trigger:** Contact tagged with `complete-submission`

**Actions:**
1. Send confirmation email (with snapshot report)
2. Notify sales team via Slack/SMS
3. Add to "Hot Leads" pipeline
4. Schedule follow-up call (2 days out)

#### Workflow 2: Partial Submission Follow-Up

**Trigger:** Contact tagged with `partial-submission`

**Actions:**
1. Wait 1 hour
2. Check if has `complete-submission` tag
   - If NO: Send SMS nudge
3. Wait 24 hours
4. Check again
   - If NO: Send email with form link
5. Wait 3 days
6. If still incomplete: Add to "Nurture" campaign

#### Workflow 3: Lead Scoring

Assign points based on form completion:

- **Complete submission**: +50 points
- **Partial submission (Step 3+)**: +25 points
- **10+ years experience**: +10 points
- **Has website**: +5 points
- **Handles inquiries manually**: +15 points (pain point!)

---

## 🛠️ Custom Fields Setup in GHL

### Creating Custom Fields

1. Go to **Settings** → **Custom Fields** → **Contact Fields**
2. Click **Add Custom Field**
3. Create each field with these specifications:

#### Years in Real Estate

- **Name:** Years in Real Estate
- **Type:** Dropdown
- **Options:**
  - 0-2 years
  - 3-5 years
  - 6-10 years
  - 10+ years

#### Primary Focus

- **Name:** Primary Focus
- **Type:** Multi-Select (Checkboxes)
- **Options:**
  - Buyers
  - Sellers
  - Both
  - Investors
  - Luxury
  - Commercial

#### Inquiry Handling Method

- **Name:** Inquiry Handling Method
- **Type:** Multi-Select (Checkboxes)
- **Options:**
  - Manual Response
  - CRM/Automated
  - AI Assistant
  - Not Sure
  - Sometimes Unanswered

#### Improvement Goals

- **Name:** Improvement Goals
- **Type:** Text Area
- **Max Length:** 500 characters

#### Other Text Fields

Create these as **Single Line Text**:
- Primary City
- State
- Brokerage
- Website URL
- Google Business Profile

---

## 🧪 Testing & Validation

### Pre-Launch Checklist

- [ ] Webhook URL configured in `snapshot-form.js`
- [ ] Integration code uncommented
- [ ] All custom fields created in GHL
- [ ] Tags created in GHL
- [ ] Test submission (complete)
- [ ] Test submission (partial)
- [ ] Workflows configured
- [ ] Confirmation emails working
- [ ] Follow-up sequences tested

### Testing Process

#### Test 1: Complete Submission

1. Fill out entire form
2. Submit
3. **Verify in GHL:**
   - Contact created
   - All fields populated
   - Tags: `snapshot-form`, `complete-submission`
   - Automation triggered

#### Test 2: Partial Submission

1. Fill out Steps 1-2 only
2. Wait 30 seconds (auto-save should trigger)
3. Close browser
4. **Verify in GHL:**
   - Contact created with partial data
   - Tags: `snapshot-form`, `partial-submission`, `needs-follow-up`
   - Follow-up workflow triggered

#### Test 3: Partial → Complete

1. Fill Steps 1-2, wait for auto-save
2. Complete remaining steps
3. Submit
4. **Verify in GHL:**
   - Contact updated (not duplicated)
   - Tags updated: `complete-submission` added
   - `needs-follow-up` tag removed

---

## 🔐 Data Security & Privacy

### GDPR/Privacy Considerations

- Form includes privacy notice
- Data stored temporarily in `localStorage`
- `localStorage` cleared on completion
- Users can close browser anytime (data auto-saved)

### Webhook Security

Consider adding:

```javascript
headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY', // Optional
    'X-Form-Source': 'snapshot-form' // For tracking
}
```

---

## 🚨 Troubleshooting

### Issue: Form submits but data not in GHL

**Check:**
1. Webhook URL is correct
2. Webhook is active in GHL
3. Custom fields exist with exact names
4. Browser console for errors

### Issue: Partial submissions not working

**Check:**
1. Auto-save interval (30 seconds)
2. Minimum data requirement (name or email)
3. Webhook URL configured
4. Browser localStorage enabled

### Issue: Duplicate contacts created

**Solution:**
Configure GHL to merge on email/phone:
1. Settings → Contact Management
2. Enable "Merge duplicates by email"
3. Enable "Merge duplicates by phone"

---

## 📞 Support & Resources

### GHL Documentation
- [Webhooks Guide](https://help.gohighlevel.com)
- [Custom Fields](https://help.gohighlevel.com)
- [Workflows](https://help.gohighlevel.com)

### Form Files
- `snapshot.html` - Main form page
- `snapshot-form.css` - Form styling
- `snapshot-form.js` - Form logic & GHL integration
- `snapshot-confirmation.html` - Success page

---

## 🎯 Quick Start Summary

1. ✅ Create custom fields in GHL
2. ✅ Create webhook in GHL
3. ✅ Add webhook URL to `snapshot-form.js`
4. ✅ Uncomment integration code
5. ✅ Create tags in GHL
6. ✅ Set up workflows for complete/partial
7. ✅ Test thoroughly
8. ✅ Go live!

---

**Need Help?** Check the main [GHL_INTEGRATION_GUIDE.md](GHL_INTEGRATION_GUIDE.md) for general GHL integration assistance.
