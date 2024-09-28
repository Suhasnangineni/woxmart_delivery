'use client'

type DeliveryWorkerInfoProps = {
  items: { id: string; name: string; tower: number }[]
}

export function DeliveryWorkerInfo({ items }: DeliveryWorkerInfoProps) {
  const towerCounts = items.reduce((acc, item) => {
    acc[item.tower] = (acc[item.tower] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  return (
    <div className="mt-8 border p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">Delivery Worker Information</h2>
      <ul>
        {Object.entries(towerCounts).map(([tower, count]) => (
          <li key={tower} className="mb-2">
            Tower {tower}: {count} item{count !== 1 ? 's' : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}