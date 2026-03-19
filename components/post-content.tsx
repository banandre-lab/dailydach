import { Card } from "@/components/ui/card"

interface PostContentProps {
  html: string
  className?: string
}

type HtmlPart = { type: "text"; content: string } | { type: "figure"; content: string }

// Matches <figure>...</figure> or <p> containing only an <img>
const IMAGE_BLOCK_REGEX = /(<figure[\s\S]*?<\/figure>)|(<p[^>]*>\s*<img[^>]*>\s*<\/p>)/gi
const STRUCTURED_LAYOUT_REGEX =
  /<aside\b|class="[^"]*\b(content-group|sidebar-image|blog-grid|article-section)\b[^"]*"|style="[^"]*display\s*:\s*(flex|grid)/i
const IMAGE_TAG_REGEX = /<img\b[^>]*\/?>/gi

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

function createInlineInkFrameSvg(index: number): string {
  const noiseSeed = (index % 97) + 3
  const baseX = (0.01 + (index % 5) * 0.0015).toFixed(4)
  const baseY = (0.018 + (index % 7) * 0.0016).toFixed(4)
  const scale = (1.6 + (index % 4) * 0.22).toFixed(2)
  const filterId = `inline-ink-filter-${index}`

  return `<svg aria-hidden="true" class="inline-ink-frame-svg" preserveAspectRatio="none" viewBox="0 0 100 100"><defs><filter id="${filterId}" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="132" width="132" x="-16" y="-16"><feTurbulence baseFrequency="${baseX} ${baseY}" numOctaves="2" result="noise" seed="${noiseSeed}" type="fractalNoise"></feTurbulence><feDisplacementMap in="SourceGraphic" in2="noise" scale="${scale}" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap></filter></defs><rect fill="none" filter="url(#${filterId})" height="96.4" rx="7.2" ry="7.2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.92" stroke-width="1.5" vector-effect="non-scaling-stroke" width="96.4" x="1.8" y="1.8"></rect></svg>`
}

function injectInlineImageFrames(html: string): string {
  let imageIndex = 0

  return html.replace(IMAGE_TAG_REGEX, (imageTag) => {
    if (imageTag.includes("inline-ink-frame")) {
      return imageTag
    }

    imageIndex += 1
    return `<span class="inline-ink-frame">${imageTag}${createInlineInkFrameSvg(imageIndex)}</span>`
  })
}

export function PostContent({ html, className }: PostContentProps) {
  // CMS-authored multi-column blocks rely on images remaining in-place.
  if (STRUCTURED_LAYOUT_REGEX.test(html)) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: injectInlineImageFrames(html) }} />
  }

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
