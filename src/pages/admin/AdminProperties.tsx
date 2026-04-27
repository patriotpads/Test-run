import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PropertyList } from '@/components/admin/PropertyList';
import { PropertyForm } from '@/components/admin/PropertyForm';
import { useToast } from '@/hooks/use-toast';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function AdminProperties() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [propertyToDelete, setPropertyToDelete] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: properties, isLoading } = useQuery({
    queryKey: ['admin-properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          id, title, slug, location_city, location_state, location_country,
          price_per_night, bedrooms, bathrooms, max_guests,
          images, featured, details, property_highlights, status,
          property_amenities (
            amenities (
              id,
              name,
              icon,
              category
            )
          )
        `)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: async (updates: Array<{ id: string; display_order: number }>) => {
      // Update each property's display_order individually
      for (const update of updates) {
        const { error } = await supabase
          .from('properties')
          .update({ display_order: update.display_order })
          .eq('id', update.id);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      toast({
        title: 'Order updated',
        description: 'Property display order has been updated successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update property order.',
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (propertyId: string) => {
      const { error } = await supabase.from('properties').delete().eq('id', propertyId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'Property deleted',
        description: 'The property has been deleted successfully.',
      });
      setPropertyToDelete(null);
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete property.',
        variant: 'destructive',
      });
      setPropertyToDelete(null);
    },
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !properties) return;

    const items = Array.from(properties);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updates = items.map((item, index) => ({
      id: item.id,
      display_order: index,
    }));

    updateOrderMutation.mutate(updates);
  };

  const handleEdit = (property: any) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProperty(null);
  };

  const handleDelete = (property: any) => {
    setPropertyToDelete(property);
  };

  const confirmDelete = () => {
    if (propertyToDelete) {
      deleteMutation.mutate(propertyToDelete.id);
    }
  };

  const cancelDelete = () => {
    setPropertyToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vacation-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600">Manage your vacation rental properties</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Property
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <PropertyList 
          properties={properties || []} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </DragDropContext>

      {isFormOpen && (
        <PropertyForm
          property={editingProperty}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
            queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
          }}
        />
      )}

      {propertyToDelete && (
        <Dialog open onOpenChange={cancelDelete}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Property</DialogTitle>
            </DialogHeader>
            <div className="p-4 text-center space-y-4">
              <p>Are you sure you want to delete <span className="font-semibold">{propertyToDelete.title}</span>?</p>
              <div className="flex justify-center gap-4">
                <Button onClick={cancelDelete} variant="outline">
                  No
                </Button>
                <Button onClick={confirmDelete} variant="destructive">
                  {deleteMutation.isPending ? (
                    <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>Deleting...</span>
                  ) : (
                    'Yes, Delete'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
