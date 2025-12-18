import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Customize heading styles to match your design
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-4 text-primary">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium mb-2">{children}</h3>
    ),
    p: ({ children }) => <p className="mb-4">{children}</p>,
    ul: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 marker:text-primary mb-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-4">{children}</ol>
    ),
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary hover:underline"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    hr: () => <hr className="my-8 border-white/10" />,
    ...components,
  };
}
