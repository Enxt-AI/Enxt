import {
  Bell,
  BookOpen,
  Bot,
  Briefcase,
  Command,
  Film,
  Frame,
  Handshake,
  Image,
  Images,
  LifeBuoy,
  Map,
  MessageSquare,
  MoreHorizontal,
  Phone,
  PieChart,
  Settings,
  Share2,
  Sparkles,
  SquareTerminal,
  Users,
} from "lucide-react";

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
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  { title: "Dashboard", url: "/", icon: PieChart },
  { title: "AI Filmmaking", url: "/ai-filmmaking", icon: Film },
  { title: "Blogs", url: "/blogs", icon: BookOpen },
  { title: "Careers", url: "/careers", icon: Briefcase },
  { title: "Contact Info", url: "/contact-info", icon: Phone },
  { title: "Gallery", url: "/gallery", icon: Image },
  { title: "Hero Images", url: "/hero-images", icon: Images },
  { title: "Mentors", url: "/mentors", icon: Users },
  { title: "Partners", url: "/partners", icon: Handshake },
  { title: "Socials", url: "/socials", icon: Share2 },
  { title: "Team", url: "/team", icon: Sparkles },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="z-20">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <img
                  src="/logo.png"
                  className="rounded-sm"
                  alt="Logo"
                  width={32}
                  height={32}
                />

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Enxt-AI</span>
                  <span className="truncate text-xs">Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
