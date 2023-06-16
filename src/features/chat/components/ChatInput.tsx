import React from 'react'

type ChatInputProps = {
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>
}

const ChatInput = React.forwardRef(({onKeyDown}:ChatInputProps, ref: React.LegacyRef<HTMLTextAreaElement>) => {
  return (
    <textarea className="bg-zinc-800 rounded w-full sm:h-24 ring-transparent focus:border-red-200 outline-none resize-none" ref={ref} onKeyDown={onKeyDown}/>
  )
})

export default ChatInput