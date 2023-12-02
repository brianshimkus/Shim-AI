import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import { UserButton } from '@clerk/nextjs'

export default function Navbar() {
	return (
		<div className='flex items-center p-4'>
			<Button variant='ghost' size='icon' className='md:hideen'>
				<Menu />
			</Button>
			<div className='flex w-full justify-end'>
				<UserButton afterSignOutUrl='/' />
			</div>
		</div>
	)
}
