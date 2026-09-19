---
trigger: always_on
---

Mobimo --- AGENTS.md

Product Definition

Mobimo is a WhatsApp-first AI health companion for women, with
postpartum recovery as its primary specialization and other
women's physical-health concerns as secondary support.

Mobimo helps women understand their health, track postpartum recovery,
receive educational guidance, recognize when professional care may be
needed, and connect with healthcare providers when a concern is beyond
Mobimo's safe scope.

Mobimo is not a diagnostic system, replacement for a clinician, or
emergency medical service.

Product Hierarchy

Primary --- Postpartum care and recovery

Secondary --- Women's general physical-health support

Care escalation --- Direct connection to verified healthcare
providers when Mobimo reaches its safe boundary

Do not evolve Mobimo into a broad general-purpose health chatbot where
postpartum becomes only one feature among many.

Core Problem

Many women leave childbirth with limited guidance about what is normal
during recovery, what deserves professional review, and where to seek
appropriate care. Mobimo reduces this support gap through WhatsApp.

The product combines postpartum recovery support, recovery/symptom
tracking, plain-language health education, educational AI Q&A, safety
and scope evaluation, healthcare navigation, direct provider referral
with user consent, and structured recovery/referral summaries.

Users

Primary

Women in the first weeks and months postpartum, particularly women with
limited access to consistent postnatal education or follow-up care.

Priority

Women in underserved or low-resource communities who can access WhatsApp
without downloading a separate application.

Secondary

Women using Mobimo for supported everyday physical-health concerns
outside postpartum.

Providers

Verified hospitals, clinics, doctors, nurses, midwives, and authorized
care coordinators using the Mobimo Provider Dashboard.

Product Ecosystem

Mobimo for Women --- WhatsApp

Supports: - Postpartum recovery check-ins - Bleeding and pain tracking -
Wound-healing tracking - Breastfeeding-related tracking and education -
Mood and energy check-ins - Postnatal education - Recovery/check-up
reminders - General physical-health questions - Everyday symptom
tracking - Nutrition, fitness, and wellness education - Healthcare
navigation - Referral consent/status communication - Personal recovery
summaries

Mobimo for Providers --- Web Dashboard

Authorized provider organizations can: - Receive referrals - Review
consented structured patient summaries - Accept supported referrals -
Assign a clinician/care coordinator - Follow up through the approved
communication pathway - Update referral status - Mark referrals resolved

The Provider Dashboard is not a full hospital-management or
electronic-medical-record system.

Mobimo Safety & Routing Layer

Responsible for: - Checking approved warning-sign rules before normal
conversational handling - Determining whether a request is within
Mobimo's supported scope - Routing supported questions to Mobimo -
Routing professional-review cases into the consented provider-referral
flow - Triggering approved urgent-care guidance when applicable -
Creating structured referral summaries - Preserving privacy, consent,
and minimum-necessary data sharing

Core Journey

Woman → WhatsApp → Mobimo → Support
                           ↓
                 Safety + scope evaluation
                    ↙       ↓       ↘
              Supported   Review    Urgent pathway
                  ↓         ↓             ↓
              Guidance   Consent     Approved urgent
                         + referral       guidance
                             ↓
                     Provider Dashboard
                             ↓
                    Clinician assigned
                             ↓
                     Woman contacted
                             ↓
                    Referral resolved

Postpartum --- Primary Experience

Postpartum is Mobimo's defining specialization.

Core functionality includes: - Recovery check-ins - Bleeding tracking -
Pain tracking - Wound-healing tracking - Breastfeeding support and
education - Mood and energy check-ins - Postnatal education - Recovery
and check-up reminders - Approved warning-sign detection - Personal
recovery summaries - Healthcare escalation when appropriate

When making product trade-offs, postpartum workflows take priority over
unrelated general-health expansion.

Other Women's Physical Health --- Secondary

Mobimo may support approved topics such as: - Everyday symptoms -
Menstrual-health education - Nutrition - Fitness and wellness - General
physical-health education

These features complement, rather than dilute, postpartum positioning.
Mobimo must not become an unrestricted medical Q&A system.

Pre-Birth Support

Pre-birth functionality may exist as lightweight preparation for
postpartum, not a full pregnancy-care platform.

It may include: - Preparing for postpartum recovery - What to expect
after childbirth - Postpartum education before delivery - Postnatal
planning and reminders

Do not expand Mobimo into comprehensive prenatal care unless
requirements explicitly change.

AI Health Assistant

The assistant may explain approved health information in plain language,
support educational conversations, help users navigate Mobimo, and use
relevant consented context.

