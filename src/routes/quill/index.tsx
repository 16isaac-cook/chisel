import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/quill/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/quill/"!</div>
}
