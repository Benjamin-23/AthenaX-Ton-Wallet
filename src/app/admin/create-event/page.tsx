"use client";
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    description: "",
    image: "",
    ticketTypes: [{ name: "", price: "", available: "", description: "" }],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTicketTypeChange = (index, field, value) => {
    const updatedTicketTypes = [...formData.ticketTypes];
    updatedTicketTypes[index][field] = value;
    setFormData({
      ...formData,
      ticketTypes: updatedTicketTypes,
    });
  };

  const addTicketType = () => {
    setFormData({
      ...formData,
      ticketTypes: [
        ...formData.ticketTypes,
        { name: "", price: "", available: "", description: "" },
      ],
    });
  };

  const removeTicketType = (index) => {
    const updatedTicketTypes = [...formData.ticketTypes];
    updatedTicketTypes.splice(index, 1);
    setFormData({
      ...formData,
      ticketTypes: updatedTicketTypes,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // This would call an API that deploys the event contract on TON
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call

      toast({
        title: "Success",
        description: "Event created successfully",
      });

      // Reset form
      setFormData({
        title: "",
        date: "",
        venue: "",
        description: "",
        image: "",
        ticketTypes: [{ name: "", price: "", available: "", description: "" }],
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create event",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Event</h1>

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Ticket Types</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTicketType}
                >
                  Add Ticket Type
                </Button>
              </div>

              {formData.ticketTypes.map((ticketType, index) => (
                <div key={index} className="border rounded-md p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Ticket Type #{index + 1}</h4>
                    {formData.ticketTypes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTicketType(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={ticketType.name}
                        onChange={(e) =>
                          handleTicketTypeChange(index, "name", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Price (TON)</Label>
                      <Input
                        type="number"
                        value={ticketType.price}
                        onChange={(e) =>
                          handleTicketTypeChange(index, "price", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Available Tickets</Label>
                      <Input
                        type="number"
                        value={ticketType.available}
                        onChange={(e) =>
                          handleTicketTypeChange(
                            index,
                            "available",
                            e.target.value,
                          )
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={ticketType.description}
                      onChange={(e) =>
                        handleTicketTypeChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">
                Anti-Scalping Measures
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxTransfers">Max Transfers</Label>
                  <Input
                    id="maxTransfers"
                    name="maxTransfers"
                    type="number"
                    defaultValue={2}
                  />
                  <p className="text-xs text-gray-500">
                    Maximum number of times a ticket can be transferred
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimumHoldTime">
                    Minimum Hold Time (hours)
                  </Label>
                  <Input
                    id="minimumHoldTime"
                    name="minimumHoldTime"
                    type="number"
                    defaultValue={24}
                  />
                  <p className="text-xs text-gray-500">
                    Minimum time before a ticket can be resold
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxResellPrice">Max Resell Price (%)</Label>
                  <Input
                    id="maxResellPrice"
                    name="maxResellPrice"
                    type="number"
                    defaultValue={150}
                  />
                  <p className="text-xs text-gray-500">
                    Maximum resell price as percentage of original price
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating Event..." : "Create Event"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