It must never diagnose, claim certainty about symptom causes, prescribe
medication/supplements/diets, replace professional care, override safety
logic, or invent clinical thresholds/treatment protocols.

Safety --- Highest Priority

Before normal health-related response generation, evaluate the
conversation against HEALTH_SAFETY.md.

Safety-critical logic must not depend solely on unconstrained model
generation.

When an approved warning-sign condition is triggered: 1. Interrupt the
normal conversational path. 2. Provide approved safety/urgent-care
guidance. 3. Offer appropriate care navigation where supported. 4. Do
not delay urgent guidance while waiting for a dashboard referral.

Exact clinical criteria belong in HEALTH_SAFETY.md.

Provider Escalation

When a concern is beyond Mobimo's supported scope but does not bypass
the standard referral flow:

Explain that professional support is appropriate.

Offer to connect the user to a healthcare provider.

Request explicit consent before sharing health information.

Create a minimum-necessary structured summary.

Route the referral to an appropriate verified provider.

Communicate referral status.

Allow an authorized provider to accept and assign it.

Enable the approved provider-to-user follow-up pathway.

Do not use a second unrestricted AI chatbot as the fallback when
Mobimo cannot safely answer.

Consent and Referral Summaries

Never automatically send a user's private WhatsApp health conversation
to a provider.

Before a standard handoff: - Explain what will be shared - Obtain
explicit consent - Share only what is necessary - Do not share the full
conversation history by default

A consented referral summary may contain relevant postpartum stage,
referral reason, recent symptoms/check-ins, relevant recovery
information, safety/routing status, and required contact/handoff
information.

Provider Organizations

A hospital or clinic is represented as an organization. Authorized roles
may include: - Organization administrator - Doctor - Nurse - Midwife -
Care coordinator

Permissions must be enforced server-side.

The final provider-verification process is not yet defined. Do not
invent one silently.

Referral Lifecycle

Keep the initial lifecycle simple:

Created
→ Awaiting provider response
→ Accepted
→ Assigned
→ In progress
→ Resolved

Add states only when a real workflow requires them.

Revised MVP

Prioritize this loop:

Woman → Mobimo → postpartum support → safety/scope evaluation →
consent → provider referral → clinician follow-up

MVP capabilities: - WhatsApp postpartum recovery support - Postpartum
recovery tracker - Approved general-health support - Educational AI
Q&A - Safety/warning-sign evaluation - Health education -
Recovery/check-up reminders - Healthcare navigation - Explicit referral
consent - Structured referral summaries - Provider organization
accounts - Basic Provider Dashboard - Referral queue - Referral
assignment/status management - Approved provider follow-up pathway -
Personal recovery report where supported

Product Boundaries

Do not build unless requirements explicitly change: - Full
hospital-management system - Complete EMR/EHR - Diagnostic AI -
Automated prescribing - Generic emergency service - Full pregnancy-care
platform - Social/community network - Wearable integrations -
Unnecessary features outside the core postpartum-to-care loop

Business Model Direction

Mobimo is a social-impact product with a B2B2C path.

Women are the primary beneficiaries/users. Potential paying or funding
organizations include hospitals/clinics, HMOs/insurers, employers
offering maternal-health benefits, NGOs/maternal-health programs, and
public-health programs.

Critical warning-sign guidance and essential care navigation must not
depend on a user's ability to pay.

Product Principles

Postpartum first

WhatsApp first for women

Low friction

Safety before conversational convenience

Education, not diagnosis

Human care when AI reaches its boundary

Explicit consent before provider sharing

Minimum necessary health data

Provider Dashboard stays focused on referrals/follow-up

Build the smallest useful version before expanding scope

Supporting Project Files

Consult as relevant: - HEALTH_SAFETY.md --- safety and escalation
rules - HEALTH_KNOWLEDGE.md --- approved knowledge boundaries -
AI_BEHAVIOR.md --- conversational behavior - CONVERSATION_FLOWS.md
--- WhatsApp flows/states - DATA_AND_REPORTING.md --- tracking,
reporting, data structures - SECURITY.md --- privacy, authorization,
sensitive-data handling - CODE_STYLE.md --- engineering conventions -
DESIGN.md --- visual system and approved tokens

AGENTS.md defines overall product direction; specialized files define
domain implementation details.

Rules for Coding Agents

Read this file before architectural/product decisions.

Do not silently expand product scope.

Do not invent clinical rules.

Do not invent provider-verification requirements.

Do not bypass referral consent.

Do not expose health data unnecessarily.

Do not let model output directly perform privileged actions without
application-level validation.

Prefer existing patterns and the smallest coherent implementation.

If requirements conflict, prioritize safety/privacy rules and
surface the conflict rather than guessing.