import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Users, PhoneCall, FileText, CheckCircle, 
  XCircle, Settings, MessageSquare, Bell, Search, Menu, 
  TrendingUp, TrendingDown, Download, HelpCircle, X, ChevronRight,
  Filter, CreditCard, User, LogIn, FileClock, Wallet, Target,
  BookOpen, Layers, Briefcase, Plus, Send, Activity, ChevronDown,
  Building, PieChart, Calculator, Link, Mail, Phone, Trash2, Home,
  Eye, Edit, UserPlus, Calendar, Clock, ArrowRight, Check,
  Paperclip, MoreVertical, CheckSquare, UploadCloud, IndianRupee,
  Car, Shield, Sprout, Coins, GraduationCap, AlertCircle, Printer, 
  DownloadCloud, RefreshCcw
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';


// --- NAV CONFIGURATION ---
const navGroups = [
  {
    title: 'Primary Workflow',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
      { name: 'Enquiries', icon: HelpCircle, id: 'enquiries' },
      { name: 'Leads', icon: Target, id: 'leads' },
      { name: 'Callbacks', icon: PhoneCall, id: 'callbacks' },
      { name: 'Files', icon: FileText, id: 'files' },
      { name: 'Credit Eval', icon: CreditCard, id: 'credit' },
      { name: 'Logins', icon: LogIn, id: 'logins' },
      { name: 'In Process', icon: FileClock, id: 'inprocess' },
      { name: 'Sanctions', icon: CheckCircle, id: 'sanctions' },
      { name: 'Disbursals', icon: Wallet, id: 'disbursals' },
      { name: 'Rejects', icon: XCircle, id: 'rejects' },
    ]
  },
  {
    title: 'Management',
    items: [
      { name: 'Users', icon: Users, id: 'users' },
      { name: 'Lenders', icon: Building, id: 'lenders' },
      { name: 'Reports', icon: PieChart, id: 'reports' },
      { name: 'Accounting', icon: Calculator, id: 'accounting' },
    ]
  },
  {
    title: 'System',
    items: [
      { name: 'Integrations', icon: Link, id: 'integrations' },
      { name: 'Settings', icon: Settings, id: 'settings' },
      { name: 'Knowledge Hub', icon: BookOpen, id: 'knowledge' },
    ]
  }
];


