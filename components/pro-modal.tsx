'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useProModal } from '@/hooks/use-pro-modal'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'

export default function ProModal() {
	const proModal = useProModal()

	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
						<div className='flex items-center gap-x-2 font-bold text-xl'>
							Upgrade to Genius
						</div>
					</DialogTitle>
					<DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
						Dialog description
					</DialogDescription>
					<DialogFooter>
						<Button size='lg' variant='premium' className='w-full'>
							Upgrade
							<Zap className='w-4 h-4 ml-2 fill-white' />
						</Button>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
