import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: '/video',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: '/code',
  },
];