// --- REUSABLE COMPONENTS ---
const Badge = ({ status }) => {
  const styles = {
    'New': 'bg-blue-100 text-blue-800 border-blue-200',
    'Pending': 'bg-amber-100 text-amber-800 border-amber-200',
    'Followup': 'bg-purple-100 text-purple-800 border-purple-200',
    'Converted': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Rejected': 'bg-red-100 text-red-800 border-red-200',
    'Completed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Missed': 'bg-red-100 text-red-800 border-red-200',
    'Rescheduled': 'bg-orange-100 text-orange-800 border-orange-200',
    'Paid': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Failed': 'bg-orange-100 text-orange-800 border-orange-200',
    'Approved': 'bg-blue-100 text-blue-800 border-blue-200',
  };
  const defaultStyle = 'bg-slate-100 text-slate-800 border-slate-200';
  const appliedStyle = styles[status] || defaultStyle;
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide border rounded-md ${appliedStyle}`}>
      {status}
    </span>
  );
};

const KPICard = ({ title, value, trend, isPositive, onClick, valuePrefix = "" }) => (
  <div 
    onClick={onClick}
    className="bg-white p-3 lg:p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer group flex flex-col justify-between h-full"
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider group-hover:text-indigo-600 transition-colors">{title}</h3>
      <div className={`flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded-md ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
        {isPositive ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
        {trend}
      </div>
    </div>
    <div className="text-xl font-black text-slate-800 tracking-tight mt-1 flex items-center">
      {valuePrefix && <span className="text-sm text-slate-400 mr-1">{valuePrefix}</span>}
      {value}
    </div>
  </div>
);


// --- ILLUSTRATED ICON COMPONENT (was missing) ---
const IllustratedIcon = ({ type }) => {
  const iconMap = {
    personal: <Coins size={22} className="text-indigo-500" />,
    business: <Briefcase size={22} className="text-blue-500" />,
    home: <Home size={22} className="text-emerald-500" />,
    lap: <Building size={22} className="text-purple-500" />,
    car: <Car size={22} className="text-orange-500" />,
    cv: <Shield size={22} className="text-teal-500" />,
    insurance: <Shield size={22} className="text-red-500" />,
  };
  return (
    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
      {iconMap[type] || <Coins size={22} className="text-slate-400" />}
    </div>
  );
};


// --- DASHBOARD VIEW COMPONENT (was missing) ---
const DashboardView = ({ enquiries, callbacks, onNavigate }) => {
  const [chartRange, setChartRange] = useState('12M');

  const getChartDataForRange = (range) => {
    const ranges = {
      '12M': [
        { name: 'Jan', Leads: 0, Sanctions: 0, Disbursals: 0 },
        { name: 'Feb', Leads: 0, Sanctions: 0, Disbursals: 0 },
        { name: 'Mar', Leads: 12, Sanctions: 4, Disbursals: 3 },
        { name: 'Apr', Leads: 22, Sanctions: 8, Disbursals: 6 },
        { name: 'May', Leads: enquiries.length, Sanctions: 0, Disbursals: 0 },
      ],
      '6M': [
        { name: 'Dec', Leads: 0, Sanctions: 0, Disbursals: 0 },
        { name: 'Jan', Leads: 0, Sanctions: 0, Disbursals: 0 },
        { name: 'Feb', Leads: 0, Sanctions: 0, Disbursals: 0 },
        { name: 'Mar', Leads: 12, Sanctions: 4, Disbursals: 3 },
        { name: 'Apr', Leads: 22, Sanctions: 8, Disbursals: 6 },
        { name: 'May', Leads: enquiries.length, Sanctions: 0, Disbursals: 0 },
      ],
      '1M': [
        { name: 'Week 1', Leads: Math.floor(enquiries.length * 0.2), Sanctions: 0, Disbursals: 0 },
        { name: 'Week 2', Leads: Math.floor(enquiries.length * 0.3), Sanctions: 0, Disbursals: 0 },
        { name: 'Week 3', Leads: Math.floor(enquiries.length * 0.2), Sanctions: 0, Disbursals: 0 },
        { name: 'Week 4', Leads: Math.floor(enquiries.length * 0.3), Sanctions: 0, Disbursals: 0 },
      ],
      '1W': [
        { name: 'Mon', Leads: 0, Sanctions: 0, Disbursals: 0 },
        { name: 'Tue', Leads: 0, Sanctions: 0, Disbursals: 0 },
        { name: 'Wed', Leads: 0, Sanctions: 0, Disbursals: 0 },
        { name: 'Thu', Leads: 0, Sanctions: 0, Disbursals: 0 },
        { name: 'Fri', Leads: 0, Sanctions: 0, Disbursals: 0 },
        { name: 'Sat', Leads: 0, Sanctions: 0, Disbursals: 0 },
        { name: 'Sun', Leads: 0, Sanctions: 0, Disbursals: 0 },
      ]
    };
    return ranges[range] || ranges['12M'];
  };


  return (
    <div className="p-4 lg:p-5 w-full animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-xs mt-1 font-medium">Welcome back! Here's your pipeline overview.</p>
        </div>
        <div className="flex gap-2">
          {['1W', '1M', '6M', '12M'].map(range => (
            <button 
              key={range} 
              onClick={() => setChartRange(range)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${chartRange === range ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <KPICard title="Total Enquiries" value={enquiries.length} trend="+0%" isPositive={true} onClick={() => onNavigate('enquiries')} />
        <KPICard title="Active Leads" value={enquiries.filter(e => e.status === 'New' || e.status === 'Followup').length} trend="Pipeline" isPositive={true} onClick={() => onNavigate('leads')} />
        <KPICard title="Pending Callbacks" value={callbacks.length} trend="Today" isPositive={callbacks.length === 0} onClick={() => onNavigate('callbacks')} />
        <KPICard title="Conversions" value={enquiries.filter(e => e.status === 'Converted').length} trend="This Month" isPositive={true} onClick={() => onNavigate('sanctions')} />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-5">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Pipeline Performance</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={getChartDataForRange(chartRange)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <RechartsTooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="Leads" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} strokeWidth={2} />
            <Area type="monotone" dataKey="Sanctions" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
            <Area type="monotone" dataKey="Disbursals" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>


      {/* Recent Enquiries */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-800">Recent Enquiries</h3>
          <button onClick={() => onNavigate('enquiries')} className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
        </div>
        {enquiries.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <HelpCircle size={32} className="mx-auto mb-2 text-slate-300" />
            <p className="text-xs font-medium">No enquiries yet. Create your first lead to get started.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {enquiries.slice(0, 5).map((enq) => (
              <div key={enq.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-xs font-bold">
                    {enq.name?.charAt(0) || 'N'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{enq.name}</p>
                    <p className="text-[10px] text-slate-500">{enq.loanType} • {enq.amount}</p>
                  </div>
                </div>
                <Badge status={enq.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


// --- CALLBACKS VIEW COMPONENT (was missing) ---
const CallbacksView = ({ callbacks, onAddCallback }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCallback, setNewCallback] = useState({
    customerName: '', phone: '', date: '', time: '', type: 'Call', notes: '', priority: 'Medium'
  });

  const handleSaveCallback = () => {
    if (!newCallback.customerName || !newCallback.phone || !newCallback.date) return;
    const cb = {
      id: `CB-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: newCallback.customerName,
      phone: newCallback.phone,
      date: newCallback.date,
      time: newCallback.time || '10:00 AM',
      type: newCallback.type,
      notes: newCallback.notes,
      priority: newCallback.priority,
      status: 'Pending',
      assignedTo: 'Naresh Goud',
    };
    onAddCallback(cb);
    setIsAddModalOpen(false);
    setNewCallback({ customerName: '', phone: '', date: '', time: '', type: 'Call', notes: '', priority: 'Medium' });
  };

  const filteredCallbacks = callbacks.filter(cb =>
    cb.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cb.phone.includes(searchTerm)
  );

  return (
    <div className="p-4 lg:p-5 w-full h-full animate-in fade-in duration-300 flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <PhoneCall size={24} className="text-indigo-600" /> Callbacks
          </h1>
          <p className="text-slate-500 text-xs mt-1 font-medium">Schedule and manage customer callback reminders.</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-[#2a2b72] hover:bg-[#1e1f52] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2">
          <Plus size={14} /> Schedule Callback
        </button>
      </div>


      {/* Search */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-2 items-center mb-4 shrink-0">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text" placeholder="Search callbacks..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:border-indigo-500 transition-all outline-none" 
          />
        </div>
        <select className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-1.5 outline-none">
          <option>All Statuses</option><option>Pending</option><option>Completed</option><option>Missed</option>
        </select>
        <select className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-1.5 outline-none">
          <option>All Priorities</option><option>High</option><option>Medium</option><option>Low</option>
        </select>
      </div>

      {/* Table */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full flex-1">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 sticky top-0 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCallbacks.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-16 text-center">
                    <PhoneCall size={32} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-sm font-semibold text-slate-600">No Callbacks Scheduled</p>
                    <p className="text-xs text-slate-400">Click "Schedule Callback" to create your first reminder.</p>
                  </td>
                </tr>
              ) : (
                filteredCallbacks.map((cb) => (
                  <tr key={cb.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3"><span className="font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">{cb.id}</span></td>
                    <td className="px-4 py-3 font-bold text-slate-800">{cb.customerName}</td>
                    <td className="px-4 py-3 font-medium">{cb.phone}</td>
                    <td className="px-4 py-3 font-medium">{cb.date}</td>
                    <td className="px-4 py-3 font-medium">{cb.time}</td>
                    <td className="px-4 py-3">{cb.type}</td>
                    <td className="px-4 py-3"><Badge status={cb.priority} /></td>
                    <td className="px-4 py-3"><Badge status={cb.status} /></td>
                    <td className="px-4 py-3 text-center">
                      <button className="text-emerald-600 hover:text-emerald-800 bg-emerald-50 p-1.5 rounded-md"><Check size={14} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* Add Callback Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-base font-black text-[#2a2b72] flex items-center gap-2"><PhoneCall size={18}/> Schedule Callback</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white border border-slate-200 p-1.5 rounded-lg"><X size={18}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Customer Name <span className="text-red-500">*</span></label>
                  <input type="text" value={newCallback.customerName} onChange={e => setNewCallback({...newCallback, customerName: e.target.value})} placeholder="Enter name" className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Phone <span className="text-red-500">*</span></label>
                  <input type="tel" value={newCallback.phone} onChange={e => setNewCallback({...newCallback, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Date <span className="text-red-500">*</span></label>
                  <input type="date" value={newCallback.date} onChange={e => setNewCallback({...newCallback, date: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Time</label>
                  <input type="time" value={newCallback.time} onChange={e => setNewCallback({...newCallback, time: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Type</label>
                  <select value={newCallback.type} onChange={e => setNewCallback({...newCallback, type: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] bg-white">
                    <option>Call</option><option>WhatsApp</option><option>Visit</option><option>Email</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Priority</label>
                  <select value={newCallback.priority} onChange={e => setNewCallback({...newCallback, priority: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] bg-white">
                    <option>High</option><option>Medium</option><option>Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Notes</label>
                <textarea value={newCallback.notes} onChange={e => setNewCallback({...newCallback, notes: e.target.value})} placeholder="Add remarks..." rows="2" className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] resize-none"></textarea>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50">Cancel</button>
              <button onClick={handleSaveCallback} className="px-6 py-2 text-white bg-[#2a2b72] hover:bg-[#1e1f52] rounded-lg text-xs font-bold shadow-md">Save Callback</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// --- CRM ASSISTANT CHATBOT ---
const CRMAssistant = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const initialMessages = [
    { text: "Hi! I'm your CRM Assistant. How can I help you accelerate your pipeline today?", isBot: true }
  ];
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { text, isBot: false }]);
    setInputText("");
    setTimeout(() => {
      let botResponse = "Let me guide you on that. I am redirecting your workspace screen now...";
      if (text.toLowerCase().includes("lead") || text.toLowerCase().includes("enquiry")) {
        botResponse = "Opening the Create Enquiry view for you! Select a loan type, then complete applicant details.";
        onNavigate('create-enquiry');
      } else if (text.toLowerCase().includes("document")) {
        botResponse = "Directing you to the Files workspace where you can upload and check document checklists.";
        onNavigate('files');
      } else if (text.toLowerCase().includes("ledger") || text.toLowerCase().includes("account")) {
        botResponse = "Redirecting you to the Ledger and Accounting module.";
        onNavigate('accounting');
      } else if (text.toLowerCase().includes("convert")) {
        botResponse = "Opening the Enquiries module. Click 'View' on any enquiry to convert it into a full lead.";
        onNavigate('enquiries');
      } else if (text.toLowerCase().includes("bank") || text.toLowerCase().includes("lender")) {
        botResponse = "Redirecting to your active Lenders space.";
        onNavigate('lenders');
      }
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  const clearChat = () => setMessages(initialMessages);
  const quickActions = ["Create a new lead", "Check Ledger", "Convert lead to file", "Track bank status"];


  return (
    <div className="fixed bottom-20 md:bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white w-72 sm:w-80 rounded-xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-3 text-white flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <Activity size={16} />
              </div>
              <div>
                <h4 className="font-bold text-xs tracking-wide">CRM AI Assistant</h4>
                <div className="flex items-center text-[10px] text-indigo-100 font-medium">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span> Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={clearChat} title="Clear Chat" className="text-white/70 hover:text-white transition-colors bg-white/10 p-1.5 rounded-md mr-1"><Trash2 size={14} /></button>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors bg-white/10 p-1.5 rounded-md"><X size={14} /></button>
            </div>
          </div>
          <div className="bg-slate-100 px-3 py-2 flex justify-around border-b border-slate-200 text-[10px] font-bold text-slate-500">
             <a href="https://wa.me/918179278882" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><MessageSquare size={12}/> WhatsApp</a>
             <a href="tel:+918179278882" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Phone size={12}/> Call</a>
             <a href="mailto:hello@myloancrm.com" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Mail size={12}/> Email</a>
          </div>
          <div className="h-56 p-3 overflow-y-auto bg-slate-50 flex flex-col gap-3 text-xs">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[85%] p-2.5 rounded-xl shadow-sm leading-relaxed ${msg.isBot ? 'bg-white border border-slate-200 text-slate-700 self-start rounded-tl-none' : 'bg-indigo-600 text-white self-end rounded-tr-none'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-2.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto scrollbar-hide">
             {quickActions.map((action, i) => (
               <button key={i} onClick={() => handleSend(action)} className="whitespace-nowrap px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-md text-[10px] font-bold hover:bg-indigo-600 hover:text-white transition-all">{action}</button>
             ))}
          </div>
          <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex gap-2">
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)} placeholder="Ask anything..." className="flex-1 text-xs outline-none px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm" />
            <button onClick={() => handleSend(inputText)} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center"><Send size={16} /></button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group relative">
          <MessageSquare size={20} className="group-hover:animate-bounce" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
        </button>
      )}
    </div>
  );
};


// --- LEDGER / ACCOUNTING MODULE ---
const LedgerView = ({ entries, setEntries }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newEntry, setNewEntry] = useState({
    type: 'Credit', date: '', amount: '', gst: '', tds: '', paymentMode: '',
    customer: '', leadId: '', fileNo: '', lender: '', refNo: '', notes: '', status: 'Pending'
  });

  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    const gstVal = val * 0.18;
    const tdsVal = val * 0.05;
    setNewEntry(prev => ({
      ...prev, amount: e.target.value, gst: gstVal.toFixed(2), tds: tdsVal.toFixed(2)
    }));
  };

  const handleSaveEntry = () => {
    if(!newEntry.amount || !newEntry.date || !newEntry.type || !newEntry.paymentMode) return;
    const amt = parseFloat(newEntry.amount) || 0;
    const gst = parseFloat(newEntry.gst) || 0;
    const tds = parseFloat(newEntry.tds) || 0;
    const net = amt + gst - tds;
    const entryToSave = {
      id: `LED${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}${Math.floor(1000 + Math.random() * 9000)}`,
      date: newEntry.date, type: newEntry.type,
      customer: newEntry.customer || 'N/A', leadId: newEntry.leadId || 'N/A',
      fileNo: newEntry.fileNo || 'N/A', lender: newEntry.lender || 'N/A',
      amount: amt, gst: gst, tds: tds, net: net,
      mode: newEntry.paymentMode, status: newEntry.status,
      createdBy: 'Naresh Goud', notes: newEntry.notes
    };
    setEntries([entryToSave, ...entries]);
    setIsAddModalOpen(false);
    setNewEntry({ type: 'Credit', date: '', amount: '', gst: '', tds: '', paymentMode: '', customer: '', leadId: '', fileNo: '', lender: '', refNo: '', notes: '', status: 'Pending' });
  };

  const toggleSelect = (id) => {
    if(selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const totalCredit = entries.filter(e => e.type === 'Credit' || e.type === 'Commission').reduce((sum, e) => sum + e.net, 0);
  const totalDebit = entries.filter(e => e.type === 'Debit' || e.type === 'Expense' || e.type === 'Refund').reduce((sum, e) => sum + e.net, 0);
  const pendingAmount = entries.filter(e => e.status === 'Pending').reduce((sum, e) => sum + e.net, 0);
  const netProfit = totalCredit - totalDebit;

  const filteredEntries = entries.filter(enq => 
    enq.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.lender.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="p-4 lg:p-5 w-full h-full animate-in fade-in duration-300 flex flex-col bg-[#F8FAFC]">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Calculator size={24} className="text-indigo-600" /> Ledger Accounts
            </h1>
            <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Finance Module</span>
          </div>
          <p className="text-slate-500 text-xs font-medium">Dashboard &gt; Accounting &gt; Ledger</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
          <button onClick={() => setIsAddModalOpen(true)} className="bg-[#2a2b72] hover:bg-[#1e1f52] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2">
            <Plus size={14} /> Add Entry
          </button>
          <div className="w-px h-6 bg-slate-300 mx-1 hidden sm:block"></div>
          <button className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm"><DownloadCloud size={14} className="text-emerald-600" /> Excel</button>
          <button className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm"><FileText size={14} className="text-red-500" /> PDF</button>
          <button className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm"><Printer size={14} className="text-slate-500" /> Print</button>
          <button className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm"><RefreshCcw size={14} className="text-blue-500" /> Refresh</button>
          <button className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm"><Filter size={14} /> Filter</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 shrink-0">
        <KPICard title="Total Credit" valuePrefix="₹" value={totalCredit.toLocaleString('en-IN')} trend="Incoming" isPositive={true} />
        <KPICard title="Total Debit" valuePrefix="₹" value={totalDebit.toLocaleString('en-IN')} trend="Outgoing" isPositive={false} />
        <KPICard title="Pending Amount" valuePrefix="₹" value={pendingAmount.toLocaleString('en-IN')} trend="Unsettled" isPositive={false} />
        <div className="bg-gradient-to-br from-[#2a2b72] to-indigo-900 p-4 rounded-xl shadow-md text-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-indigo-200 text-[10px] font-bold uppercase tracking-wider">Net Profit</h3>
            <Activity size={14} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-black tracking-tight mt-1">₹{netProfit.toLocaleString('en-IN')}</div>
        </div>
      </div>


      {/* Search & Filters */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center mb-4 shrink-0">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input type="text" placeholder="Search Trans ID, Customer, Lender..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:border-[#2a2b72] focus:ring-1 focus:ring-[#2a2b72] transition-all outline-none" />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide pb-1 md:pb-0">
          <input type="date" className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-2 outline-none text-slate-600 focus:border-[#2a2b72]" title="From Date" />
          <span className="text-slate-400 text-xs">-</span>
          <input type="date" className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-2 outline-none text-slate-600 focus:border-[#2a2b72]" title="To Date" />
          <select className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-[#2a2b72] text-slate-700 font-medium">
            <option>Entry Type (All)</option><option>Credit</option><option>Debit</option><option>Commission</option><option>Expense</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-[#2a2b72] text-slate-700 font-medium">
            <option>Status (All)</option><option>Paid</option><option>Pending</option><option>Failed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {selectedIds.length > 0 && (
          <div className="bg-indigo-50 px-4 py-2 border-b border-indigo-100 flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-800">{selectedIds.length} Transactions Selected</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded text-[10px] font-bold shadow-sm">Export Selected</button>
              <button className="px-3 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold shadow-sm">Approve Selected</button>
              <button className="px-3 py-1 bg-red-500 text-white rounded text-[10px] font-bold shadow-sm flex items-center gap-1"><Trash2 size={12}/> Delete</button>
            </div>
          </div>
        )}
        <div className="overflow-x-auto w-full flex-1">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 sticky top-0 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3 w-10 text-center"><CheckSquare size={14} className="text-slate-400 cursor-pointer" onClick={() => setSelectedIds(filteredEntries.length === selectedIds.length ? [] : filteredEntries.map(e => e.id))} /></th>
                <th className="px-4 py-3 whitespace-nowrap">Transaction ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Customer / Lead</th>
                <th className="px-4 py-3">Lender</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-right">Tax (GST/TDS)</th>
                <th className="px-4 py-3 text-right text-slate-800">Net Amount</th>
                <th className="px-4 py-3">Pay Mode</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEntries.map((entry) => {
                const isSelected = selectedIds.includes(entry.id);
                return (
                  <tr key={entry.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-indigo-50/50' : ''}`}>
                    <td className="px-4 py-3 text-center"><input type="checkbox" checked={isSelected} onChange={() => toggleSelect(entry.id)} className="w-3.5 h-3.5 text-[#2a2b72] rounded border-gray-300 focus:ring-[#2a2b72] cursor-pointer" /></td>
                    <td className="px-4 py-3"><span className="font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md border border-indigo-100">{entry.id}</span></td>
                    <td className="px-4 py-3 font-medium">{entry.date}</td>
                    <td className="px-4 py-3 font-bold text-slate-700">{entry.type}</td>
                    <td className="px-4 py-3"><div className="font-bold text-slate-800">{entry.customer}</div><div className="text-[10px] text-slate-400">{entry.leadId}</div></td>
                    <td className="px-4 py-3 font-semibold">{entry.lender}</td>
                    <td className="px-4 py-3 text-right font-medium">₹{entry.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right"><div className="text-[10px] text-red-500">G: ₹{entry.gst.toLocaleString()}</div><div className="text-[10px] text-amber-500">T: ₹{entry.tds.toLocaleString()}</div></td>
                    <td className="px-4 py-3 text-right font-black text-slate-900 text-sm">₹{entry.net.toLocaleString()}</td>
                    <td className="px-4 py-3 font-medium">{entry.mode}</td>
                    <td className="px-4 py-3"><Badge status={entry.status} /></td>
                    <td className="px-4 py-3"><div className="flex items-center justify-center gap-2"><button className="text-blue-600 hover:text-blue-800 bg-blue-50 p-1.5 rounded-md transition-colors" title="View"><Eye size={14} /></button><button className="text-emerald-600 hover:text-emerald-800 bg-emerald-50 p-1.5 rounded-md transition-colors" title="Approve"><Check size={14} /></button><button className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-md transition-colors" title="Edit"><Edit size={14} /></button></div></td>
                  </tr>
                );
              })}
              {filteredEntries.length === 0 && (
                <tr><td colSpan="12" className="px-4 py-16 text-center text-slate-400 font-medium"><Calculator size={32} className="mx-auto text-slate-300 mb-2" />No ledger transactions found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* Add Entry Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <div>
                <h2 className="text-base font-black text-[#2a2b72] flex items-center gap-2"><Plus size={18}/> Add Ledger Entry</h2>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5 uppercase tracking-wider">Financial Transaction Record</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white border border-slate-200 p-1.5 rounded-lg shadow-sm"><X size={18}/></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 bg-[#F8FAFC]">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Transaction Core Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Entry Type <span className="text-red-500">*</span></label>
                      <select value={newEntry.type} onChange={e => setNewEntry({...newEntry, type: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] bg-white font-semibold">
                        <option>Credit</option><option>Debit</option><option>Commission</option><option>Expense</option><option>Refund</option><option>Adjustment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Transaction Date <span className="text-red-500">*</span></label>
                      <input type="date" value={newEntry.date} onChange={e => setNewEntry({...newEntry, date: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] text-slate-700 font-medium" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Payment Mode <span className="text-red-500">*</span></label>
                      <select value={newEntry.paymentMode} onChange={e => setNewEntry({...newEntry, paymentMode: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] bg-white font-semibold">
                        <option value="">Select Mode</option><option>Bank Transfer</option><option>NEFT</option><option>RTGS</option><option>UPI</option><option>Cheque</option><option>Cash</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Financials & Taxes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Base Amount <span className="text-red-500">*</span></label>
                      <div className="flex"><span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 font-bold">₹</span><input type="number" placeholder="0.00" value={newEntry.amount} onChange={handleAmountChange} className="flex-1 w-full border border-gray-300 rounded-r-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] font-semibold" /></div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">GST (Auto 18%)</label>
                      <div className="flex"><span className="inline-flex items-center px-2 rounded-l-lg border border-r-0 border-gray-300 bg-slate-100 text-slate-400 font-bold">₹</span><input type="number" value={newEntry.gst} readOnly className="flex-1 w-full border border-gray-300 rounded-r-lg p-2.5 text-xs bg-slate-50 text-red-500 font-bold outline-none" /></div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">TDS (Auto 5%)</label>
                      <div className="flex"><span className="inline-flex items-center px-2 rounded-l-lg border border-r-0 border-gray-300 bg-slate-100 text-slate-400 font-bold">₹</span><input type="number" value={newEntry.tds} readOnly className="flex-1 w-full border border-gray-300 rounded-r-lg p-2.5 text-xs bg-slate-50 text-amber-600 font-bold outline-none" /></div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#2a2b72] uppercase mb-1">Net Payable Amount</label>
                      <div className="flex shadow-sm"><span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[#2a2b72] bg-[#2a2b72] text-white font-bold">₹</span><input type="text" value={((parseFloat(newEntry.amount)||0) + (parseFloat(newEntry.gst)||0) - (parseFloat(newEntry.tds)||0)).toFixed(2)} readOnly className="flex-1 w-full border border-[#2a2b72] rounded-r-lg p-2.5 text-sm bg-indigo-50 text-[#2a2b72] font-black outline-none" /></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Linked Entities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {newEntry.type === 'Commission' && (
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Lender / Bank</label>
                        <select value={newEntry.lender} onChange={e => setNewEntry({...newEntry, lender: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] bg-white font-medium">
                          <option value="">Select Lender</option><option>HDFC Bank</option><option>Axis Bank</option><option>ICICI Bank</option>
                        </select>
                      </div>
                    )}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Customer Name</label>
                      <input type="text" placeholder="Search customer..." value={newEntry.customer} onChange={e => setNewEntry({...newEntry, customer: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72]" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Lead / Enquiry ID</label>
                      <input type="text" placeholder="e.g. ENQ-1002" value={newEntry.leadId} onChange={e => setNewEntry({...newEntry, leadId: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72]" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Internal Notes</label>
                      <textarea rows="3" placeholder="Add remarks..." value={newEntry.notes} onChange={e => setNewEntry({...newEntry, notes: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] resize-none"></textarea>
                   </div>
                   <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Payment Proof</label>
                      <div className="w-full h-[74px] border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 flex flex-col items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer group">
                         <UploadCloud size={20} className="text-slate-400 group-hover:text-[#2a2b72] mb-1" />
                         <span className="text-[10px] font-bold text-slate-500">Click to upload PDF, JPG, PNG</span>
                      </div>
                   </div>
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Transaction Status <span className="text-red-500">*</span></label>
                   <div className="flex gap-3">
                     {['Pending', 'Paid', 'Failed'].map(stat => (
                       <label key={stat} className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer text-xs font-bold transition-all ${newEntry.status === stat ? 'border-[#2a2b72] bg-indigo-50 text-[#2a2b72]' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'}`}>
                         <input type="radio" name="status" value={stat} checked={newEntry.status === stat} onChange={e => setNewEntry({...newEntry, status: e.target.value})} className="hidden" />
                         {newEntry.status === stat && <CheckCircle size={14} />} {stat}
                       </label>
                     ))}
                   </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 shadow-sm">Cancel</button>
              <button onClick={handleSaveEntry} className="px-8 py-2.5 text-white bg-[#2a2b72] hover:bg-[#1e1f52] rounded-lg text-xs font-bold shadow-md">Save Transaction</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// --- RECORD DETAIL VIEW (fixed addNote bug) ---
const RecordDetailView = ({ record, onBack, onEdit }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFollowUp, setSelectedFollowUp] = useState(null);
  const [timelineEvents, setTimelineEvents] = useState([
    { id: 1, type: 'creation', title: 'Lead Created', user: 'Naresh Goud', time: 'Today', status: 'New', color: 'bg-blue-500', desc: 'Enquiry captured via form.' },
  ]);
  const [newNote, setNewNote] = useState("");

  // BUG FIX: was `newNote("")` which crashes - now correctly uses `setNewNote("")`
  const addNote = () => {
    if(!newNote.trim()) return;
    setTimelineEvents([{ id: Date.now(), type: 'note', title: 'Internal Note Added', user: 'Naresh Goud', time: 'Just now', status: 'Info', color: 'bg-blue-500', desc: newNote }, ...timelineEvents]);
    setNewNote("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-slate-200 px-5 py-4 flex justify-between items-center z-10 sticky top-0 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-slate-50 text-slate-500 hover:text-indigo-600 rounded-lg border border-slate-200 transition-colors"><ArrowRight size={18} className="rotate-180" /></button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 tracking-tight">{record?.name || 'Customer Name'}</h1>
              <Badge status={record?.status || 'New'} />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{record?.id || 'ENQ-XXXXX'} • {record?.mobile || '+91 XXXXX XXXXX'} • {record?.loanType || 'Personal Loan'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(record)} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5"><Edit size={14}/> Edit</button>
          <button className="px-3 py-1.5 text-xs font-bold text-white bg-[#2a2b72] border border-[#2a2b72] rounded-lg hover:bg-[#1e1f52] flex items-center gap-1.5 shadow-sm"><Check size={14}/> Convert to Lead</button>
        </div>
      </div>

      <div className="bg-slate-50 border-b border-slate-200 px-5 pt-3">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {['overview', 'timeline', 'documents', 'lenders', 'verification'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>


      <div className="flex-1 overflow-y-auto p-5 bg-[#F8FAFC]">
        {activeTab === 'overview' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex justify-end gap-2 mb-2">
              <button onClick={() => onEdit(record)} className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2 shadow-sm"><Edit size={14}/> Edit Details</button>
              <button className="px-4 py-2 text-xs font-bold text-red-600 bg-white border border-slate-200 rounded-lg hover:bg-red-50 flex items-center gap-2 shadow-sm"><Trash2 size={14}/> Delete</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-sm font-bold text-slate-800 mb-5 border-b border-slate-100 pb-3 flex items-center gap-2"><Briefcase size={16} className="text-indigo-600"/> Loan Requirement</h3>
                <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-sm">
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Product</p><p className="font-semibold text-slate-800">{record.loanType || 'N/A'}</p></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Purpose</p><p className="font-semibold text-slate-800">{record.purpose || 'N/A'}</p></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Loan Amount</p><p className="font-semibold text-slate-800">{record.amount || 'N/A'}</p></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tenure</p><p className="font-semibold text-slate-800">{record.tenure ? `${record.tenure} Months` : 'N/A'}</p></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Branch</p><p className="font-semibold text-slate-800">{record.branch || 'N/A'}</p></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Source</p><p className="font-semibold text-slate-800">{record.source || 'N/A'}</p></div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-sm font-bold text-slate-800 mb-5 border-b border-slate-100 pb-3 flex items-center gap-2"><User size={16} className="text-indigo-600"/> Personal Details</h3>
                <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-sm">
                  <div className="col-span-2"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</p><p className="font-semibold text-slate-800">{record.name || 'N/A'}</p></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile</p><p className="font-semibold text-slate-800">{record.mobile || 'N/A'}</p></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p><p className="font-semibold text-slate-800">{record.email || 'N/A'}</p></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">PAN</p><p className="font-semibold text-slate-800 uppercase">{record.pan || 'N/A'}</p></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">DOB</p><p className="font-semibold text-slate-800">{record.dob || 'N/A'}</p></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative">
                <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add a timeline note..." className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs outline-none focus:border-indigo-500 focus:bg-white min-h-[80px]" />
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button onClick={addNote} className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded shadow-sm hover:bg-indigo-700">Add Note</button>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm ml-2">
              <div className="border-l-2 border-slate-100 pl-6 space-y-8 relative">
                {timelineEvents.map((evt) => (
                  <div key={evt.id} className="relative group">
                    <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${evt.color}`}></div>
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">{evt.title}</span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${evt.color.replace('bg-', 'text-').replace('500', '600')} ${evt.color.replace('500', '50')}`}>{evt.status}</span>
                      </div>
                      <span className="text-xs font-medium text-slate-400">{evt.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">{evt.desc || ''}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">{evt.user.charAt(0)}</div>{evt.user}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="max-w-5xl mx-auto space-y-4">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText size={16} className="text-indigo-600"/> Document Repository</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{key:'pan',name:'PAN Card'},{key:'aadhar',name:'Aadhar Card'},{key:'income',name:'Salary Slips / ITR'},{key:'bank',name:'Bank Statement'},{key:'photo',name:'Photograph'},{key:'signature',name:'Digital Signature'}].map((doc, idx) => {
                const isUploaded = record?.uploadedDocs && record.uploadedDocs[doc.key];
                return (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className={`p-2.5 rounded-lg shrink-0 ${isUploaded ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>{isUploaded ? <CheckCircle size={18} /> : <FileText size={18} />}</div>
                      <div className="truncate"><p className="text-xs font-bold text-slate-700 truncate">{doc.name}</p>{isUploaded ? <p className="text-[10px] text-emerald-600 truncate font-semibold">Uploaded: {record.uploadedDocs[doc.key]}</p> : <p className="text-[10px] text-red-500 font-semibold">Pending Upload</p>}</div>
                    </div>
                    <label className="border border-slate-200 text-slate-600 hover:bg-[#2a2b72] hover:text-white hover:border-[#2a2b72] px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center transition-all shadow-sm cursor-pointer shrink-0"><UploadCloud size={12} className="mr-1" /> Upload<input type="file" className="hidden" /></label>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {['lenders', 'verification'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-xl bg-white/50">
             <Layers size={32} className="text-slate-300 mb-3" />
             <h3 className="text-sm font-bold text-slate-700 mb-1 capitalize">{activeTab} Integration</h3>
             <p className="text-slate-400 font-medium text-xs">Coming soon in the next update.</p>
          </div>
        )}
      </div>

      {selectedFollowUp && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2"><PhoneCall size={16} className="text-indigo-600"/> Follow-up Details</h2>
              <button onClick={() => setSelectedFollowUp(null)} className="text-slate-400 hover:text-slate-600"><X size={18}/></button>
            </div>
            <div className="p-5"><p className="text-sm text-slate-600">{selectedFollowUp.desc || 'No details available.'}</p></div>
          </div>
        </div>
      )}
    </div>
  );
};


// --- CREATE ENQUIRY VIEW ---
const CreateEnquiryView = ({ initialData, onBack, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    product: '', purpose: '', branch: '', mobile: '', loanAmount: '', tenure: '', leadSource: '', campaign: '',
    pan: '', aadhar: '', firstName: '', middleName: '', lastName: '', email: '',
    dob: '', gender: '', residenceType: '', address1: '', address2: '', city: '', state: '', pincode: '',
    occupation: '', companyType: '', companyName: '', emi: '', income: '',
    officeAddress1: '', officeAddress2: '', officeCity: '', officeState: '', officePincode: '',
    uploadedDocs: {}
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const processSteps = [
    { id: 1, name: 'Loans' },
    { id: 2, name: 'Basic Details' },
    { id: 3, name: 'Personal Details' },
    { id: 4, name: 'Company / Business Details' },
    { id: 5, name: 'Document Upload' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, docKey) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, uploadedDocs: { ...prev.uploadedDocs, [docKey]: e.target.files[0].name } }));
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && !formData.product) {
      setErrorMessage("Please select a Loan Requirement type to proceed.");
      setShowErrorToast(true);
      return;
    } else if (currentStep === 2 && (!formData.purpose || !formData.branch || !formData.mobile || !formData.loanAmount || !formData.tenure || !formData.leadSource)) {
      setErrorMessage("Please fill out all mandatory fields (*) inside Basic Details.");
      setShowErrorToast(true);
      return;
    } else if (currentStep === 3 && (!formData.firstName || !formData.lastName)) {
      setErrorMessage("Please fill out all mandatory fields (*) inside Personal Details.");
      setShowErrorToast(true);
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSave = () => {
    const formattedAmount = formData.loanAmount ? `₹${parseFloat(formData.loanAmount).toLocaleString('en-IN')}` : '₹0';
    const idToUse = initialData?.id || `ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEnquiry = {
      id: idToUse,
      name: formData.firstName ? `${formData.firstName} ${formData.lastName}` : 'New Lead Applicant',
      mobile: formData.mobile ? `+91 ${formData.mobile}` : 'N/A',
      loanType: formData.product || 'Personal Loan',
      assignedUser: 'Naresh Goud',
      status: initialData?.status || 'New',
      source: formData.leadSource || 'CRM Portal Entry',
      date: initialData?.date || 'Just now',
      amount: formattedAmount,
      ...formData
    };
    onSave(newEnquiry);
  };

  const loanProducts = [
    { id: 'personal', label: 'Personal Loan' },
    { id: 'business', label: 'Business Loan' },
    { id: 'home', label: 'Home Loan' },
    { id: 'lap', label: 'Loan Against Property' },
    { id: 'car', label: 'Car Loan' },
    { id: 'cv', label: 'CV Loan' },
    { id: 'insurance', label: 'Insurance' },
  ];


  return (
    <div className="flex flex-col h-full w-full bg-[#F8FAFC] relative">
      {showErrorToast && (
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full border border-slate-100">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle size={24} />
              <h3 className="font-bold text-slate-800 text-base">Validation Required</h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mb-5">{errorMessage}</p>
            <button onClick={() => setShowErrorToast(false)} className="w-full bg-[#2a2b72] hover:bg-[#1e1f52] text-white font-bold py-2 rounded-lg text-xs transition-colors">Understand & Dismiss</button>
          </div>
        </div>
      )}

      {/* Steps Header */}
      <div className="px-6 py-5 border-b border-gray-100 shrink-0 bg-white z-10">
        <div className="flex items-center text-[#2a2b72] font-black text-xs tracking-wider uppercase mb-6">
          <Activity size={16} className="mr-2 text-indigo-500" />
          {initialData ? `EDITING: ${initialData.id}` : 'YOUR LOAN PROCESS FLOW'}
        </div>
        <div className="flex items-center w-full overflow-x-auto scrollbar-hide py-1">
          {processSteps.map((step, idx) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <div key={step.id} className="flex items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${isCompleted || isActive ? 'bg-[#2a2b72] text-white shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                    {isCompleted ? <Check size={12} strokeWidth={4} /> : step.id}
                  </div>
                  <span className={`text-xs font-bold whitespace-nowrap transition-colors ${isActive || isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>{step.name}</span>
                </div>
                {idx < processSteps.length - 1 && <div className="w-8 sm:w-16 h-[1px] bg-slate-200 mx-3 sm:mx-4"></div>}
              </div>
            );
          })}
        </div>
      </div>


      {/* Form Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-5xl mx-auto w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-4">
          
          {/* Step 1: Loan Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-2">Select Loan Requirement</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {loanProducts.map(product => {
                  const isSelected = formData.product === product.label;
                  return (
                    <div key={product.id} onClick={() => setFormData({...formData, product: product.label})} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200 ${isSelected ? 'border-[#2a2b72] ring-1 ring-[#2a2b72] bg-slate-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'}`}>
                      <div className="flex items-center gap-4">
                        <IllustratedIcon type={product.id} />
                        <span className="font-bold text-slate-700 text-sm">{product.label}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${isSelected ? 'border-[#2a2b72] bg-white' : 'border-slate-300 bg-white'}`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#2a2b72]"></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Basic Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-base font-black text-slate-800 tracking-tight border-b border-slate-100 pb-3">Basic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Selected Product</label>
                  <input type="text" value={formData.product} disabled className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none bg-slate-50 text-slate-500 font-semibold cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Purpose <span className="text-red-500">*</span></label>
                  <select name="purpose" value={formData.purpose} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] bg-white text-slate-800 font-semibold">
                    <option value="">Select Purpose</option><option>Business Expansion</option><option>New Property Purchase</option><option>Renovation</option><option>Education Expenses</option><option>Bima Cover</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Select Branch <span className="text-red-500">*</span></label>
                  <select name="branch" value={formData.branch} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] bg-white text-slate-800 font-semibold">
                    <option value="">Select Branch</option><option>Hyderabad Branch</option><option>Bengaluru Branch</option><option>Delhi Central</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Mobile <span className="text-red-500">*</span></label>
                  <div className="flex"><span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500"><Phone size={14} /></span><input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="10-digit number" className="flex-1 w-full border border-gray-300 rounded-r-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] text-slate-800" /></div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Required Loan Amount <span className="text-red-500">*</span></label>
                  <div className="flex"><span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 font-medium">₹</span><input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleInputChange} placeholder="Enter Amount" className="flex-1 w-full border border-gray-300 rounded-r-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] text-slate-800" /></div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Required Tenure <span className="text-red-500">*</span></label>
                  <div className="flex"><input type="number" name="tenure" value={formData.tenure} onChange={handleInputChange} placeholder="Enter Months" className="flex-1 w-full border border-gray-300 rounded-l-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] border-r-0 text-slate-800" /><span className="inline-flex items-center px-3 rounded-r-lg border border-gray-300 bg-gray-50 text-gray-500 text-xs">In months</span></div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Lead Source <span className="text-red-500">*</span></label>
                  <select name="leadSource" value={formData.leadSource} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] bg-white text-slate-800 font-semibold">
                    <option value="">Select Lead Source</option><option>Direct Web</option><option>WhatsApp Capture</option><option>Reference Agent</option><option>Offline Campaign</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Campaign</label>
                  <select name="campaign" value={formData.campaign} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-[#2a2b72] bg-white text-slate-800 font-semibold">
                    <option value="">Select Campaign</option><option>Diwali Special</option><option>Monsoon Agri Drive</option><option>Organic Search</option>
                  </select>
                </div>
              </div>
            </div>
          )}


          {/* Step 3: Personal Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-base font-black text-slate-800 tracking-tight border-b border-slate-100 pb-3">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Pan No. <span className="text-red-500">*</span></label>
                  <div className="flex"><input type="text" name="pan" placeholder="Enter PAN" value={formData.pan} onChange={handleInputChange} className="flex-1 border border-gray-300 border-r-0 rounded-l-lg p-2 text-xs uppercase outline-none focus:border-[#2a2b72]" /><label className="bg-[#2a2b72] text-white px-3 rounded-r-lg hover:bg-[#1e1f52] transition-colors flex items-center cursor-pointer"><UploadCloud size={14} /><input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'pan')} /></label></div>
                  {formData.uploadedDocs.pan && <span className="text-[10px] text-emerald-600 mt-1 block truncate">✓ {formData.uploadedDocs.pan}</span>}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Aadhar No.</label>
                  <div className="flex"><input type="text" name="aadhar" placeholder="Enter Aadhar" value={formData.aadhar} onChange={handleInputChange} className="flex-1 border border-gray-300 border-r-0 rounded-l-lg p-2 text-xs outline-none focus:border-[#2a2b72]" /><label className="bg-[#2a2b72] text-white px-3 rounded-r-lg hover:bg-[#1e1f52] transition-colors flex items-center cursor-pointer"><UploadCloud size={14} /><input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'aadhar')} /></label></div>
                  {formData.uploadedDocs.aadhar && <span className="text-[10px] text-emerald-600 mt-1 block truncate">✓ {formData.uploadedDocs.aadhar}</span>}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">First Name <span className="text-red-500">*</span></label>
                  <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Middle Name</label>
                  <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Email</label>
                  <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72] text-slate-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72] bg-white text-slate-700">
                    <option value="">Select Gender</option><option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Residence Type</label>
                  <select name="residenceType" value={formData.residenceType} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72] bg-white text-slate-700">
                    <option value="">Select Type</option><option>Owned</option><option>Rented</option><option>Company Provided</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Address Line 1</label>
                  <input type="text" name="address1" placeholder="House/Flat No, Building, Street" value={formData.address1} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">City</label>
                  <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">State</label>
                  <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Pincode</label>
                  <input type="text" name="pincode" placeholder="6-digit pincode" value={formData.pincode} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
              </div>
              <div className="pt-4 text-center border-t border-gray-100 mt-4">
                <button type="button" className="text-[#2a2b72] font-semibold text-xs flex items-center justify-center w-full py-2 hover:bg-blue-50 transition-colors rounded-lg border border-dashed border-[#2a2b72]"><Plus size={14} className="mr-2" /> Add Co-Applicant</button>
              </div>
            </div>
          )}


          {/* Step 4: Company Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-base font-black text-slate-800 tracking-tight border-b border-slate-100 pb-3">Company / Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Occupation <span className="text-red-500">*</span></label>
                  <select name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72] bg-white text-slate-700">
                    <option value="">Select Occupation</option><option>Salaried</option><option>Self Employed Professional</option><option>Self Employed Non-Professional</option><option>Housewife</option><option>Student</option><option>Retired</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Company Type</label>
                  <select name="companyType" value={formData.companyType} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72] bg-white text-slate-700">
                    <option value="">Select Type</option><option>Private Limited</option><option>Public Limited</option><option>Partnership</option><option>Proprietorship</option><option>Govt Sector</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Company / Business Name</label>
                  <input type="text" name="companyName" placeholder="Enter Business Name" value={formData.companyName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Monthly Income / Revenue</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 flex items-center pointer-events-none bg-gray-50 border-r border-gray-300 rounded-l-lg px-2.5"><IndianRupee size={10} className="text-slate-500" /></div><input type="number" name="income" placeholder="e.g. 150000" value={formData.income} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 pl-10 text-xs outline-none focus:border-[#2a2b72]" /></div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Existing EMI / Obligations</label>
                  <div className="relative"><div className="absolute inset-y-0 left-0 flex items-center pointer-events-none bg-gray-50 border-r border-gray-300 rounded-l-lg px-2.5"><IndianRupee size={10} className="text-slate-500" /></div><input type="number" name="emi" placeholder="0.00" value={formData.emi} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 pl-10 text-xs outline-none focus:border-[#2a2b72]" /></div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Office Address</label>
                  <input type="text" name="officeAddress1" placeholder="Building, Block, Area" value={formData.officeAddress1} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Office City</label>
                  <input type="text" name="officeCity" placeholder="City Name" value={formData.officeCity} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Office Pincode</label>
                  <input type="text" name="officePincode" placeholder="6-digit pincode" value={formData.officePincode} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#2a2b72]" />
                </div>
              </div>
            </div>
          )}


          {/* Step 5: Document Upload */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-base font-black text-slate-800 tracking-tight border-b border-slate-100 pb-3">Document Collection</h3>
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-4 shadow-sm">
                <p className="text-xs text-blue-800 flex items-center font-bold"><CheckCircle size={16} className="mr-2 text-blue-600" />Upload applicant's KYC and business/income files to trigger instant score validation.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {[{key:'pan',name:'PAN Card'},{key:'aadhar',name:'Aadhar Card (Front & Back)'},{key:'income',name:'Latest 3 Months Salary Slips / ITR'},{key:'bank',name:'Last 6 Months Bank Statement'},{key:'photo',name:'Passport Size Photograph'},{key:'signature',name:'Digital Signature / Verification'}].map((doc, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-3.5 flex items-center justify-between hover:shadow-sm transition-all bg-white hover:border-indigo-200 group">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="bg-slate-50 p-2.5 rounded-lg text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0"><FileText size={18} /></div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-700 truncate">{doc.name}</p>
                        {formData.uploadedDocs[doc.key] ? <p className="text-[10px] text-emerald-600 truncate font-semibold">✓ {formData.uploadedDocs[doc.key]}</p> : <p className="text-[10px] text-slate-400">PDF, JPG up to 5MB</p>}
                      </div>
                    </div>
                    <label className="border border-slate-200 text-slate-600 hover:bg-[#2a2b72] hover:text-white hover:border-[#2a2b72] px-3.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center transition-all shadow-sm cursor-pointer shrink-0"><UploadCloud size={12} className="mr-1" /> Upload<input type="file" className="hidden" onChange={(e) => handleFileChange(e, doc.key)} /></label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
        <div className="flex w-full sm:w-auto">
          {currentStep > 1 && (
            <button onClick={prevStep} className="text-[#2a2b72] font-black text-xs flex items-center justify-center py-2 hover:underline w-full sm:w-auto transition-colors"><ChevronRight size={14} className="mr-1 rotate-180" /> Previous</button>
          )}
        </div>
        <div className="flex items-center justify-end space-x-3 w-full sm:w-auto">
          <button onClick={onBack} className="w-full sm:w-auto border border-slate-300 text-slate-700 bg-white font-bold px-6 py-2.5 rounded-lg hover:bg-slate-100 transition-colors text-xs shadow-sm">Cancel / Close</button>
          {currentStep < 5 ? (
            <button onClick={nextStep} className="w-full sm:w-auto bg-[#2a2b72] hover:bg-[#1e1f52] text-white font-bold px-8 py-2.5 rounded-lg shadow-md transition-colors text-xs">Save & Proceed</button>
          ) : (
            <button onClick={handleSave} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-2.5 rounded-lg shadow-md transition-colors text-xs">{initialData ? 'Update Details' : 'Complete & Save Lead'}</button>
          )}
        </div>
      </div>
    </div>
  );
};


// --- ENQUIRIES VIEW ---
const EnquiriesView = ({ enquiries, onAddEnquiry, onDeleteEnquiry, onEditEnquiry }) => {
  const [viewingRecord, setViewingRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (viewingRecord) return <RecordDetailView record={viewingRecord} onBack={() => setViewingRecord(null)} onEdit={onEditEnquiry} />;

  const filteredEnquiries = enquiries.filter(enq => 
    enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.mobile.includes(searchTerm)
  );

  return (
    <div className="p-4 lg:p-5 w-full h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2"><HelpCircle size={24} className="text-indigo-600" /> Enquiries</h1>
          <p className="text-slate-500 text-xs mt-1 font-medium">Manage raw customer inquiries and lead captures.</p>
        </div>
        <button onClick={onAddEnquiry} className="bg-[#00d2d3] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#00b8b9] flex items-center gap-1.5 shadow-sm"><Plus size={14} /> Add Enquiry</button>
      </div>

      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-2 items-center mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input type="text" placeholder="Search Enquiry, Mobile, Name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:border-indigo-500 transition-all outline-none" />
        </div>
        <select className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-1.5 outline-none"><option>All Loan Types</option></select>
        <select className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-1.5 outline-none"><option>All Statuses</option></select>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full flex-1">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 sticky top-0">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">Enquiry ID</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Mobile Number</th>
                <th className="px-4 py-3">Loan Type</th>
                <th className="px-4 py-3">Estimated Value</th>
                <th className="px-4 py-3">Assigned User</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEnquiries.length === 0 ? (
                <tr><td colSpan="8" className="px-4 py-16 text-center"><div className="flex flex-col items-center justify-center gap-2 text-slate-400"><HelpCircle size={40} className="text-slate-300 mb-2" /><p className="text-sm font-semibold text-slate-600">No Enquiries Found</p><p className="text-xs">Click "Add Enquiry" to create your first lead.</p></div></td></tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer" onClick={() => setViewingRecord(enq)}>
                    <td className="px-4 py-3"><span className="font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">{enq.id}</span></td>
                    <td className="px-4 py-3 font-bold text-slate-900">{enq.name}</td>
                    <td className="px-4 py-3 font-medium">{enq.mobile}</td>
                    <td className="px-4 py-3 font-bold text-slate-700">{enq.loanType}</td>
                    <td className="px-4 py-3 font-black text-slate-800">{enq.amount || '₹0'}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{enq.assignedUser}</td>
                    <td className="px-4 py-3"><Badge status={enq.status} /></td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setViewingRecord(enq)} className="text-indigo-600 hover:text-indigo-800 font-bold text-xs bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition-colors">View</button>
                        <button onClick={() => onDeleteEnquiry(enq.id)} className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-md transition-colors" title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


// --- DYNAMIC MODULE VIEW (placeholder for unbuilt modules) ---
const DynamicModuleView = ({ activeModuleId }) => {
  let currentModule = null;
  navGroups.forEach(group => {
    const found = group.items.find(item => item.id === activeModuleId);
    if (found) currentModule = found;
  });
  if (!currentModule) return null;
  const Icon = currentModule.icon;

  return (
    <div className="p-4 lg:p-5 w-full h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
         <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2"><Icon size={24} className="text-indigo-600" /> {currentModule.name} Module</h1>
            <p className="text-slate-500 text-xs mt-1 font-medium">Manage your {currentModule.name.toLowerCase()} workflow and configurations here.</p>
         </div>
       </div>
       <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-slate-400 p-8 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3"><Icon size={32} className="text-slate-300" /></div>
          <h2 className="text-sm font-bold text-slate-700">Workspace Ready</h2>
          <p className="text-slate-500 text-xs max-w-sm mt-1">The CRM workspace for <span className="font-bold text-indigo-600">{currentModule.name}</span> is active and running.</p>
       </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [enquiries, setEnquiries] = useState([]);
  const [callbacks, setCallbacks] = useState([]);
  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [editingEnquiryData, setEditingEnquiryData] = useState(null);
  const [showOffer, setShowOffer] = useState(true);
  const [showWhatsAppPanel, setShowWhatsAppPanel] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => window.innerWidth < 1024 ? setSidebarOpen(false) : setSidebarOpen(true);
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSaveEnquiry = (newEnquiry) => {
    if (editingEnquiryData) {
      setEnquiries(enquiries.map(e => e.id === newEnquiry.id ? newEnquiry : e));
    } else {
      setEnquiries([newEnquiry, ...enquiries]);
    }
    setActiveModule('enquiries');
    setEditingEnquiryData(null);
  };


  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] font-sans overflow-hidden text-slate-800">
      {/* SIDEBAR */}
      <aside className={`bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 z-30 hidden md:flex ${sidebarOpen ? 'w-56' : 'w-16'} flex-shrink-0 relative shadow-xl`}>
        <div className="h-14 flex items-center px-4 border-b border-slate-800/80 bg-slate-900 sticky top-0 z-10">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
            <Briefcase size={18} className="text-white" />
          </div>
          {sidebarOpen && <span className="ml-2.5 text-white font-black text-lg tracking-tight whitespace-nowrap">MyLoanCRM</span>}
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide py-4 px-2.5 space-y-5">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              {sidebarOpen && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1.5">{group.title}</p>}
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeModule === item.id || (activeModule === 'create-enquiry' && item.id === 'enquiries');
                  return (
                    <button key={item.name} onClick={() => { setActiveModule(item.id); setShowWhatsAppPanel(false); setShowNotificationPanel(false); setEditingEnquiryData(null); }} className={`w-full flex items-center px-2.5 py-2 rounded-lg transition-all duration-200 group ${isActive ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-slate-800 hover:text-white'}`} title={!sidebarOpen ? item.name : ""}>
                      <Icon size={16} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                      {sidebarOpen && <span className={`ml-2.5 text-xs font-semibold ${isActive ? '' : 'text-slate-300'}`}>{item.name}</span>}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute -right-3 top-20 bg-white border border-slate-200 text-slate-600 p-1 rounded-full shadow-md z-40 hidden lg:flex hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
           <ChevronRight size={14} className={`transition-transform duration-300 ${sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </aside>


      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {showOffer && (
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 px-4 py-1.5 flex justify-between items-center text-xs shadow-sm z-20 shrink-0">
             <div className="flex items-center gap-2.5 text-white">
               <span className="bg-white text-indigo-700 text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wider">New Feature</span>
               <span className="font-medium hidden sm:inline">Instant CIBIL Integration is now live. Score leads in seconds!</span>
               <span className="font-medium sm:hidden">CIBIL Integration live!</span>
               <button onClick={() => { setActiveModule('credit'); setShowOffer(false); }} className="font-bold underline decoration-white/50 hover:decoration-white transition-all ml-1">Setup Now</button>
             </div>
             <button onClick={() => setShowOffer(false)} className="text-white/70 hover:text-white transition-colors bg-black/10 rounded p-0.5"><X size={14} /></button>
          </div>
        )}

        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-5 z-20 shrink-0 shadow-sm">
          <div className="flex items-center gap-3 flex-1">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-slate-500 hover:text-indigo-600 p-1.5 -ml-1.5 rounded-md hover:bg-slate-100 transition-colors"><Menu size={20} /></button>
            <div className="relative w-full max-w-sm hidden sm:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search leads, files, phone numbers..." className="w-full pl-8 pr-3 py-1.5 bg-slate-100 border-transparent rounded-lg text-xs font-medium focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-4 relative">
            <button onClick={() => { setActiveModule('create-enquiry'); setEditingEnquiryData(null); }} className="bg-[#00d2d3] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-[#00b8b9] transition-all shadow-sm hover:shadow hover:-translate-y-px flex items-center gap-1.5"><Plus size={16} /> New Lead</button>
            <div className="w-px h-5 bg-slate-200 hidden sm:block mx-0.5"></div>
            <button onClick={() => { setShowWhatsAppPanel(!showWhatsAppPanel); setShowNotificationPanel(false); setShowProfileDropdown(false); }} className="relative text-slate-500 hover:text-emerald-600 transition-colors p-1.5 rounded-full hover:bg-emerald-50">
              <MessageSquare size={18} />
              <span className="absolute top-0.5 right-0.5 bg-emerald-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">0</span>
            </button>
            <button onClick={() => { setShowNotificationPanel(!showNotificationPanel); setShowWhatsAppPanel(false); setShowProfileDropdown(false); }} className="relative text-slate-500 hover:text-indigo-600 transition-colors p-1.5 rounded-full hover:bg-indigo-50">
              <Bell size={18} />
              <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">{callbacks.length}</span>
            </button>
            <div onClick={() => { setShowProfileDropdown(!showProfileDropdown); setShowWhatsAppPanel(false); setShowNotificationPanel(false); }} className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200 cursor-pointer group relative">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-slate-800 leading-none group-hover:text-indigo-600 transition-colors">Naresh Goud</p>
                <p className="text-[10px] font-semibold text-slate-500 mt-1 uppercase tracking-wide">Super Admin</p>
              </div>
              <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-xs font-bold border border-indigo-200 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">NG</div>
              {showProfileDropdown && (
                <div className="absolute right-0 top-10 w-44 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-30 text-left">
                  <div className="p-3 border-b border-slate-100"><p className="text-xs font-bold text-slate-800">Naresh Goud</p><p className="text-[10px] text-slate-500">Super Admin</p></div>
                  <button onClick={() => setActiveModule('settings')} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Settings size={14}/> Settings</button>
                  <button className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"><XCircle size={14}/> Logout</button>
                </div>
              )}
            </div>
            {showWhatsAppPanel && (
              <div className="absolute right-12 top-12 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-30">
                 <h4 className="font-bold text-xs text-slate-800 mb-2 border-b pb-1">Incoming WhatsApp Logs</h4>
                 <p className="text-[11px] text-slate-500 text-center py-4">No active client messages.</p>
              </div>
            )}
            {showNotificationPanel && (
              <div className="absolute right-4 top-12 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-30">
                 <h4 className="font-bold text-xs text-slate-800 mb-2 border-b pb-1">Pending Alerts</h4>
                 <div className="space-y-2 py-1 max-h-48 overflow-y-auto">
                    <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-lg text-[11px] font-medium text-indigo-900">CRM workspace ready for use.</div>
                    <div className="p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600">Check your callback schedule for today.</div>
                 </div>
              </div>
            )}
          </div>
        </header>


        {/* DYNAMIC VIEW ROUTER */}
        <div className="flex-1 w-full relative overflow-hidden flex flex-col bg-[#F8FAFC]">
          {activeModule === 'create-enquiry' ? (
             <CreateEnquiryView 
               initialData={editingEnquiryData}
               onBack={() => { setActiveModule('enquiries'); setEditingEnquiryData(null); }} 
               onSave={handleSaveEnquiry} 
             />
          ) : (
            <div className="flex-1 w-full h-full overflow-y-auto scrollbar-hide">
              {activeModule === 'dashboard' && (
                <DashboardView enquiries={enquiries} callbacks={callbacks} onNavigate={(id) => setActiveModule(id)} />
              )}
              {activeModule === 'enquiries' && (
                <EnquiriesView 
                  enquiries={enquiries} 
                  onAddEnquiry={() => { setActiveModule('create-enquiry'); setEditingEnquiryData(null); }} 
                  onDeleteEnquiry={(id) => setEnquiries(enquiries.filter(e => e.id !== id))}
                  onEditEnquiry={(record) => { setEditingEnquiryData(record); setActiveModule('create-enquiry'); }}
                />
              )}
              {activeModule === 'callbacks' && (
                <CallbacksView callbacks={callbacks} onAddCallback={(cb) => setCallbacks([cb, ...callbacks])} />
              )}
              {activeModule === 'accounting' && (
                <LedgerView entries={ledgerEntries} setEntries={setLedgerEntries} />
              )}
              {!['dashboard', 'enquiries', 'create-enquiry', 'callbacks', 'accounting'].includes(activeModule) && (
                <DynamicModuleView activeModuleId={activeModule} />
              )}
            </div>
          )}
        </div>
        
        {/* MOBILE BOTTOM NAV */}
        <div className="md:hidden flex-shrink-0 bg-white border-t border-slate-200 flex justify-around items-center p-2 z-40 pb-safe shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.1)] relative">
           <button onClick={() => setActiveModule('dashboard')} className={`flex flex-col items-center p-2 rounded-lg ${activeModule === 'dashboard' ? 'text-indigo-600' : 'text-slate-500'}`}>
             <Home size={20} /><span className="text-[10px] font-bold mt-1">Home</span>
           </button>
           <button onClick={() => { setActiveModule('create-enquiry'); setEditingEnquiryData(null); }} className="relative -top-5 flex flex-col items-center justify-center bg-[#00d2d3] text-white w-12 h-12 rounded-full shadow-lg border-4 border-[#F8FAFC]">
             <Plus size={24} />
           </button>
           <button onClick={() => setActiveModule('callbacks')} className={`flex flex-col items-center p-2 rounded-lg ${activeModule === 'callbacks' ? 'text-indigo-600' : 'text-slate-500'}`}>
             <PhoneCall size={20} /><span className="text-[10px] font-bold mt-1">Callbacks</span>
           </button>
        </div>
      </main>

      <CRMAssistant onNavigate={(id) => setActiveModule(id)} />
    </div>
  );
}
