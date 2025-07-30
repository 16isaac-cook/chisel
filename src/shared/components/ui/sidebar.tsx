export function Sidebar({
  children,
  collapsed,
  setCollapsed,
}: {
  children?: React.ReactNode;
  collapsed: boolean;
  setCollapsed: () => void;
}) {
  return <div>{children}</div>;
}
