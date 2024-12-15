export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">QueryTube</h1>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
      </div>
      <p className="mt-4 text-gray-600">Em desenvolvimento...</p>
    </div>
  )
}
