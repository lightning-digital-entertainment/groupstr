import React from 'react'
import { IoSend } from 'react-icons/io5'

type SendButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const SendButton = ({onClick}: SendButtonProps) => {
  return (
    <button className="flex justify-center items-center bg-zinc-800 rounded grow p-2 active:bg-zinc-700" onClick={onClick}>
      <IoSend />
    </button>
  )
}

export default SendButton