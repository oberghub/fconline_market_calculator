import React from 'react'

type Props = {
  enabled: boolean
  onToggle: () => void
  width?: number
}

const ToggleButton: React.FC<Props> = ({ enabled, onToggle, width = 32 }) => {
  return (
    <div
      onClick={onToggle}
      style={{
        width: width,
        height: width / 2,
      }}
      className={`relative flex ${enabled ? 'bg-green-300' : 'bg-gray-200'} p-[2px] rounded-[35px] cursor-pointer transition-all duration-700`}>
      <div
        className={`w-[45%] h-full bg-white rounded-full ${!enabled ? 'translate-x-0' : `translate-x-[120%]`} transition-all duration-300`}
      />
    </div>
  )
}

export default ToggleButton