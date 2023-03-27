import { useMemo, useState } from "react"

const DropdownItem: React.FC<React.HTMLAttributes<HTMLLIElement>> = ({
  ...props
}) => {
  const [isHovering, setIsHovering] = useState(false)
  
  const className = useMemo(() => {
    let classNameArray = [
      "group",
      "relative",
      "flex",
      "h-[42px]",
      "cursor-pointer",
      "select-none",
      "items-center",
      "overflow-hidden",
      "border-b",
      "border-black/10",
      "pl-3",
      "pr-9",
      "last:border-0",
      "dark:border-white/20",
      "text-gray-900"
    ]
    if (isHovering) {
      classNameArray.push("bg-gray-100", "dark:bg-gray-700")
    }
    return classNameArray.join(" ")
  }, [isHovering])

  return (
    <li
      {...props}
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    />
  )
}

export interface ExportDropdownProps {
  exportTypes: readonly string[]
  onExport: (type: string) => void
}
export const ExportDropdown: React.FC<ExportDropdownProps> = ({
  exportTypes,
  onExport
}) => {
  return (
    <ul
      className="rounded bg-white ring-1 ring-black/10 dark:bg-gray-800 dark:ring-white/20 absolute z-10 max-h-60 w-full overflow-auto text-base focus:outline-none dark:last:border-0 sm:text-xs md:w-[100%] left-0 right-0"
      style={{ bottom: "calc(100% + 1px)" }}>
      {exportTypes.map((format) => (
        <DropdownItem key={format} onClick={() => onExport(format)}>
          {format}
        </DropdownItem>
      ))}
    </ul>
  )
}
