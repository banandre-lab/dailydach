import { Card } from "@/components/ui/card"

interface PostContentProps {
  html: string
  className?: string
}

type HtmlPart = { type: "text"; content: string } | { type: "figure"; content: string }

// Matches <figure>...</figure> or <p> containing only an <img>
const IMAGE_BLOCK_REGEX = /(<figure[\s\S]*?<\/figure>)|(<p[^>]*>\s*<img[^>]*>\s*<\/p>)/gi

function splitAtImageBlocks(html: string): HtmlPart[] {
  const parts: HtmlPart[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = IMAGE_BLOCK_REGEX.exec(html)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: html.slice(lastIndex, match.index) })
    }
    parts.push({ type: "figure", content: match[0] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < html.length) {
    parts.push({ type: "text", content: html.slice(lastIndex) })
  }

  return parts
}

function extractCaption(html: string): { imageHtml: string; captionHtml: string | null } {
  const captionMatch = html.match(/<figcaption[\s\S]*?<\/figcaption>/i)
  if (!captionMatch) return { imageHtml: html, captionHtml: null }

  const imageHtml = html.replace(captionMatch[0], "").trim()
  return { imageHtml, captionHtml: captionMatch[0] }
}

export function PostContent({ html, className }: PostContentProps) {
  const parts = splitAtImageBlocks(html)

  return (
    <div className={className}>
      {parts.map((part, i) => {
        if (part.type === "figure") {
          const { imageHtml, captionHtml } = extractCaption(part.content)
          return (
            <div key={i} className="my-10">
              <Card frame="full" className="post-figure gap-0 py-0 hover:translate-y-0">
                <div dangerouslySetInnerHTML={{ __html: imageHtml }} />
              </Card>
              {captionHtml && (
                <div
                  className="post-figure-caption"
                  dangerouslySetInnerHTML={{ __html: captionHtml }}
                />
              )}
            </div>
          )
        }
        return <div key={i} dangerouslySetInnerHTML={{ __html: part.content }} />
      })}
    </div>
  )
}
