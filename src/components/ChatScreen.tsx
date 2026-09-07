import * as Clipboard from 'expo-clipboard';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Share, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatHeader } from '@/src/components/ChatHeader';
import { Composer } from '@/src/components/Composer';
import { ConversationDrawer } from '@/src/components/ConversationDrawer';
import { MessageBubble } from '@/src/components/MessageBubble';
import { RecommendationChips } from '@/src/components/RecommendationChips';
import { StateBanner } from '@/src/components/StateBanner';
import { Toast } from '@/src/components/Toast';
import { ToolTray } from '@/src/components/ToolTray';
import { WelcomePanel } from '@/src/components/WelcomePanel';
import { getCoachReply, sampleConversations, seededMessages, starterPrompts, titleFromPrompt, toolPrompts } from '@/src/data/chat';
import { useConnectivity } from '@/src/hooks/useConnectivity';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { expandLayout, initMotionPreference } from '@/src/theme/motion';
import { colors } from '@/src/theme/tokens';
import type { AppNotice, ChatMessage, Conversation } from '@/src/types';
import { streamText } from '@/src/utils/stream';

initMotionPreference();

function resolveFollowUp(label: string) {
  const known = [...starterPrompts, ...toolPrompts].find((item) => item.label === label);
  if (known) return known.value;
  if (label === 'سؤال ثاني' || label === 'السؤال التالي') return 'اعطني سؤال قدرات سريع الآن';
  if (label === 'اشرح أبطأ') return 'اشرح الحل خطوة خطوة وببطء';
  if (label === 'خطأ شائع') return 'راجع معي أكثر الأخطاء الشائعة في القدرات';
  return label;
}

function createMessage(role: ChatMessage['role'], text: string, status: ChatMessage['status'] = 'complete'): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
    role,
    text,
    displayedText: role === 'user' ? text : '',
    blocks: [],
    createdAt: new Date().toISOString(),
    status,
  };
}

