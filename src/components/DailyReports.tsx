
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Plus, Search, Edit, Eye, Save, FileText, MapPin, Users, Clock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

const DailyReports = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const dailyReports = [
    {
      id: 1,
      date: '2024-06-14',
      activities: [
        'Visited Village Khadkala for student recruitment',
        'Conducted meeting with local Sarpanch about program awareness',
        'Followed up with 5 prospective students for Web Development course'
      ],
      meetings: [
        'Meeting with Village Head at 10:00 AM',
        'Discussion with parents about course benefits at 2:00 PM'
      ],
      fieldVisits: [
        'Village Khadkala - Student enrollment drive',
        'Community Center - Program awareness session'
      ],
      challenges: [
        'Internet connectivity issues in remote areas',
        'Some parents hesitant about digital literacy programs'
      ],
      followUps: [
        'Schedule computer demonstration for hesitant parents',
        'Arrange mobile internet hotspot for remote training'
      ],
      notes: 'Good response from youth. Need to address connectivity concerns for successful program implementation.',
      totalHours: 8,
      studentsContacted: 15,
      newEnrollments: 3
    },
    {
      id: 2,
      date: '2024-06-13',
      activities: [
        'Monitored WD-B01 batch progress',
        'Reviewed attendance reports with teachers',
        'Conducted feedback session with Tally batch students'
      ],
      meetings: [
        'Weekly team meeting at 9:00 AM',
        'Teacher feedback session at 3:00 PM'
      ],
      fieldVisits: [
        'Training center - Batch monitoring',
        'Local NGO office - Coordination meeting'
      ],
      challenges: [
        'Low attendance in evening batches due to farming season',
        'Need for more practical assignments in coding course'
      ],
      followUps: [
        'Discuss flexible timing with evening batch students',
        'Coordinate with teachers for additional practical sessions'
      ],
      notes: 'Overall progress satisfactory. Evening batch timing needs adjustment.',
      totalHours: 7,
      studentsContacted: 32,
      newEnrollments: 1
    },
    {
      id: 3,
      date: '2024-06-12',
      activities: [
        'Prepared monthly progress report',
        'Conducted teacher training on new curriculum updates',
        'Visited dropout students for counseling'
      ],
      meetings: [
        'Monthly review meeting with Janhit Sanstha management',
        'Teacher training session on updated curriculum'
      ],
      fieldVisits: [
        'Student homes in Village Nimgaon - Dropout counseling'
      ],
      challenges: [
        'High dropout rate in advanced coding modules',
        'Need for remedial classes for struggling students'
      ],
      followUps: [
        'Design remedial classes for coding fundamentals',
        'Create mentorship program with senior students'
      ],
      notes: 'Dropout issue needs immediate attention. Consider peer mentoring approach.',
      totalHours: 9,
      studentsContacted: 8,
      newEnrollments: 0
    }
  ];

  const filteredReports = dailyReports.filter(report =>
    report.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.activities.some(activity => activity.toLowerCase().includes(searchTerm.toLowerCase())) ||
    report.challenges.some(challenge => challenge.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const AddReportForm = () => (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Report Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {format(selectedDate, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalHours">Total Working Hours</Label>
          <Input id="totalHours" type="number" placeholder="8" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="activities">Daily Activities *</Label>
        <Textarea 
          id="activities" 
          placeholder="List all activities performed today (one per line)"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="meetings">Meetings Attended</Label>
          <Textarea 
            id="meetings" 
            placeholder="List meetings with time and participants"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fieldVisits">Field Visits</Label>
          <Textarea 
            id="fieldVisits" 
            placeholder="List locations visited and purpose"
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="challenges">Challenges Faced</Label>
        <Textarea 
          id="challenges" 
          placeholder="Describe any challenges or issues encountered"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="followUps">Follow-up Actions Required</Label>
        <Textarea 
          id="followUps" 
          placeholder="List actions to be taken in upcoming days"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="studentsContacted">Students Contacted</Label>
          <Input id="studentsContacted" type="number" placeholder="0" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newEnrollments">New Enrollments</Label>
          <Input id="newEnrollments" type="number" placeholder="0" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea 
          id="notes" 
          placeholder="Any additional observations or remarks"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Report
        </Button>
      </div>
    </form>
  );

  const ReportDetails = ({ report }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Daily Work Report</h3>
          <p className="text-gray-600">{format(new Date(report.date), 'EEEE, MMMM d, yyyy')}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-sm">
            <Clock className="w-3 h-3 mr-1" />
            {report.totalHours} hours
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{report.studentsContacted}</p>
            <p className="text-sm text-gray-600">Students Contacted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">{report.newEnrollments}</p>
            <p className="text-sm text-gray-600">New Enrollments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-purple-600">{report.totalHours}</p>
            <p className="text-sm text-gray-600">Working Hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Daily Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {report.activities.map((activity, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{activity}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {report.meetings.map((meeting, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{meeting}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Field Visits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {report.fieldVisits.map((visit, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{visit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Challenges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {report.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{challenge}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Follow-up Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {report.followUps.map((followUp, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">{followUp}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">{report.notes}</p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Daily Work Reports</h2>
          <p className="text-gray-600">Track daily activities and progress</p>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Today's Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Daily Work Report</DialogTitle>
              <DialogDescription>
                Record your daily activities, meetings, and observations.
              </DialogDescription>
            </DialogHeader>
            <AddReportForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reports by activities, challenges, or notes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{format(new Date(report.date), 'EEEE, MMMM d, yyyy')}</h3>
                  <p className="text-sm text-gray-600">Daily Work Report</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {report.totalHours}h
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    {report.studentsContacted} contacted
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {report.newEnrollments} new enrollments
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-sm text-gray-600">Key Activities</Label>
                  <p className="text-sm font-medium">{report.activities.length} activities completed</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Meetings</Label>
                  <p className="text-sm font-medium">{report.meetings.length} meetings attended</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Field Visits</Label>
                  <p className="text-sm font-medium">{report.fieldVisits.length} locations visited</p>
                </div>
              </div>

              {report.challenges.length > 0 && (
                <div className="mb-4">
                  <Label className="text-sm text-gray-600">Key Challenges</Label>
                  <p className="text-sm text-gray-700 mt-1">{report.challenges[0]}</p>
                  {report.challenges.length > 1 && (
                    <p className="text-xs text-gray-500">+{report.challenges.length - 1} more challenges</p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700 italic">"{report.notes.substring(0, 100)}..."</p>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Daily Work Report Details</DialogTitle>
                      </DialogHeader>
                      <ReportDetails report={report} />
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">Start by adding your first daily work report.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DailyReports;
