import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LandingPage() {
	return (
		<div className='h-screen bg-gradient-to-b from-slate-800 to-slate-900'>
			<div className='pt-48'>
				<div className='text-center mb-8'>
					<h1 className='text-white text-4xl font-bold tracking-widest upper'>
						ShimAI
					</h1>
				</div>
				<div className='container max-w-xl'>
					<Link href='/sign-in'>
						<Button className='bg-purple-500 text-purple-900 hover:bg-purple-400 w-full mb-4 py-6 text-2xl font-bold uppercase tracking-wider transition ease-in-out duration-300'>
							Login
						</Button>
					</Link>
					<Link href='/sign-up'>
						<Button className='bg-green-400 text-green-800 hover:bg-green-300 w-full mb-4 py-6 text-2xl font-bold uppercase tracking-wider transition ease-in-out duration-300'>
							Register
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
