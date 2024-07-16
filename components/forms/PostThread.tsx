"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from "@/components/ui/textarea";

import { useOrganization } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

import Image from "next/image";

interface PostThreadProps {
	userId: string;
	image: string;
}


function PostThread({ userId, image }: PostThreadProps) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const { organization } = useOrganization();

	const form = useForm({
		resolver: zodResolver(ThreadValidation),
		defaultValues: {
			thread: '',
            accountId: userId,
		}
	})

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
				setLoading(true);
        await createThread({
            text: values.thread,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname
        });

        router.push("/")
    }

    return (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="mt-10 flex flex-col justify-start gap-10">
							<FormField
								control={form.control}
								name="thread"
								render={({ field }) => (
								<FormItem className="flex gap-3 md:gap-6 w-full">
									<div className="relative w-10 h-10 md:h-20 md:w-20 aspect-square">
										<Image
										src={image}
										alt="profile"
										width={96}
										height={96}
										priority
										className="rounded-full object-cover aspect-square"
										/>
									</div>
									<FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
									<Textarea
									rows={15}
									{...field}
									/>
									</FormControl>
									<FormMessage/>
								</FormItem>
								)}
							/>

            <Button 
            type="submit"
						disabled={loading}
            className="bg-purple-500">{loading ? `Posting Thread...` : `Post Thread`}</Button>
            </form>
        </Form>
    )
}

export default PostThread;