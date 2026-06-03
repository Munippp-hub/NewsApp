export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-8 h-8 border-2 border-ink-600 border-t-accent-red rounded-full animate-spin" />
      <p className="text-ink-500 text-sm">{message}</p>
    </div>
  )
}
