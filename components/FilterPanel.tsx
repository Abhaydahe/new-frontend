"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterPanelProps {
  title?: string;
  categories?: FilterOption[];
  jobTypes?: FilterOption[];
  experienceLevels?: FilterOption[];
  budgetTypes?: FilterOption[];
  onFilterChange?: (filters: any) => void;
  onClear?: () => void;
  className?: string;
}

export function FilterPanel({
  title = "Filters",
  categories = [],
  jobTypes = [],
  experienceLevels = [],
  budgetTypes = [],
  onFilterChange,
  onClear,
  className = ""
}: FilterPanelProps) {
  return (
    <Card className={`sticky top-4 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-[#00ADB5]"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-[#222831]">Category</h3>
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox id={category.value} />
                <Label
                  htmlFor={category.value}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        )}

        {jobTypes.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-[#222831]">Job Type</h3>
            {jobTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox id={type.value} />
                <Label
                  htmlFor={type.value}
                  className="text-sm font-normal cursor-pointer"
                >
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        )}

        {experienceLevels.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-[#222831]">Experience Level</h3>
            {experienceLevels.map((level) => (
              <div key={level.value} className="flex items-center space-x-2">
                <Checkbox id={level.value} />
                <Label
                  htmlFor={level.value}
                  className="text-sm font-normal cursor-pointer"
                >
                  {level.label}
                </Label>
              </div>
            ))}
          </div>
        )}

        {budgetTypes.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-[#222831]">Budget Type</h3>
            {budgetTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox id={type.value} />
                <Label
                  htmlFor={type.value}
                  className="text-sm font-normal cursor-pointer"
                >
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-[#222831]">Salary Range (₹L/year)</h3>
          <Slider
            defaultValue={[0, 100]}
            max={100}
            step={5}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>0L</span>
            <span>100L+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
