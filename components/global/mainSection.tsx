'use client'

import ReactMarkdown from 'react-markdown'
import { usePageContent } from '@/hooks/usePageContent'

export function MainSection() {
  const content = usePageContent();
  
  return (
    <section className="container mx-auto px-4 py-8">
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  )
}
