import type { ChatMessage, Conversation, MessageBlock } from '@/src/types';

export const starterPrompts = [
  { label: 'اختبرني كمي', value: 'اختبرني في سؤال كمي متوسط', icon: 'hash' as const },
  { label: 'اشرح التناظر', value: 'اشرح لي التناظر اللفظي بطريقة سهلة', icon: 'type' as const },
  { label: 'خطة ١٤ يوم', value: 'سوِّ لي خطة مذاكرة لقدرات لمدة ١٤ يوم', icon: 'calendar' as const },
  { label: 'ابدأ محاكاة', value: 'ابدأ معي محاكاة قصيرة للقدرات', icon: 'watch' as const },
] as const;

export const toolPrompts = [
  { label: 'صورة سؤال', value: 'سأرفع لك صورة سؤال، جهز نفسك لشرحه خطوة خطوة', icon: 'image' as const },
  { label: 'سؤال سريع', value: 'اعطني سؤال قدرات سريع الآن', icon: 'zap' as const },
  { label: 'راجع أخطائي', value: 'راجع معي أكثر الأخطاء الشائعة في القدرات', icon: 'alert-circle' as const },
  { label: 'محاكاة اختبار', value: 'ابدأ معي محاكاة قصيرة للقدرات', icon: 'clock' as const },
  { label: 'خطة مذاكرة', value: 'سوِّ لي خطة مذاكرة لقدرات لمدة ١٤ يوم', icon: 'book-open' as const },
] as const;

export const sampleConversations: Conversation[] = [
  {
    id: 'current',
    title: 'محادثة جديدة',
    preview: 'ابدأ سؤال أو محاكاة',
    updatedAt: 'الآن',
    current: true,
  },
  {
    id: 'analogy',
    title: 'مراجعة التناظر',
    preview: 'شرح العلاقات بين الكلمات',
    updatedAt: 'أمس',
  },
  {
    id: 'plan-14',
    title: 'خطة ١٤ يوم',
    preview: 'جدول مذاكرة حتى الاختبار',
    updatedAt: 'الأحد',
  },
  {
    id: 'quant-misses',
    title: 'أخطائي في الكمي',
    preview: 'نسب ومتوسطات ومسائل لفظية',
    updatedAt: 'السبت',
  },
];

export type CoachReply = {
  text: string;
  blocks: MessageBlock[];
  followUps?: string[];
};

const emptyReply: CoachReply = {
  text: 'ما قدرت أكمل الرد. أعد المحاولة، أو صِغ السؤال بطريقة ثانية.',
  blocks: [],
};

export function titleFromPrompt(input: string) {
  const message = input.trim();
  if (/تناظر|لفظي/.test(message)) return 'مراجعة التناظر';
  if (/خطة|١٤|14|مذاكرة/.test(message)) return 'خطة ١٤ يوم';
  if (/خطأ|أخطائي/.test(message)) return 'أخطائي في الكمي';
  if (/محاكاة|اختبار/.test(message)) return 'محاكاة قصيرة';
  if (/كمي|نسبة|رياضيات/.test(message)) return 'تدريب كمي';
  if (message.length <= 18) return message;
  return `${message.slice(0, 16)}…`;
}

