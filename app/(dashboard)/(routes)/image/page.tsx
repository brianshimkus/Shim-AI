'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'

import Heading from '@/components/heading'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { amountOptions, formSchema, resolutionOptions } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default function ImagePage() {
	const router = useRouter()
	const [images, setImages] = useState<string[]>([])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
			amount: '1',
			resolution: '512x512',
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setImages([])

			const res = await axios.post('/api/image', values)

			const urls = res.data.map((image: { url: string }) => image.url)

			setImages(urls)
			form.reset()
		} catch (err: any) {
			console.log(err)
		} finally {
			router.refresh()
		}
	}

	return (
		<div>
			<Heading
				title='Image Generation'
				description='Text to image.'
				icon={ImageIcon}
				iconColor='text-pink-500'
				bgColor='bg-pink-500/10'
			/>
			<div className='px-4 lg:px-8'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            '>
						<FormField
							name='prompt'
							render={({ field }) => (
								<FormItem className='col-span-12 lg:col-span-6'>
									<FormControl className='m-0 p-0'>
										<Input
											className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
											disabled={isLoading}
											placeholder='Describe an image to generate'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='amount'
							render={({ field }) => (
								<FormItem className='col-span-12 lg:col-span-2'>
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue defaultValue={field.value} />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{amountOptions.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='resolution'
							render={({ field }) => (
								<FormItem className='col-span-12 lg:col-span-2'>
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue defaultValue={field.value} />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{resolutionOptions.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<Button
							className='col-span-12 lg:col-span-2 w-full'
							type='submit'
							disabled={isLoading}
							size='icon'>
							Generate
						</Button>
					</form>
				</Form>

				<div className='space-y-4 mt-4'>
					{isLoading && (
						<div className='p-20'>
							<Loader />
						</div>
					)}
					{images.length === 0 && !isLoading && (
						<Empty label='No images generated.' />
					)}
					<div>Images rendered here</div>
				</div>
			</div>
		</div>
	)
}
