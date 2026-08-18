// Mock data for the Student Backpack — personal inventory world.
// WHAT I CARRY. Structured to match backend models for later swap.

export const backpackUser = {
  id: 'u1',
  name: 'Ruchika Chaudhary',
  email: 'demo@campusjugaad.com',
  college: 'GL Bajaj Institute of Technology and Management',
  branch: 'CSE-AI',
  jugaadScore: 850,
  rating: 4.9,
  jugaadsCompleted: 18,
  avatar: 'RC',
};

export const backpackStats = {
  tasks: 3,
  projects: 2,
  messages: 1,
  earnings: 2400,
};

// NOTEBOOK — tasks and deadlines
export const backpackTasks = [
  { id: 't1', text: 'DBMS Assignment', sub: 'Due tomorrow', emoji: '📚', tag: 'ACADEMICS', status: 'urgent', detail: 'Unit 3 normalization — submission by 11:59 PM.' },
  { id: 't2', text: 'Fest Poster', sub: 'Open', emoji: '🖼️', tag: 'DESIGN', status: 'open', detail: 'Need a poster for TechFest 2024. Budget ₹300.' },
  { id: 't3', text: 'C++ Bug', sub: 'In progress', emoji: '🐛', tag: 'CODE', status: 'in-progress', detail: 'Segmentation fault in linked list merge. Dev is helping.' },
  { id: 't4', text: 'Farewell Video', sub: 'Completed', emoji: '🎬', tag: 'VIDEO', status: 'completed', detail: 'Final cut delivered. Riya edited it in 4 hours.' },
];

// LAPTOP — current work / projects in progress
export const backpackProjects = [
  {
    id: 'p1',
    title: 'Fest Video Edit',
    client: 'Riya Sharma',
    progress: 65,
    status: 'in-progress',
    deadline: '2 days',
    budget: '₹500',
    emoji: '🎬',
    desc: 'Final cut rendering. Color grading pending for 3 clips.',
  },
  {
    id: 'p2',
    title: 'Library App UI',
    client: 'College Library',
    progress: 40,
    status: 'in-progress',
    deadline: '5 days',
    budget: '₹800',
    emoji: '💻',
    desc: 'Dashboard wireframes done. Building checkout flow next.',
  },
];

// PHONE — messages and notifications
export const backpackMessages = [
  { id: 'msg1', from: 'Riya', initials: 'Ri', preview: 'Can you help with this video?', time: '2m ago', unread: true, accent: 'amber' },
  { id: 'msg2', from: 'Dev', initials: 'De', preview: 'Your C++ issue is fixed.', time: '1h ago', unread: false, accent: 'mint' },
  { id: 'msg3', from: 'Ananya', initials: 'An', preview: 'Poster is ready!', time: '3h ago', unread: false, accent: 'coral' },
  { id: 'msg4', from: 'Kabir', initials: 'Ka', preview: 'Thanks for the help!', time: '1d ago', unread: false, accent: 'amber' },
];

// WALLET — earnings and payment receipts
export const backpackEarnings = {
  totalEarned: 2400,
  thisMonth: 800,
  completedJugaads: 18,
  history: [
    { id: 'e1', text: 'Fest Video Edit', amount: 500, date: '2d ago', emoji: '🎬' },
    { id: 'e2', text: 'C++ Debug Help', amount: 200, date: '1d ago', emoji: '🐛' },
    { id: 'e3', text: 'Poster Design', amount: 300, date: '3d ago', emoji: '🖼️' },
    { id: 'e4', text: 'DBMS Notes', amount: 150, date: '5d ago', emoji: '📚' },
    { id: 'e5', text: 'Workshop PPT', amount: 250, date: '1w ago', emoji: '⏰' },
  ],
};

export const WORLD_NAV = [
  { id: 'workshop', label: 'WORKSHOP', route: '/dashboard' },
  { id: 'backpack', label: 'BACKPACK', route: '/backpack' },
];
