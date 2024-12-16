import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'
import { AppSidebar } from './app-sidebar'

export function RootLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 py-1 px-2 w-full overflow-y-auto">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  )
}
