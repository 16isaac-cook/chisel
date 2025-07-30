import React, { useState } from "react";

export function Layout({
  sidebar,
  children,
}: {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  function handleCollapse() {
    setCollapsed(!collapsed);
  }

  return (
    <Wrapper>
      <Header>
        <Title>My App</Title>
      </Header>
      <ContentWrapper>
        {sidebar && (
          <aside
            className={`transition-all duration-300 ease-in-out ${
              collapsed ? "w-0" : "w-64"
            } shrink-0 overflow-hidden border-r bg-gray-50`}
          >
            <div className="w-64">{sidebar}</div>
          </aside>
        )}
        <Content>{children}</Content>
      </ContentWrapper>
    </Wrapper>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen flex-col">{children}</div>;
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="h-16 w-full border-b bg-white px-4 shadow z-10 flex items-center justify-between">
      {children}
    </header>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return <h1 className="text-lg font-semibold">{children}</h1>;
}

function ContentWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 overflow-hidden">{children}</div>;
}

function Content({ children }: { children: React.ReactNode }) {
  return <main className="flex-1 overflow-y-auto p-4">{children}</main>;
}
