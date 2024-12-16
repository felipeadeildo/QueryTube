import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const sourceFormSchema = z.object({
  url: z
    .string()
    .url()
    .refine((url) => {
      try {
        const urlObj = new URL(url)
        return (
          urlObj.hostname.includes('youtube.com') ||
          urlObj.hostname.includes('youtu.be')
        )
      } catch {
        return false
      }
    }, 'URL must be from YouTube'),
})

type SourceFormValues = z.infer<typeof sourceFormSchema>

export function SourceForm() {
  const form = useForm<SourceFormValues>({
    resolver: zodResolver(sourceFormSchema),
    defaultValues: {
      url: '',
    },
  })

  function onSubmit(values: SourceFormValues) {
    // TODO: Implement submission logic
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-4"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter YouTube URL"
                    {...field}
                    className="flex-1"
                  />
                  <Button type="submit">Analyze</Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
