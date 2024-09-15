"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { onAddNoteLinkedToNote } from "@/actions/notes-linked-to-notes";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  noteId: string;
};

export default function AddSimilarNote({ open, setOpen, noteId }: Props) {
  // kurallar
  const { toast } = useToast();

  const formSchema = z.object({
    comment: z
      .string()
      .min(1, { message: "Lütfen notunuzu giriniz" })
      .max(200, { message: "Notunuz 200 karakterden fazla olamaz" })
      
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
     const onAddSimilarNote =  await onAddNoteLinkedToNote({
      comment: values?.comment!,
      noteId: noteId
     })
    
     if(onAddSimilarNote?.status === 200) {
      toast({
        title: "Başarılı",
        description: onAddSimilarNote?.message,
      });

      form.reset();
      
     } else {
      toast({
        title: "Hata",
        description: onAddSimilarNote?.message,
      });
     }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Similar Note</DialogTitle>

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Input placeholder="Comment" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
