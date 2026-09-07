# Implementation Plan: مِعيار Mobile Chat

## Overview

مِعيار تطبيق Expo/React Native للمحادثة أولًا. الواجهة الحالية إعادة تصميم كاملة لتجربة المدرب الذكي: شاشة فارغة، محادثة RTL، Orb للتفكير، بث نصي، بطاقات أسئلة، درج محادثات، وأدوات Plus. المحاكي المحلي يبقى حتى ربط Backend آمن.

## Architecture Decisions

- Expo SDK 57 مع Expo Router لمسار واحد هو المحادثة.
- React Native primitives و`@expo/vector-icons` و`Animated` المضمّنة. لا مكتبات UI جديدة.
- Design tokens في `src/theme`، والمكونات في `src/components`.
- محاكي الرد في `src/data/chat.ts` مع كتل غنية (سؤال، خطوات، خطة) بدون مفاتيح API.
- `direction: 'rtl'` في الجذر بدل قلب أفقي للواجهة.

## Task List

### Phase 1: Foundation

- [x] Task 1: Create Expo project configuration, app metadata, and TypeScript setup.
- [x] Task 2: Add shared theme tokens, Arabic direction handling, and typed chat models.

### Checkpoint: Foundation

- [x] TypeScript can resolve the Expo app entry point.
- [x] App launches with the intended dark RTL shell.

### Phase 2: Chat Experience

- [x] Task 3: Build the conversation screen with header, messages, typing state, and composer.
- [x] Task 4: Add conversation drawer, quick prompts, message actions, and local session behavior.
- [x] Task 5: Add Qudrat-focused deterministic coach responses and question explanations.

### Checkpoint: Core Experience

- [x] User can open a new conversation.
- [x] User can send a message and receive a coach response.
- [x] Quick prompts create useful conversation turns.
- [x] RTL layout remains readable on compact phone widths.

### Phase 3: Visual system

- [x] Task 6: Rebuild empty, thinking, streaming, composer, drawer, and tool states around the premium dark palette.
- [x] Task 7: Add question cards, plan rows, copy/share/retry, offline/error banners, and reduced-motion behavior.
- [x] Task 8: Document the visual system in DESIGN.md and README.

### Checkpoint: Complete

- [x] `tsc --noEmit` and Expo config validation are part of the release loop.
- [x] GitHub repository contains the source and reproducible setup instructions.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| A mobile client calling an AI provider directly leaks credentials | High | Keep the local simulator and document server-side integration |
| Scope expands into a dashboard | Medium | Keep one conversation surface, chips, and a drawer |
| Arabic text wraps poorly on small screens | Medium | Test 375 and 390 widths, flexible bubbles, wrapping tool chips |
| Motion feels heavy on low-end phones | Medium | Native Animated only, respect reduced motion, no WebGL |
