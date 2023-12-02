'use client'

import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import {
	CodeIcon,
	ImageIcon,
	LayoutDashboard,
	MessageSquare,
	MusicIcon,
	SettingsIcon,
	VideoIcon,
} from 'lucide-react'

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] })

const routes = [
	{
		name: 'Dashboard',
		icon: LayoutDashboard,
		href: '/dashboard',
		color: 'text-sky-500',
	},
	{
		name: 'Conversation',
		icon: MessageSquare,
		href: '/conversation',
		color: 'text-yellow-500',
	},
	{
		name: 'Image Generation',
		icon: ImageIcon,
		href: '/image',
		color: 'text-pink-600',
	},
	{
		name: 'Video Generation',
		icon: VideoIcon,
		href: '/video',
		color: 'text-orange-600',
	},
	{
		name: 'Music Generation',
		icon: MusicIcon,
		href: '/music',
		color: 'text-violet-500',
	},
	{
		name: 'Code Generation',
		icon: CodeIcon,
		href: '/code',
		color: 'text-green-600',
	},
	{
		name: 'Settings',
		icon: SettingsIcon,
		href: '/settings',
		color: 'text-gray-400',
	},
]

export default function Sidebar() {
	return (
		<div className='space-y-4 py-4 dlex flex-col h-full bg-[#111827] text-white'>
			<div className='px-3 py-2 flex-1'>
				<Link href='/dashboard' className='flex items-center pl-3 mb-14'>
					<div className='relative w-8 h-8 mr-4'>
						<Image fill alt='Logo' src='/logo.png' />
					</div>
					<h1 className={cn('text-2xl font-bold', montserrat.className)}>
						Shim AI
					</h1>
				</Link>
				<div className='space-y-1'>
					{routes.map((route) => (
						<Link
							href={route.href}
							key={route.href}
							className='text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-md transition'>
							<div className='flex items-center flex-1'>
								<route.icon className={cn('h-5 w-5 mr-3', route.color)} />
								{route.name}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