export function getCoachReply(input: string): CoachReply {
  const message = input.trim();
  if (!message) return emptyReply;

  const normalized = message.toLowerCase();

  if (/^[أابتثجحخد][\)]?$/.test(message) || /^[abcd]$/i.test(message) || /صح|خطأ|إجابة/.test(message)) {
    return {
      text: 'تمام. بعد ما تختار من البطاقة، ركّز على الخطوة مو على الحرف.\n\nإذا انحلّت، اطلب سؤال ثاني بنفس الفكرة عشان تثبّت الطريقة.',
      blocks: [
        {
          type: 'steps',
          title: 'بعد الإجابة',
          items: [
            'اقرأ العلاقة أو المعطيات قبل الخيارات.',
            'اشطب خيارين بعيدين بسرعة.',
            'اكتب السبب بجملة واحدة في دفتر الأخطاء.',
          ],
        },
      ],
      followUps: ['سؤال ثاني', 'اشرح أبطأ', 'خطأ شائع'],
    };
  }

  if (/صورة|ارفع|رفع/.test(normalized)) {
    return {
      text: 'جاهز لصورة السؤال. ارفعها من زر الإضافة، وأشرحها خطوة خطوة مع التنبيه إذا كانت غير واضحة.',
      blocks: [
        {
          type: 'context',
          label: 'أداة',
          value: 'قراءة صورة سؤال',
        },
        {
          type: 'steps',
          title: 'كيف نتعامل مع الصورة',
          items: [
            'تأكد أن النص ظاهر والخيارات كاملة.',
            'بعد الربط الآمن، أقرأ السؤال وأحدد نوعه: كمي أو لفظي.',
            'أشرح الحل ثم أعطيك سؤال مشابه للتثبيت.',
          ],
        },
      ],
    };
  }

  if (/خطأ|أخطائي|شائع/.test(normalized)) {
    return {
      text: 'أكثر أخطاء القدرات تتكرر لأنها سرعة بدون منهج، مو لأنها صعبة.',
      blocks: [
        {
          type: 'context',
          label: 'مراجعة',
          value: 'أخطاء شائعة',
        },
        {
          type: 'steps',
          title: 'الكمي',
          items: [
            'نسيان تحويل النسبة إلى عدد.',
            'خلط المتوسط بالمجموع.',
            'القراءة السريعة للمعطى الزائد.',
          ],
        },
        {
          type: 'steps',
          title: 'اللفظي',
          items: [
            'البحث عن معنى الكلمة بدل العلاقة.',
            'اختيار مرادف قريب وإهمال الاتجاه.',
            'ترك المفردة الشاذة بدون سبب مكتوب.',
          ],
        },
      ],
      followUps: ['اختبرني كمي', 'اشرح التناظر'],
    };
  }

  if (/كمي|نسبة|معادلة|رياضيات|حساب/.test(normalized)) {
    return {
      text: 'نبدأ بسؤال كمي متوسط. اختر الإجابة من البطاقة وبعدها أفتح لك الحل.',
      blocks: [
        {
          type: 'context',
          label: 'كمي',
          value: 'نسب',
        },
        {
          type: 'question',
          subject: 'كمي',
          stem: 'إذا كان ٣٠٪ من عدد يساوي ١٨، فما العدد؟',
          options: [
            { key: 'أ', text: '٤٨' },
            { key: 'ب', text: '٥٤' },
            { key: 'ج', text: '٦٠' },
            { key: 'د', text: '٧٢' },
          ],
          correctKey: 'ج',
          steps: [
            '٣٠٪ تعني ٣٠ ÷ ١٠٠ = ٠٫٣.',
            'إذن: العدد × ٠٫٣ = ١٨.',
            'العدد = ١٨ ÷ ٠٫٣ = ٦٠.',
          ],
          tip: 'اختصار سريع: ١٨ ÷ ٣ × ١٠ = ٦٠.',
        },
      ],
      followUps: ['سؤال ثاني', 'خطة ١٤ يوم'],
    };
  }

  if (/تناظر|لفظي|كلمة|معنى|مفردات/.test(normalized)) {
    return {
      text: 'التناظر اللفظي يقيس العلاقة بين الكلمتين، مو معنى كل كلمة لحاله.',
      blocks: [
        {
          type: 'context',
          label: 'لفظي',
          value: 'تناظر',
        },
        {
          type: 'question',
          subject: 'لفظي',
          stem: 'قلم : كتابة :: فرشاة : ؟',
          options: [
            { key: 'أ', text: 'لون' },
            { key: 'ب', text: 'رسم' },
            { key: 'ج', text: 'شعر' },
            { key: 'د', text: 'يد' },
          ],
          correctKey: 'ب',
          steps: [
            'حوّل الزوج الأول إلى جملة: القلم أداة تُستخدم في الكتابة.',
            'طبّق الجملة نفسها: الفرشاة أداة تُستخدم في الرسم.',
            'المعنى القريب مثل «لون» يغلط لأن العلاقة استخدام لا وصف.',
          ],
          tip: 'اكتب العلاقة بجملة قصيرة قبل ما تشوف الخيارات.',
        },
      ],
      followUps: ['سؤال ثاني', 'راجع أخطائي'],
    };
  }

  if (/خطة|١٤|14|مذاكرة|جدول/.test(normalized)) {
    return {
      text: 'هذه بداية خطة ١٤ يوم: قصيرة، يومية، ومبنية على الأخطاء مو على الحفظ.',
      blocks: [
        {
          type: 'plan',
          title: 'خطة ١٤ يوم',
          days: [
            { range: '١–٣', focus: 'النسب والكسور والمتوسطات' },
            { range: '٤–٦', focus: 'الجبر والهندسة والمسائل اللفظية' },
            { range: '٧–٩', focus: 'التناظر وإكمال الجمل والمفردة الشاذة' },
            { range: '١٠–١٢', focus: 'تدريب مختلط مع دفتر أخطاء' },
            { range: '١٣–١٤', focus: 'محاكاتان بزمن كامل ثم مراجعة الأخطاء فقط' },
          ],
        },
        {
          type: 'context',
          label: 'يوميًا',
          value: '٤٥ دقيقة تدريب + ١٥ مراجعة',
        },
      ],
      followUps: ['ابدأ محاكاة', 'اختبرني كمي'],
    };
  }

  if (/ببطء|خطوة خطوة|اشرح الحل/.test(normalized)) {
    return {
      text: 'نمشّي الحل ببطء، جملة جملة، من غير قفز على الناتج.',
      blocks: [
        {
          type: 'steps',
          title: 'طريقة أهدى',
          items: [
            'اقرأ السؤال مرة وأنت تبحث عن المطلوب فقط.',
            'حوّل المعطيات إلى جملة أو معادلة قصيرة.',
            'نفّذ خطوة واحدة ثم تطّلع على الخيارات.',
            'إذا ما انضبطت، ارجع للجملة الأولى لا للخيار التالي.',
          ],
        },
      ],
      followUps: ['سؤال ثاني', 'اختبرني كمي'],
    };
  }

  if (/محاكاة|اختبار|اختبرني|سريع/.test(normalized)) {
    return {
      text: 'نبدأ محاكاة قصيرة من ثلاثة أسئلة. سؤال واحد كل مرة، وأسجل نوع الخطأ.',
      blocks: [
        {
          type: 'context',
          label: 'محاكاة',
          value: 'سؤال ١ من ٣',
        },
        {
          type: 'question',
          subject: 'كمي',
          stem: 'متوسط ثلاثة أعداد هو ١٢، ومجموع عددين منها ١٩. ما العدد الثالث؟',
          options: [
            { key: 'أ', text: '١٥' },
            { key: 'ب', text: '١٧' },
            { key: 'ج', text: '١٩' },
            { key: 'د', text: '٢١' },
          ],
          correctKey: 'ب',
          steps: [
            'مجموع الأعداد الثلاثة = ١٢ × ٣ = ٣٦.',
            'العدد الثالث = ٣٦ − ١٩ = ١٧.',
          ],
          tip: 'المتوسط × العدد = المجموع. لا تبدأ من الخيارات.',
        },
      ],
      followUps: ['السؤال التالي', 'اشرح أبطأ'],
    };
  }

  return {
    text: 'فهمت عليك. أقدر أشرح الفكرة ثم أختبرك عليها بدل إعطاء الإجابة فقط. اكتب السؤال أو اختر مسارًا سريعًا.',
    blocks: [
      {
        type: 'context',
        label: 'مسار',
        value: 'شرح ثم تدريب',
      },
    ],
    followUps: ['اختبرني كمي', 'اشرح التناظر', 'خطة ١٤ يوم'],
  };
}

