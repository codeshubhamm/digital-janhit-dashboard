
import { Button } from '@/components/ui/button';
import { Plus, Clock, FileText, Download } from 'lucide-react';

interface QuickActionButtonsProps {
  onAction: (action: string) => void;
}

const QuickActionButtons = ({ onAction }: QuickActionButtonsProps) => {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onAction('students')}
        className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Student
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onAction('attendance')}
        className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
      >
        <Clock className="w-4 h-4 mr-2" />
        Attendance
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onAction('reports')}
        className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
      >
        <FileText className="w-4 h-4 mr-2" />
        Daily Report
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onAction('export')}
        className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
      >
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>
    </div>
  );
};

export default QuickActionButtons;
