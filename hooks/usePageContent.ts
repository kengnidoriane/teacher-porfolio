import { usePathname } from 'next/navigation';
import dataMdJson from '@/data/dataMd.json';

interface PageContent {
  [key: string]: { content: string };
}

export function usePageContent() {
  const pathname = usePathname();
  const pageName = pathname.split('/').filter(Boolean).pop() ?? 'home';
  const pageContent = (dataMdJson as unknown as PageContent)[pageName]?.content || '';
  
  return pageContent;
}