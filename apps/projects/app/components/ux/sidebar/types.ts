// types.ts
export interface MenuItem {
    icon: React.ElementType;
    label: string;
    path?: string;
  }
  
  export interface SidebarMenuProps {
    username?: string;
  }