export function seededMessages(conversationId: string): ChatMessage[] {
  if (conversationId === 'analogy') {
    const reply = getCoachReply('اشرح لي التناظر اللفظي بطريقة سهلة');
    return [
      makeMessage('user-seed-1', 'user', 'اشرح التناظر', 'اشرح التناظر'),
      makeMessage('assistant-seed-1', 'assistant', reply.text, reply.text, reply.blocks),
    ];
  }

  if (conversationId === 'plan-14') {
    const reply = getCoachReply('سوِّ لي خطة مذاكرة لقدرات لمدة ١٤ يوم');
    return [
      makeMessage('user-seed-2', 'user', 'خطة ١٤ يوم', 'خطة ١٤ يوم'),
      makeMessage('assistant-seed-2', 'assistant', reply.text, reply.text, reply.blocks),
    ];
  }

  if (conversationId === 'quant-misses') {
    const reply = getCoachReply('راجع معي أكثر الأخطاء الشائعة في القدرات');
    return [
      makeMessage('user-seed-3', 'user', 'راجع أخطائي في الكمي', 'راجع أخطائي في الكمي'),
      makeMessage('assistant-seed-3', 'assistant', reply.text, reply.text, reply.blocks),
    ];
  }

  return [];
}

function makeMessage(
  id: string,
  role: ChatMessage['role'],
  text: string,
  displayedText: string,
  blocks: MessageBlock[] = [],
): ChatMessage {
  return {
    id,
    role,
    text,
    displayedText,
    blocks,
    createdAt: new Date().toISOString(),
    status: 'complete',
  };
}
