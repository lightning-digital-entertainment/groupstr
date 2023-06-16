import React, { memo } from 'react'

type ButtonProps = {
  title: string,
  backGroundColor: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button = memo(({title, backGroundColor, onClick}:ButtonProps) => {
  return (
    <button onClick={onClick} className={`bg-${backGroundColor} py-1 px-2 rounded`}>{title}</button>
  )
});

export default Button