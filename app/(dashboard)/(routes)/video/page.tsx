'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { VideoIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'

import Heading from '@/components/heading'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import { useProModal } from '@/hooks/use-pro-modal'
import toast from 'react-hot-toast'

export default function VideoPage() {
	const proModal = useProModal()
	const router = useRouter()
	const [video, setVideo] = useState<string>()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setVideo(undefined)

			const res = await axios.post('/api/video', values)

			setVideo(res.data[0])

			form.reset()
		} catch (err: any) {
			if (err?.res?.status === 403) {
				proModal.onOpen()
			} else {
				toast.error('Something went wrong.')
			}
		} finally {
			router.refresh()
		}
	}

	return (
		<div>
			<Heading
				title='Video Generation'
				description='Turn your prompt into video.'
				icon={VideoIcon}
				iconColor='text-orange-500'
				bgColor='bg-orange-500/10'
			/>
			<div className='px-4 lg:px-8'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='rounded-md border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
						<FormField
							name='prompt'
							render={({ field }) => (
								<FormItem className='col-span-12 lg:col-span-10'>
									<FormControl className='m-0 p-0'>
										<Input
											className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
											disabled={isLoading}
											placeholder='What kind of video would you like to generate?'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}></FormField>
						<Button
							className='col-span-12 lg:col-span-2 w-full'
							disabled={isLoading}>
							Generate
						</Button>
					</form>
				</Form>

				<div className='space-y-4 mt-4'>
					{isLoading && (
						<div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
							<Loader />
						</div>
					)}
					{!video && !isLoading && <Empty label='No video files generated.' />}
					{video && (
						<video
							controls
							className='w-full aspect-video mt-8 rounded-lg border bg-black'>
							<source src={video} />
						</video>
					)}
				</div>
			</div>
		</div>
	)
}
