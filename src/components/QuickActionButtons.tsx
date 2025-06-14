
import { Button } from '@/components/ui/button';
import { Plus, Calendar, FileText, Users, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickActionButtonsProps {
  onAction: (action: string) => void;
}

const QuickActionButtons = ({ onAction }: QuickActionButtonsProps) => {
  const { toast } = useToast();

  const quickActions = [
    {
      label: 'Add Student',
      icon: Plus,
      action: 'students',
      color: 'bg-green-500 hover:bg-green-600',
      tooltip: 'Quickly add a new student'
    },
    {
      label: 'Mark Attendance',
      icon: UserCheck,
      action: 'attendance',
      color: 'bg-blue-500 hover:bg-blue-600',
      tooltip: 'Mark today\'s attendance'
    },
    {
      label: 'Daily Report',
      icon: FileText,
      action: 'reports',
      color: 'bg-purple-500 hover:bg-purple-600',
      tooltip: 'Add daily work report'
    }
  ];

  const handleQuickAction = (action: string, label: string) => {
    onAction(action);
    toast({
      title: "Quick Action",
      description: `Opening ${label} section`,
      duration: 2000,
    });
  };

  return (
    <div className="hidden md:flex items-center space-x-2">
      {quickActions.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.action}
            size="sm"
            onClick={() => handleQuickAction(item.action, item.label)}
            className={`${item.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
            title={item.tooltip}
          >
            <Icon className="w-4 h-4 mr-2" />
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};

export default QuickActionButtons;
