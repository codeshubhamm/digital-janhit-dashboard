
import { Button } from '@/components/ui/button';
import { Plus, Clock, FileText, Download, Sparkles } from 'lucide-react';

interface QuickActionButtonsProps {
  onAction: (action: string) => void;
}

const QuickActionButtons = ({ onAction }: QuickActionButtonsProps) => {
  const actions = [
    {
      id: 'students',
      label: 'Add Student',
      icon: Plus,
      bgColor: 'bg-green-50 hover:bg-green-100',
      borderColor: 'border-green-200 hover:border-green-300',
      textColor: 'text-green-700 hover:text-green-800',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: Clock,
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      borderColor: 'border-blue-200 hover:border-blue-300',
      textColor: 'text-blue-700 hover:text-blue-800',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'reports',
      label: 'Daily Report',
      icon: FileText,
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      borderColor: 'border-purple-200 hover:border-purple-300',
      textColor: 'text-purple-700 hover:text-purple-800',
      gradient: 'from-purple-400 to-violet-500'
    },
    {
      id: 'export',
      label: 'Export',
      icon: Download,
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      borderColor: 'border-orange-200 hover:border-orange-300',
      textColor: 'text-orange-700 hover:text-orange-800',
      gradient: 'from-orange-400 to-amber-500'
    }
  ];

  return (
    <div className="hidden md:flex items-center space-x-2">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Button 
            key={action.id}
            variant="outline" 
            size="sm"
            onClick={() => onAction(action.id)}
            className={`${action.bgColor} ${action.borderColor} ${action.textColor} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1 group relative overflow-hidden`}
            style={{ animationDelay: `${index * 75}ms` }}
          >
            {/* Animated background gradient on hover */}
            <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            <div className="relative z-10 flex items-center space-x-2">
              <Icon className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-200" />
              <span className="font-medium">{action.label}</span>
            </div>
            
            {/* Sparkle effect on hover */}
            <Sparkles className="absolute top-1 right-1 w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 text-yellow-400" />
          </Button>
        );
      })}
    </div>
  );
};

export default QuickActionButtons;
