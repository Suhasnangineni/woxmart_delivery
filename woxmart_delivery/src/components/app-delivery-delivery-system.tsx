'use client'

import { useState } from 'react'
import { Tower } from './tower'
import { DeliveryWorkerInfo } from './delivery-worker-info'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { PlusCircle } from 'lucide-react'

type Item = {
  id: string
  name: string
  tower: number
}

type Worker = {
  name: string
  collegeId: string
}

export function DeliverySystem() {
  const [items, setItems] = useState<Item[]>([])
  const [newItemName, setNewItemName] = useState('')
  const [selectedTower, setSelectedTower] = useState<number>(1)
  const [worker, setWorker] = useState<Worker>({ name: '', collegeId: '' })
  const [isReady, setIsReady] = useState(false)

  const towers = [1, 2, 3]

  const addItem = () => {
    if (newItemName.trim() === '') return
    const newItem: Item = {
      id: Math.random().toString(36).substr(2, 9),
      name: newItemName,
      tower: selectedTower,
    }
    setItems(prevItems => [...prevItems, newItem])
    setNewItemName('')
  }

  return (
    <div className="space-y-8">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
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
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {towers.map((towerNumber) => (
          <Tower
            key={towerNumber}
            number={towerNumber}
            items={items.filter((item) => item.tower === towerNumber)}
          />
        ))}
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Delivery Worker Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-grow">
              <label htmlFor="worker-name" className="block text-sm font-medium text-gray-700 mb-1">
                Worker Name
              </label>
              <Input
                id="worker-name"
                type="text"
                placeholder="Enter worker name"
                value={worker.name}
                onChange={(e) => setWorker(prev => ({ ...prev, name: e.target.value }))}
                className="w-full"
              />
            </div>
            <div className="flex-grow">
              <label htmlFor="worker-id" className="block text-sm font-medium text-gray-700 mb-1">
                College ID
              </label>
              <Input
                id="worker-id"
                type="text"
                placeholder="Enter college ID"
                value={worker.collegeId}
                onChange={(e) => setWorker(prev => ({ ...prev, collegeId: e.target.value }))}
                className="w-full"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Switch
              id="ready-to-deliver"
              checked={isReady}
              onCheckedChange={setIsReady}
            />
            <Label htmlFor="ready-to-deliver">Ready to deliver?</Label>
          </div>
        </CardContent>
      </Card>

      {isReady && <DeliveryWorkerInfo items={items} worker={worker} />}
    </div>
  )
}