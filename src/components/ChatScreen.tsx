import { Feather } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatHeader } from '@/src/components/ChatHeader';
import { Composer } from '@/src/components/Composer';
import { ConversationDrawer } from '@/src/components/ConversationDrawer';
import { MessageBubble } from '@/src/components/MessageBubble';
import { ToolTray } from '@/src/components/ToolTray';
import { TypingIndicator } from '@/src/components/TypingIndicator';
import { WelcomePanel } from '@/src/components/WelcomePanel';
import { getCoachReply } from '@/src/data/chat';
import { colors, spacing } from '@/src/theme/tokens';
import type { ChatMessage } from '@/src/types';

export function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const responseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function scrollToBottom() {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 80);
  }

  function startNewConversation() {
    if (responseTimer.current) clearTimeout(responseTimer.current);
    setMessages([]);
    setDraft('');
    setIsTyping(false);
    setToolsOpen(false);
    setDrawerVisible(false);
    Keyboard.dismiss();
  }

  function sendMessage(value = draft) {
    const text = value.trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      createdAt: new Date().toISOString(),
    };

    setMessages((current) => [...current, userMessage]);
    setDraft('');
    setToolsOpen(false);
    setIsTyping(true);
    Keyboard.dismiss();
    scrollToBottom();

    responseTimer.current = setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: getCoachReply(text),
        createdAt: new Date().toISOString(),
      };
      setMessages((current) => [...current, assistantMessage]);
      setIsTyping(false);
      scrollToBottom();
    }, 720);
  }

  function notifyCopied() {
    Alert.alert('تم', 'تم نسخ الرد إلى الحافظة.');
  }

  function notifyVoice() {
    Alert.alert('الإملاء الصوتي', 'واجهة الصوت جاهزة، وسيتم ربطها بخدمة الإملاء في المرحلة التالية.');
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
        <ChatHeader onNewConversation={startNewConversation} onOpenDrawer={() => setDrawerVisible(true)} />

        {messages.length === 0 ? (
          <WelcomePanel onPrompt={(value) => sendMessage(value)} />
        ) : (
          <FlatList
            ref={listRef}
            contentContainerStyle={styles.messageList}
            data={messages}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={scrollToBottom}
            renderItem={({ item }) => <MessageBubble message={item} onCopied={notifyCopied} onVoice={notifyVoice} />}
            showsVerticalScrollIndicator={false}
          />
        )}

        {isTyping && <TypingIndicator />}
        {toolsOpen && <ToolTray onTool={(value) => sendMessage(value)} />}
        <Composer
          draft={draft}
          onChangeDraft={setDraft}
          onSend={() => sendMessage()}
          onToggleTools={() => setToolsOpen((value) => !value)}
          onVoice={notifyVoice}
          toolsOpen={toolsOpen}
        />
        <View style={styles.bottomHint}>
          <Feather color={colors.textDim} name="shield" size={11} />
          <Text style={styles.hint}>جلسة تدريب خاصة على جهازك</Text>
        </View>
      </KeyboardAvoidingView>

      <ConversationDrawer
        onClose={() => setDrawerVisible(false)}
        onNewConversation={startNewConversation}
        visible={drawerVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  messageList: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  bottomHint: {
    minHeight: 22,
    paddingHorizontal: spacing.md,
    paddingBottom: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.canvas,
  },
  hint: {
    color: colors.textDim,
    fontSize: 10,
    writingDirection: 'rtl',
  },
});