export function ChatScreen() {
  const reducedMotion = useReducedMotion();
  const { online } = useConnectivity();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [toolsOpen, setToolsOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [notice, setNotice] = useState<AppNotice>(null);
  const [toast, setToast] = useState('');
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const pinnedToBottom = useRef(true);
  const responseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const streamHandle = useRef<{ stop: () => void } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const busyRef = useRef(false);
  const busy = messages.some((item) => item.status === 'thinking' || item.status === 'streaming');

  useEffect(() => {
    setNotice(online ? null : 'offline');
  }, [online]);

  useEffect(() => {
    return () => {
      if (responseTimer.current) clearTimeout(responseTimer.current);
      streamHandle.current?.stop();
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const lastAssistantId = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      if (messages[index].role === 'assistant') return messages[index].id;
    }
    return null;
  }, [messages]);

  function scrollIfPinned() {
    if (!pinnedToBottom.current) return;
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: !reducedMotion });
    });
  }

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1800);
  }

  function stopPending() {
    if (responseTimer.current) clearTimeout(responseTimer.current);
    streamHandle.current?.stop();
    streamHandle.current = null;
    busyRef.current = false;
  }

  function startNewConversation() {
    stopPending();
    setMessages([]);
    setDraft('');
    setToolsOpen(false);
    setDrawerVisible(false);
    setFollowUps([]);
    setNotice(online ? null : 'offline');
    setConversations((current) =>
      current.map((item) =>
        item.id === 'current'
          ? { ...item, title: 'محادثة جديدة', preview: 'ابدأ سؤال أو محاكاة', updatedAt: 'الآن', current: true }
          : { ...item, current: false },
      ),
    );
    pinnedToBottom.current = true;
  }

  function selectConversation(id: string) {
    stopPending();
    setDraft('');
    setToolsOpen(false);
    setFollowUps([]);
    setDrawerVisible(false);
    setNotice(online ? null : 'offline');
    pinnedToBottom.current = true;

    if (id === 'current') {
      setMessages([]);
      setConversations((current) => current.map((item) => ({ ...item, current: item.id === 'current' })));
      return;
    }

    setMessages(seededMessages(id));
    setConversations((current) => current.map((item) => ({ ...item, current: item.id === id })));
  }

  function queueAssistantReply(assistantId: string, userText: string) {
    responseTimer.current = setTimeout(() => {
      try {
        const reply = getCoachReply(userText);
        if (!reply.text.trim()) {
          throw new Error('empty');
        }

        setMessages((current) =>
          current.map((item) => (item.id === assistantId ? { ...item, text: reply.text, status: 'streaming' } : item)),
        );

        streamHandle.current = streamText(
          reply.text,
          reducedMotion,
          (partial) => {
            setMessages((current) =>
              current.map((item) => (item.id === assistantId ? { ...item, displayedText: partial } : item)),
            );
            scrollIfPinned();
          },
          () => {
            expandLayout();
            setMessages((current) =>
              current.map((item) =>
                item.id === assistantId
                  ? { ...item, displayedText: reply.text, blocks: reply.blocks, status: 'complete' }
                  : item,
              ),
            );
            setFollowUps(reply.followUps ?? []);
            busyRef.current = false;
            scrollIfPinned();
          },
        );
      } catch {
        setNotice('error');
        setMessages((current) =>
          current.map((item) => (item.id === assistantId ? { ...item, status: 'error', displayedText: '' } : item)),
        );
        busyRef.current = false;
      }
    }, reducedMotion ? 160 : 720);
  }

  function sendMessage(value = draft) {
    const text = value.trim();
    if (!text || busy || busyRef.current) return;
    if (!online) {
      setNotice('offline');
      return;
    }

    const userMessage = createMessage('user', text);
    const assistantMessage = createMessage('assistant', '', 'thinking');

    stopPending();
    busyRef.current = true;
    setNotice(null);
    setFollowUps([]);
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setDraft('');
    setToolsOpen(false);
    pinnedToBottom.current = true;
    scrollIfPinned();

    setConversations((current) =>
      current.map((item) =>
        item.current ? { ...item, title: titleFromPrompt(text), preview: text, updatedAt: 'الآن' } : item,
      ),
    );

    queueAssistantReply(assistantMessage.id, text);
  }

  function retryLast() {
    if (!online) {
      setNotice('offline');
      return;
    }

    const lastUser = [...messages].reverse().find((item) => item.role === 'user');
    if (!lastUser) return;

    const assistantMessage = createMessage('assistant', '', 'thinking');
    stopPending();
    busyRef.current = true;
    setNotice(null);
    setFollowUps([]);
    pinnedToBottom.current = true;
    setMessages((current) => {
      const cleaned = current.filter((item) => item.status !== 'error' && item.status !== 'thinking' && item.status !== 'streaming');
      return [...cleaned, assistantMessage];
    });
    queueAssistantReply(assistantMessage.id, lastUser.text);
  }

  async function copyMessage(message: ChatMessage) {
    const content = message.text.trim();
    if (!content) {
      showToast('ما في محتوى للنسخ');
      return;
    }
    await Clipboard.setStringAsync(content);
    showToast('تم نسخ الرد');
  }

  async function shareMessage(message: ChatMessage) {
    const content = message.text.trim();
    if (!content) {
      showToast('ما في محتوى للمشاركة');
      return;
    }
    try {
      await Share.share({ message: content, title: 'مِعيار' });
    } catch {
      await Clipboard.setStringAsync(content);
      showToast('تم نسخ الرد للمشاركة');
    }
  }

  const lastComplete = messages[messages.length - 1];
  const showFollowUps = Boolean(lastComplete && lastComplete.role === 'assistant' && lastComplete.status === 'complete' && followUps.length > 0 && !toolsOpen);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
        <ChatHeader onNewConversation={startNewConversation} onOpenDrawer={() => setDrawerVisible(true)} />
        <StateBanner notice={notice} onRetry={notice === 'error' ? retryLast : undefined} />

        {messages.length === 0 ? (
          <WelcomePanel onPrompt={(value) => sendMessage(value)} />
        ) : (
          <FlatList
            ref={listRef}
            contentContainerStyle={styles.messageList}
            data={messages}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={scrollIfPinned}
            onScroll={(event) => {
              const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
              pinnedToBottom.current = contentSize.height - layoutMeasurement.height - contentOffset.y < 72;
            }}
            renderItem={({ item }) => (
              <MessageBubble
                isLastAssistant={item.id === lastAssistantId}
                message={item}
                onCopy={() => {
                  void copyMessage(item);
                }}
                onRetry={item.id === lastAssistantId ? retryLast : undefined}
                onShare={() => {
                  void shareMessage(item);
                }}
              />
            )}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          />
        )}

        {showFollowUps ? <RecommendationChips items={followUps} onSelect={(item) => sendMessage(resolveFollowUp(item))} /> : null}
        {toolsOpen ? <ToolTray onTool={(value) => sendMessage(value)} /> : null}
        <Composer
          disabled={!online}
          draft={draft}
          onChangeDraft={setDraft}
          onSend={() => sendMessage()}
          onToggleTools={() => setToolsOpen((value) => !value)}
          onVoice={() => showToast('الإملاء الصوتي يُربط في المرحلة التالية')}
          toolsOpen={toolsOpen}
        />
      </KeyboardAvoidingView>

      <ConversationDrawer
        conversations={conversations}
        onClose={() => setDrawerVisible(false)}
        onNewConversation={startNewConversation}
        onSelectConversation={selectConversation}
        visible={drawerVisible}
      />
      <Toast message={toast} visible={toast.length > 0} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.ink,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.ink,
  },
  messageList: {
    paddingTop: 20,
    paddingBottom: 12,
    flexGrow: 1,
  },
});
