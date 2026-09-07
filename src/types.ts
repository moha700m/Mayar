export type MessageRole = 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: MessageRole;
  text: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
};
