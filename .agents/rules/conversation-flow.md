---
trigger: always_on
---

Mobimo --- Conversation Flows

Purpose

Defines Mobimo's WhatsApp conversation states and routing behavior.
Postpartum is the primary experience. General women's physical health is
secondary. Provider escalation is used when Mobimo reaches its safe
scope boundary.

Global Runtime Order

For every health-related message:

Incoming message
→ identify user/context
→ safety evaluation
→ determine intent/scope
→ supported Mobimo flow OR provider escalation
→ response
→ persist only approved/minimum data

Safety evaluation always occurs before normal AI guidance.

1. First Interaction

Keep onboarding short.

Mobimo should: 1. Welcome the user. 2. Explain that it provides
educational health support and is not a replacement for professional
care. 3. Obtain required consent for supported data processing. 4. Ask
what the user needs.

Suggested top-level options:

1. Postpartum support
2. Ask a health question
3. Track my health
4. Health resources
5. Talk to a healthcare provider

Postpartum should remain the most prominent path.

2. Postpartum Onboarding

When a user chooses postpartum support, collect only information
required to personalize the approved experience.

Potential context: - Whether the user has already given birth -
Approximate postpartum stage/time since delivery where required by the
implemented flow - Which recovery area they want help with

Do not request unrelated personal or medical information.

Then route to: - Recovery check-in - Recovery education -
Breastfeeding-related education/support - Reminders - Postnatal check-up
support - Health question - Care navigation

3. Pre-Birth / Preparing for Postpartum

This is a lightweight preparation flow, not comprehensive prenatal care.

Supported paths may include: - What to expect after delivery - Preparing
for postpartum recovery - Postpartum planning - Postnatal check-up
preparation - Educational resources

If the user asks for pregnancy care beyond the approved Mobimo scope,
route according to scope and safety rules rather than improvising
prenatal medical advice.

4. Postpartum Recovery Check-In

A check-in may gather approved recovery information such as: -
Bleeding - Pain - Wound healing - Breastfeeding-related concerns -
Mood - Energy

For each answer: 1. Capture the structured value. 2. Evaluate approved
warning-sign rules. 3. If a warning pathway is triggered, stop the
routine check-in and follow HEALTH_SAFETY.md. 4. Otherwise continue.
5. Save only approved tracking data. 6. Provide an appropriate
non-diagnostic completion message.

Do not diagnose based on tracker responses.

5. General Health Tracking

General health tracking is secondary to postpartum.

It may support approved: - Everyday symptoms - Menstrual-health
context - Nutrition/wellness tracking - Fitness/wellness tracking

If the user's concern exceeds Mobimo's approved knowledge/scope, use
provider escalation.

6. Health Question Flow

User question
→ safety check
→ scope check
   ↙          ↘
supported    unsupported / professional review
   ↓                     ↓
educational answer      escalation flow

Supported responses should: - Be plain-language - Be concise enough for
WhatsApp - Remain educational and non-diagnostic - Include the required
symptom disclaimer when applicable - Avoid medication/prescription
instructions prohibited by project rules

7. Safety / Warning-Sign Flow

When an approved warning condition is detected:

Warning condition
→ interrupt normal conversation
→ approved urgent-care guidance
→ care-navigation option where supported

Do not make the user complete a normal referral form before receiving
urgent guidance.

Do not wait for a provider to accept a dashboard referral before
communicating approved urgent-care guidance.

Exact clinical criteria and approved wording belong in
HEALTH_SAFETY.md.

8. Professional Review / Provider Escalation

Use when: - The request is beyond Mobimo's supported scope. - Mobimo
cannot safely provide the requested guidance. - The user explicitly asks
to speak to a healthcare professional. - A supported workflow determines
professional review is appropriate.

Mobimo should explain the handoff clearly:

I can help connect you with a healthcare professional.
With your permission, I can share a short summary of the relevant information you've provided so you don't have to start from the beginning.

Then offer actions conceptually equivalent to: - Share & connect - Find
another provider / care option - Not now

Do not imply that a clinician has accepted the case until the provider
system confirms it.

9. Referral Consent

Before creating a standard provider referral: 1. Explain that Mobimo
will share a short relevant summary. 2. Explain which
provider/organization will receive it when known. 3. Request explicit
consent. 4. Record the consent event. 5. Only then create/share the
referral.

If consent is declined: - Do not create the referral. - Offer
non-sharing care-navigation information where available. - Continue to
provide any applicable safety guidance.

10. Structured Referral Creation

After consent, create a minimum-necessary referral summary.

Possible fields, where relevant and approved: - Postpartum/maternal
stage - Reason for referral - Relevant recent symptoms/check-ins -
Relevant recovery context - Routing/safety status - Contact/handoff
information required by the workflow

Do not send the full WhatsApp conversation by default.

11. Referral Status Communication

User-facing states should be simple.

Awaiting provider response

Tell the user the request has been sent and avoid promising a response
time unless the provider workflow guarantees one.

Accepted

Tell the user the provider has accepted the referral and explain the
next step.

Assigned / In progress

Tell the user that an authorized healthcare professional/care team is
handling the referral when confirmed.

Resolved

Close the referral conversationally and return the user to normal Mobimo
support.

Never fabricate referral acceptance, clinician assignment, or contact.

12. Provider Dashboard Flow

Referral arrives
→ authorized staff reviews summary
→ accept according to workflow
→ assign clinician/care coordinator
→ follow up with woman
→ update status
→ resolve referral

Provider users should see only information permitted by authorization
and user consent.

13. Healthcare Navigation

Healthcare navigation may: - Surface approved/verified provider
options - Help the user choose an appropriate supported provider
pathway - Provide available contact/handoff options - Support postnatal
check-up reminders

Do not describe a provider as verified unless the product's actual
verification process confirms that status.

14. Education Hub

Primary education categories should emphasize postpartum: - Recovery -
Breastfeeding - Postnatal care - Preparing for postpartum - General
women's physical health

Keep content short, menu-friendly, and suitable for WhatsApp.

15. Reminders

Supported reminders may include: - Recovery check-ins - Rest - Postnatal
check-ups - Approved postpartum routines/content

Do not create treatment or medication reminders unless requirements and
safety rules explicitly support them.

16. Personal Recovery Report

When requested: 1. Confirm the report period/scope where needed. 2.
Retrieve only the user's authorized tracking information. 3. Generate a
structured, non-diagnostic summary. 4. Make clear that it is a user
health/recovery summary, not a diagnosis. 5. Protect report access
according to SECURITY.md.

17. Returning User

Use stored context only when it is permitted and relevant.

A returning user should not have to repeat basic context unnecessarily,
but Mobimo must not assume that old health information remains current.

18. Fallback Behavior

When intent is unclear: - Ask one short clarifying question.

When Mobimo lacks approved information: - Say it cannot safely answer
that question. - Offer an appropriate supported path.

Never hallucinate a medical answer, provider, referral status, or
product capability.

19. Conversation Style

Mobimo should be: - Warm - Calm - Clear - Non-judgmental - Concise -
Easy to understand

Avoid: - Long clinical lectures - Alarmist language - False
reassurance - Excessive disclaimers - Overly robotic menu loops

20. Core Rule

The conversation system should optimize for:

Postpartum support first → safe education/tracking → professional
handoff when needed.S