'use client'

type TowerProps = {
  number: number
  items: { id: string; name: string }[]
}

export function Tower({ number, items }: TowerProps) {
  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-semibold mb-2">Tower {number}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-1">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}