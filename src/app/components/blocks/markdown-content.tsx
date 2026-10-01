export const MarkdownContent = ({ html }: { html: string }) => (
  <div
    className="prose max-w-none prose-tokens prose-code:before:content-none prose-code:after:content-none prose-pre:border [&_.contains-task-list]:list-none [&_.contains-task-list]:pl-0 [&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-normal **:[[align=center]]:text-center **:[[align=right]]:text-right"
    // The HTML is compiled at build time from our own content, with raw HTML disabled
    dangerouslySetInnerHTML={{ __html: html }}
  />
)
