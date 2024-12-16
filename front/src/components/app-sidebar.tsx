import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  HelpCircle,
  Home,
  Key,
  MessageSquare,
  Play,
  Settings,
} from 'lucide-react'
import { NavLink } from 'react-router'

const menuItems = [
  {
    label: 'Main',
    items: [
      {
        title: 'Home',
        icon: Home,
        path: '/',
        end: true,
      },
      {
        title: 'Video Analysis',
        icon: Play,
        path: '/analysis',
      },
      {
        title: 'Chat History',
        icon: MessageSquare,
        path: '/history',
      },
    ],
  },
  {
    label: 'Settings',
    items: [
      {
        title: 'API Keys',
        icon: Key,
        path: '/settings/keys',
      },
      {
        title: 'Preferences',
        icon: Settings,
        path: '/settings/preferences',
      },
      {
        title: 'Help',
        icon: HelpCircle,
        path: '/help',
      },
    ],
  },
]

const CustomTooltip = ({
  children,
  content,
}: {
  children: React.ReactNode
  content: string
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export const AppSidebar = () => {
  const { open } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-3 py-2">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="QueryTube"
            className={cn(open && 'size-10')}
          />
          {open && (
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold">QueryTube</span>
              <span className="text-xs text-muted-foreground">
                AI Video Analysis
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <CustomTooltip content={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.path}
                          end={item.end}
                          className={({ isActive }) =>
                            cn(
                              'w-full flex items-center gap-2 px-3 py-2',
                              isActive && 'text-primary font-medium'
                            )
                          }
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </CustomTooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <div
          className={cn('flex', {
            'justify-center': !open,
            'justify-end': open,
          })}
        >
          <CustomTooltip content={open ? 'Collapse sidebar' : 'Expand sidebar'}>
            <SidebarTrigger />
          </CustomTooltip>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
