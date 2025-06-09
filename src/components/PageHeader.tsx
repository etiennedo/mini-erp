import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignOutButton } from '@/components/signout-button'

interface PageHeaderProps {
  title: string
  actionLabel: string
  actionHref: string
}

export default function PageHeader({ title, actionLabel, actionHref }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex gap-2">
        <Link href={actionHref}>
          <Button>{actionLabel}</Button>
        </Link>
        <SignOutButton />
      </div>
    </div>
  )
}
