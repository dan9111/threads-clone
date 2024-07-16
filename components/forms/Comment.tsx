"use client"

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
import { Input } from "@/components/ui/input";

import { usePathname, useRouter } from "next/navigation";

import { updateUser } from "@/lib/actions/user.actions";
import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import { useState } from "react";
import { set } from "mongoose";
// import { createThread } from "@/lib/actions/thread.actions";

interface CommentProps {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({
    threadId,
    currentUserImg,
    currentUserId
}: CommentProps) => {
    const router = useRouter();
	const pathname = usePathname();

    const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(CommentValidation),
		defaultValues: {
			thread: '',
		}
	})

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        setIsLoading(true);
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);

        form.reset();
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="comment-form">
                <FormField
				control={form.control}
				name="thread"
				render={({ field }) => (
					<FormItem className="flex items-center gap-3 w-full">
						<FormLabel>
							<Image
                            src={currentUserImg}
                            alt="Profile Image"
                            width={48}
                            height={48}
                            className="rounded-full object-cover aspect-square"
                            />
						</FormLabel>
						<FormControl className="border-none bg-transparent">
							<Input
							placeholder="Comment..."
                            className="no-focus text-light-1 outline-none"
							{...field}
							 />
						</FormControl>
					</FormItem>
				)}
			/>

            <Button 
            type="submit"
            disabled={isLoading}
            className="comment-form_btn">{isLoading ? <p>Replying...</p> : <p>Reply</p>}</Button>
            </form>
        </Form>
    )
}

export default Comment;