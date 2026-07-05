---
title: "Killing Latency in a Voice AI Pipeline"
date: "2025-06-10"
tag: "voice-ai"
excerpt: "How I shaved 800ms off the STT→LLM→TTS round-trip in the Grand Hilton voice agent."
---

The first version of the hotel voice agent had a noticeable pause between the guest finishing a sentence and the AI responding. About 1.4 seconds. That's fine for a chatbot. For a voice call, it feels broken.

Here's what was eating the time, in order of impact.

## The STT buffer was too conservative

The speech-to-text layer was waiting for 600ms of silence before finalising a transcript. That's a safe default — it avoids cutting off slow speakers — but it added over half a second of dead air before the LLM even saw the input. Dropping it to 280ms and adding a confidence threshold to catch early finalisations cut the wait almost in half.

## The LLM response wasn't streaming

The first implementation waited for the full LLM response before handing anything to TTS. Switching to streaming and piping the first sentence to TTS as soon as it arrived meant audio started playing while the model was still generating the rest of the reply. The perceived latency dropped to near zero.

## TTS was initialising cold

The TTS client was being instantiated per-request. Moving it to a module-level singleton and warming it on startup saved another 120ms on the first turn of every session.

Total round-trip after fixes: ~580ms. Still not instant, but it no longer sounds like the system is thinking too hard.
