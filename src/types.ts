export type MessageRole = 'user' | 'assistant';

export type MessageStatus = 'thinking' | 'streaming' | 'complete' | 'error';

export type QuestionOption = {
  key: string;
  text: string;
};

export type PlanDay = {
  range: string;
  focus: string;
};

export type MessageBlock =
  | { type: 'text'; content: string }
  | {
      type: 'question';
      subject: string;
      stem: string;
      options: QuestionOption[];
      correctKey: string;
      steps: string[];
      tip?: string;
    }
  | { type: 'steps'; title: string; items: string[] }
  | { type: 'plan'; title: string; days: PlanDay[] }
  | { type: 'context'; label: string; value: string };

export type ChatMessage = {
  id: string;
  role: MessageRole;
  text: string;
  displayedText: string;
  blocks: MessageBlock[];
  createdAt: string;
  status: MessageStatus;
};

export type Conversation = {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  current?: boolean;
};

export type ToastState = {
  message: string;
  visible: boolean;
};

export type AppNotice = 'offline' | 'error' | null;
