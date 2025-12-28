"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function FooterNewsletter () {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          categories: [] // Default to all if empty or handle as "all" in API
        })
      })

      if (!response.ok) throw new Error('Failed to subscribe')

      toast.success('Successfully subscribed!')
      setEmail('')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-3'>
      <Input
        type='email'
        placeholder='Enter your email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className='bg-white/10 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-primary focus-visible:border-primary'
      />
      <Button
        type='submit'
        disabled={isLoading || !email}
        className='bg-primary text-primary-foreground hover:bg-primary/90 font-semibold'
      >
        {isLoading ? (
          <Loader2 className='h-4 w-4 animate-spin' />
        ) : (
          'Subscribe'
        )}
      </Button>
    </form>
  )
}

