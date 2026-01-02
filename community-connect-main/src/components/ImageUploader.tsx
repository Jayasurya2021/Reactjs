import React, { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange, className }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    onChange(null);
    setPreview(null);
  }, [onChange]);

  if (preview) {
    return (
      <div className={cn('relative overflow-hidden rounded-lg', className)}>
        <img src={preview} alt="Preview" className="h-48 w-full object-cover" />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8"
          onClick={handleRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition-colors',
        isDragging 
          ? 'border-primary bg-primary/5' 
          : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50',
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Upload className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">
          Drop an image here or click to upload
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
