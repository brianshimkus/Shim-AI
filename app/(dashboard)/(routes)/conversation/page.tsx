'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageSquare } from 'lucide-react'
import { set, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import { ChatCompletionRequestMessage } from 'openai'

import Heading from '@/components/heading'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/empty'

export default function ConversationPage() {
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

			const res = await axios.post('/api/conversation', {
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
				title='Conversation'
				description='Conversation model.'
				icon={MessageSquare}
				iconColor='text-yellow-500'
				bgColor='bg-yellow-500/10'
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
											placeholder='Type a question'
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
			</div>
			<div className='space-y-4 mt-4'>
				{messages.length === 0 && !isLoading && (
					<Empty label='No conversation started.' />
				)}
				<div className='flex flex-col-reverse gap-y-4'>
					{messages.map((message) => (
						<div key={message.content}>{message.content}</div>
					))}
				</div>
			</div>
		</div>
	)
}
