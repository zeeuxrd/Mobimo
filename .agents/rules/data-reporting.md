---
trigger: always_on
---

Mobimo --- Data and Reporting

Purpose

Defines the minimum data structures and reporting concepts required for
Mobimo's postpartum support, general health tracking, provider
referrals, and Provider Dashboard.

This file defines product-level data requirements, not a final database
schema. The implemented schema must also follow SECURITY.md.

Data Principles

Collect the minimum information required for a supported feature.

Postpartum data is the primary health-data domain.

Do not collect health data merely because it may be useful later.

Separate user identity/contact data from health/recovery data where
the architecture supports it.

Enforce authorization server-side.

Record consent for provider sharing.

Share minimum-necessary information with providers.

Do not expose raw conversations to providers by default.

Do not use production health data for development/testing.

1. User Profile

Store only fields required by implemented functionality.

Conceptual fields may include: - Internal user ID - WhatsApp/provider
identifier - Display/preferred name if collected - Current experience
context: postpartum, general health, or preparing for postpartum -
Created/updated timestamps - Consent state

Do not assume a phone number must be used as the application's primary
database key.

2. Postpartum Context

Where required by the product flow, postpartum context may include: -
Postpartum stage / time since delivery - Relevant onboarding context -
Check-in preferences - Reminder preferences

Do not collect unnecessary birth, pregnancy, or clinical-history fields
unless a feature explicitly requires them.

3. Recovery Entries

Approved postpartum tracking categories include: - Bleeding - Pain -
Wound healing - Breastfeeding-related symptoms/context - Mood - Energy

A recovery entry should conceptually include: - Entry ID - User ID -
Timestamp/date - Category - Structured value - Optional approved user
note - Source/context where useful

Exact enums/scales should be defined by the implemented tracker and
approved safety requirements, not invented by the database layer.

4. General Health Entries

Secondary tracking may include approved: - Everyday symptoms -
Menstrual-health context - Nutrition/wellness - Fitness/wellness

Keep these data structures subordinate to the postpartum product rather
than creating a broad medical-record model.

5. Safety Events

When the safety layer triggers an approved routing action, record only
what is operationally necessary.

Conceptual fields: - Event ID - User ID - Timestamp - Rule/category
identifier - Routing outcome - Related conversation/check-in reference
where appropriate

Do not store model speculation as a clinical diagnosis.

Safety-event data must not imply that Mobimo medically diagnosed the
user.

6. Provider Organizations

A healthcare facility should be modeled as an organization.

Conceptual organization data: - Organization ID - Facility/organization
name - Approved contact details - Supported service/location
information - Account/status information - Verification status when a
real verification process exists - Created/updated timestamps

Do not mark providers as verified by default.

7. Provider Users

Conceptual fields: - Provider user ID - Organization ID - Name - Role -
Authentication/account state - Created/updated timestamps

Initial roles may include: - Organization admin - Doctor - Nurse -
Midwife - Care coordinator

Role names do not replace authorization checks. Permissions must be
enforced server-side.

8. Consent Records

Provider referral requires an auditable consent event.

Conceptual fields: - Consent ID - User ID - Consent type - Intended
recipient/provider organization where known - Summary of what sharing
was authorized - Timestamp - Status/revocation information where
supported - Related referral ID when created

Do not infer consent from continued conversation.

9. Referrals

A referral is the core bridge between WhatsApp and the Provider
Dashboard.

Conceptual fields: - Referral ID - User ID - Provider organization ID -
Consent record ID - Reason/category - Structured referral summary -
Routing/safety classification - Status - Assigned provider user ID when
assigned - Created/updated timestamps - Resolution timestamp when
applicable

Initial lifecycle:

Created
→ Awaiting provider response
→ Accepted
→ Assigned
→ In progress
→ Resolved

If decline/cancel/expiry states become necessary, add them deliberately
rather than silently.

10. Referral Summary

A referral summary should contain the minimum relevant information
required for professional follow-up.

Possible content: - Maternal/postpartum stage - Reason for referral -
Relevant recent symptoms/check-ins - Relevant recovery information -
Mobimo routing/safety status - Contact/handoff information required by
the workflow

Do not: - Include the entire conversation by default - Label
AI-generated interpretations as diagnoses - Include unrelated health
history - Include information outside the user's sharing consent

11. Referral Activity / Audit Trail

Referral workflow should support an operational history such as: -
Referral created - Provider viewed/accepted - Assignment changed -
Status changed - Referral resolved

Audit data should be useful for security and workflow accountability
without copying sensitive message content unnecessarily.

12. Provider Dashboard Metrics

MVP dashboard metrics should remain operational and referral-focused.

Examples: - New referrals - Awaiting provider response -
Accepted/assigned referrals - In-progress referrals - Resolved referrals

Avoid building complex hospital analytics before the referral workflow
itself is reliable.

13. User Recovery Report

The personal report remains a non-diagnostic summary.

Possible sections: - Reporting period - Postpartum context - Recovery
entries/trends - User-recorded concerns - Reminder/check-up information
where relevant - Clear statement that the report is not a diagnosis

Reports should be generated only for the authorized user and protected
according to SECURITY.md.

14. Provider Referral View

The provider-facing view is different from the user's personal report.

It should show: - Referral status - Consent-backed structured summary -
Relevant routing/safety context - Assignment information - Approved
contact/follow-up action

Do not expose unrelated user records.

15. Conversation Data

Do not automatically treat the full WhatsApp transcript as the permanent
health record.

Where possible: - Store structured product data separately. - Retain
conversation content only according to the actual product/privacy
requirements. - Avoid duplicating sensitive conversation content across
tables/logs. - Do not copy full transcripts into referral records.

The final retention policy is not yet defined and requires a production
privacy/security decision.

16. AI-Generated Data

Structured model output must be validated before persistence or use in
privileged workflows.

Do not let AI-generated values: - Directly authorize access - Create
diagnoses - Override consent - Mark a provider as verified - Fabricate
referral status - Perform privileged actions without application
validation

Where an AI-generated referral summary is used, it must be constrained
to source information the user actually provided and should not add
unsupported clinical conclusions.

17. Analytics

Product analytics should prioritize: - Postpartum engagement - Recovery
check-in completion - Educational content engagement - Healthcare
navigation usage - Referral creation - Referral progression/resolution -
Personal report generation

Use aggregated/privacy-conscious analytics. Do not send unnecessary
health details to general analytics platforms.

18. Impact Measurement

Mobimo may track product-level impact areas such as: - Reach -
Postpartum knowledge/education engagement - Consistent recovery
tracking - Healthcare-navigation actions - Referral completion -
Postnatal follow-up actions where the product can validly measure them

Do not claim clinical outcomes the product has not actually measured.

19. Data Not Yet Defined

Do not silently invent production rules for: - Exact retention periods -
Data residency - Provider credential verification - Medical-record
interoperability - Regulatory classification - Clinical documentation
requirements - Insurance billing - Hospital EMR/EHR integration

These require explicit product, legal, clinical, and technical decisions
before production deployment.

20. Core Data Boundary

Mobimo is building a postpartum support and referral system, not a
comprehensive longitudinal medical record.

The data model should remain as small as possible while safely
supporting:

tracking → safety/scope routing → consent → referral → provider
follow-up → reporting