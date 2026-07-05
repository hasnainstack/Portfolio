---
title: "Prompt Engineering for Interview Feedback That Doesn't Sound Generic"
date: "2025-07-01"
tag: "generative-ai"
excerpt: "The prompting patterns that made Interview-AI feedback feel like a real coach, not a rubric."
---

The hardest part of building Interview-AI wasn't the question generation — it was making the feedback feel like it came from a person who'd actually listened, not a checklist.

Early versions produced things like: *"Your answer was clear but could be more specific. Try to use the STAR method."* Technically correct. Completely useless.

## What changed

**Anchoring feedback to the actual response.** The prompt now includes the candidate's verbatim answer and instructs the model to quote specific phrases when pointing out issues. Feedback that says *"when you said 'I kind of helped the team' — that hedge weakens the impact"* lands differently than a generic note about confidence.

**Separating signal from noise.** I split the evaluation into three distinct passes: content (did they answer the question?), structure (was it followable?), and delivery signals (hedging language, filler phrases, passive voice). Combining all three into one prompt produced muddled output. Three focused prompts, then a synthesis pass, produced cleaner results.

**Calibrating to role and seniority.** A junior developer and a senior engineer should be held to different standards. Injecting the target role and level into the evaluation prompt — and explicitly telling the model to adjust expectations accordingly — stopped the feedback from being either too harsh or too soft.

**Ending with one concrete action.** Every feedback response now ends with a single, specific thing to do differently next time. Not three things. One. Users actually remember one thing.

The model didn't change. The prompts did. That's usually how it goes.
