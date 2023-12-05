'use client'

import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { MAX_FREE_COUNTS } from '@/constants'

interface FreeCounterProps {
	apiLimitCount: number
}

export default function FreeCounter({ apiLimitCount = 0 }: FreeCounterProps) {
	const [mounted, setMounted] = useState(false)

	return (
		<div className='px-3'>
			<Card className='bg-white/10 border-0'>
				<CardContent className='py-6'>
					<div className='text-center text-sm text-white mb-4 space-y-2'>
						<p>
							{apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
