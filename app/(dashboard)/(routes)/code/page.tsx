'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CodeIcon } from 'lucide-react'
import { set, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import { ChatCompletionRequestMessage } from 'openai'
import ReactMarkdown from 'react-markdown'

import Heading from '@/components/heading'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import { cn } from '@/lib/utils'
import { UserAvatar } from '@/components/user-avatar'
import { BotAvatar } from '@/components/bot-avatar'

export default function CodePage() {
	const router = useRouter()
	const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessage: ChatCompletionRequestMessage = {
				role: 'user',
				content: values.prompt,
			}
			const newMessages = [...messages, userMessage]

			const res = await axios.post('/api/code', {
				messages: newMessages,
			})

			setMessages((current) => [...current, userMessage, res.data])

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
				title='Code Generation'
				description='Code model.'
				icon={CodeIcon}
				iconColor='text-green-500'
				bgColor='bg-green-500/10'
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
											placeholder='Request a code snippet'
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
					{messages.length === 0 && !isLoading && (
						<Empty label='No conversation started.' />
					)}
					<div className='flex flex-col-reverse gap-y-4'>
						{messages.map((message) => (
							<div
								key={message.content}
								className={cn(
									'p-8 w-full flex items-start gap-x-8 rounded-lg',
									message.role === 'user'
										? 'bg-white border border-black/10'
										: 'bg-muted'
								)}>
								{message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
								<ReactMarkdown
									components={{
										pre: ({ node, ...props }) => (
											<div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-md'>
												<pre {...props} />
											</div>
										),
										code: ({ node, ...props }) => (
											<code className='bg-black/10 rounded-md p-1' {...props} />
										),
									}}
									className='text-sm overflow-hidden leading-7'>
									{message.content || ''}
								</ReactMarkdown>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
