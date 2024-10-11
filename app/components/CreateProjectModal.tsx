"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CreateProjectModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [goalTiers, setGoalTiers] = useState(1)
  const [tiers, setTiers] = useState<Array<{ amount: string; description: string; image: File | null }>>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleTierImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newTiers = [...tiers]
      newTiers[index].image = e.target.files[0]
      setTiers(newTiers)
    }
  }

  const handleNextStep = () => {
    if (step === 1) {
      setTiers(Array(goalTiers).fill({ amount: '', description: '', image: null }))
    }
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle project creation logic here
    console.log('Create project:', { title, description, image, tiers })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create New Project - Step {step}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter project title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Project Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goalTiers">Number of Goal Tiers (1-7)</Label>
                  <Select onValueChange={(value) => setGoalTiers(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of tiers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {tiers.map((tier, index) => (
                  <div key={index} className="space-y-2 border p-4 rounded">
                    <Label>Goal Tier {index + 1}</Label>
                    <Input
                      placeholder={`Goal amount for tier ${index + 1}`}
                      value={tier.amount}
                      onChange={(e) => {
                        const newTiers = [...tiers]
                        newTiers[index].amount = e.target.value
                        setTiers(newTiers)
                      }}
                      required
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleTierImageUpload(index, e)}
                      required
                    />
                    <Textarea
                      placeholder={`Description for tier ${index + 1}`}
                      value={tier.description}
                      onChange={(e) => {
                        const newTiers = [...tiers]
                        newTiers[index].description = e.target.value
                        setTiers(newTiers)
                      }}
                      required
                    />
                  </div>
                ))}
              </div>
            )}
          </form>
        </ScrollArea>
        <div className="flex justify-between pt-4">
          {step > 1 && (
            <Button type="button" onClick={handlePrevStep}>
              Previous
            </Button>
          )}
          {step < 2 ? (
            <Button type="button" onClick={handleNextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" onClick={handleSubmit}>Create Project</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}