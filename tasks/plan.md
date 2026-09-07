# Implementation Plan: مِعيار Mobile Chat

## Overview

Build a focused Expo/React Native mobile app for the Saudi Qudrat coach. The first release is intentionally chat-first: one conversation surface, a compact conversation drawer, quick prompts, message actions, and a premium Arabic RTL visual system. The current web MVP remains separate and is used as a product/content reference.

## Architecture Decisions

- Use Expo SDK 57 with Expo Router for iOS, Android, and web-ready navigation.
- Keep the first release local-first with a deterministic coach simulator; isolate the chat engine so a secure server-side AI provider can replace it without redesigning the UI.
- Use React Native primitives and `@expo/vector-icons`; avoid unnecessary UI dependencies.
- Keep the product surface focused on chat rather than recreating a dashboard.
- Never place provider API keys in the mobile client.

## Task List

### Phase 1: Foundation

- [ ] Task 1: Create Expo project configuration, app metadata, and TypeScript setup.
- [ ] Task 2: Add shared theme tokens, Arabic direction handling, and typed chat models.

### Checkpoint: Foundation

- [ ] TypeScript can resolve the Expo app entry point.
- [ ] App launches with the intended dark RTL shell.

### Phase 2: Chat Experience

- [ ] Task 3: Build the conversation screen with header, messages, typing state, and composer.
- [ ] Task 4: Add conversation drawer, quick prompts, message actions, and local session behavior.
- [ ] Task 5: Add Qudrat-focused deterministic coach responses and question explanations.

### Checkpoint: Core Experience

- [ ] User can open a new conversation.
- [ ] User can send a message and receive a coach response.
- [ ] Quick prompts create useful conversation turns.
- [ ] RTL layout remains readable on compact phone widths.

### Phase 3: Release Hygiene

- [ ] Task 6: Add README, environment guidance, and release notes.
- [ ] Task 7: Run typecheck/export checks and inspect the final diff for secrets/generated files.
- [ ] Task 8: Commit and upload the finished project to a dedicated GitHub repository.

### Checkpoint: Complete

- [ ] `tsc --noEmit` passes.
- [ ] Expo web export/build passes.
- [ ] GitHub repository contains the source and reproducible setup instructions.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| A mobile client calling an AI provider directly leaks credentials | High | Ship a local simulator now and document server-side integration as the next boundary |
| Scope expands into a dashboard | Medium | Keep the first release centered on a single conversation and a small drawer |
| Arabic text wraps poorly on small screens | Medium | Test compact widths, use flexible message bubbles, and keep actions icon-labeled |
| App Store expectations differ from a web prototype | Medium | Use native navigation primitives and keep app metadata/release instructions ready |

## Open Questions

- Which production AI provider and knowledge base will be connected after the UI is approved?
- Will the first paid release use subscriptions or a one-time exam pack?
