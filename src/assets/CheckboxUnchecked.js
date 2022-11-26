import * as React from "react"

const CheckboxUnchecked = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={1} y={1} width={22} height={22} rx={5} fill="url(#a)" />
    <rect
      x={1}
      y={1}
      width={22}
      height={22}
      rx={5}
      stroke="#DADADA"
      strokeWidth={2}
    />
    <defs>
      <linearGradient
        id="a"
        x1={12}
        y1={0}
        x2={12}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FCFCFC" />
        <stop offset={1} stopColor="#F8F8F8" />
      </linearGradient>
    </defs>
  </svg>
)

export default CheckboxUnchecked
