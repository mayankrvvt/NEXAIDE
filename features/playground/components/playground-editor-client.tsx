"use client";
import React, { useEffect, useMemo, useState } from 'react'
import { PlaygroundEditor } from './playground-editor'
import type { TemplateFile, TemplateFolder } from '@/features/playground/libs/path-to-json'

type FileSystemItem = TemplateFile | TemplateFolder

interface PlaygroundEditorClientProps {
  templateData: FileSystemItem
}

const PlaygroundEditorClient: React.FC<PlaygroundEditorClientProps> = ({ templateData }) => {
  const activeFile = useMemo(() => findFirstFile(templateData), [templateData])
  const [content, setContent] = useState(activeFile?.content || "")

  useEffect(() => {
    setContent(activeFile?.content || "")
  }, [activeFile])

  return (
    <div className="h-screen">
      <PlaygroundEditor 
        activeFile={activeFile}
        content={content}
        onContentChange={setContent}
        suggestion={null}
        suggestionLoading={false}
        suggestionPosition={null}
        onAcceptSuggestion={() => {}}
        onRejectSuggestion={() => {}}
        onTriggerSuggestion={() => {}}
      />
    </div>
  )
}

function findFirstFile(item: FileSystemItem): TemplateFile | undefined {
  if ("filename" in item) return item

  for (const child of item.items) {
    const file = findFirstFile(child)
    if (file) return file
  }

  return undefined
}

export default PlaygroundEditorClient
