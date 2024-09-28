'use client'

import { useState } from 'react'
import { Tower } from './tower'
import { DeliveryWorkerInfo } from './delivery-worker-info'
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Item = {
  id: string
  name: string
  tower: number
}

export function DeliverySystem() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: 'Ocean', tower: 1 },
    { id: '2', name: 'Doritos', tower: 2 },
    { id: '3', name: 'Nes cafe', tower: 1 },
    { id: '4', name: 'Notebook', tower: 3 },
    { id: '5', name: 'Ball pen', tower: 2 },
  ])
  const [newItemName, setNewItemName] = useState('')
  const [selectedTower, setSelectedTower] = useState<number>(1)

  const towers = [1, 2, 3]

  const addItem = () => {
    if (newItemName.trim() === '') return
    const newItem: Item = {
      id: Math.random().toString(36).substr(2, 9),
      name: newItemName,
      tower: selectedTower,
    }
    setItems([...items, newItem])
    setNewItemName('')
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end gap-2">
        <div className="flex-grow">
          <label htmlFor="item-name" className="block text-sm font-medium text-gray-700 mb-1">
            Item Name
          </label>
          <Input
            id="item-name"
            type="text"
            placeholder="Enter item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="tower-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Tower
          </label>
          <Select value={selectedTower.toString()} onValueChange={(value) => setSelectedTower(Number(value))}>
            <SelectTrigger id="tower-select" className="w-[180px]">
              <SelectValue placeholder="Select a tower" />
            </SelectTrigger>
            <SelectContent>
              {towers.map((tower) => (
                <SelectItem key={tower} value={tower.toString()}>
                  Tower {tower}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={addItem} className="mt-2">
          Add Item
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        {towers.map((towerNumber) => (
          <Tower
            key={towerNumber}
            number={towerNumber}
            items={items.filter((item) => item.tower === towerNumber)}
          />
        ))}
      </div>
      <DeliveryWorkerInfo items={items} />
    </div>
  )
}