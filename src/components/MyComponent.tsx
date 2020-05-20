import loadable from '@loadable/component'
const CodeSnippet = loadable(() => import('./CodeSnippet'))

function MyComponent() {
  return (
    <div>
      <CodeSnippet />
    </div>
  )
}