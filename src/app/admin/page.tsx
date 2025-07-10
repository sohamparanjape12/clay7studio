'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Eye, Star, MessageCircle, Calendar, Users, BookOpen, Mail, Phone, Sparkle } from 'lucide-react';
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial as deleteTestimonialDb,
  createClass as createClassDb,
  updateClass,
  deleteClass as deleteClassDb,
  getSupabaseClient,
} from "@/lib/supabase";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface Class {
  id: string;
  name: string;
  slug: string;
  description: string;
  level: string;
  duration: string;
  price_details: string;
  benefits: string;
  image_url: string;
  created_at: string;
}

interface Testimonial {
  id: string;
  author_name: string;
  rating: number;
  review_text: string;
  source: string;
  created_at: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiry_type: string;
  message: string;
  class_interest: string;
  event_type: string;
  num_participants: number;
  preferred_date: string;
  created_at: string;
}

export default function AdminPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [inquiryFilter, setInquiryFilter] = useState<string>("all");
  const [replyingInquiry, setReplyingInquiry] = useState<Inquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);

  // Form states
  const [classForm, setClassForm] = useState({
    name: '',
    slug: '',
    description: '',
    level: '',
    duration: '',
    price_details: '',
    benefits: '',
    image_url: ''
  });

  const [testimonialForm, setTestimonialForm] = useState({
    author_name: '',
    rating: 5,
    review_text: '',
    source: 'Website'
  });

  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // Set your admin password here (for demo only; use env vars/server auth in production)
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "clay7studio";

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const supabase = getSupabaseClient();
      const [classesRes, testimonialsRes, inquiriesRes] = await Promise.all([
        supabase.from('classes').select('*').order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('inquiries').select('*').order('created_at', { ascending: false })
      ]);

      setClasses(classesRes.data || []);
      setTestimonials(testimonialsRes.data || []);
      setInquiries(inquiriesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Class management
  const handleClassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingClass) {
        await updateClass(editingClass.id, classForm);
        setEditingClass(null);
        toast.success("Class updated successfully!");
      } else {
        await createClassDb(classForm);
        toast.success("Class created successfully!");
      }
      setClassForm({
        name: '',
        slug: '',
        description: '',
        level: '',
        duration: '',
        price_details: '',
        benefits: '',
        image_url: ''
      });
      setIsAddingClass(false);
      fetchData();
    } catch (error) {
      toast.error("Error saving class.");
      console.error('Error saving class:', error);
    }
  };

  const handleEditClass = (classItem: Class) => {
    setEditingClass(classItem);
    setClassForm({
      name: classItem.name,
      slug: classItem.slug,
      description: classItem.description,
      level: classItem.level,
      duration: classItem.duration,
      price_details: classItem.price_details,
      benefits: classItem.benefits,
      image_url: classItem.image_url
    });
  };

  const handleDeleteClass = async (id: string) => {
    if (confirm('Are you sure you want to delete this class?')) {
      try {
        await deleteClassDb(id);
        toast.success("Class deleted.");
        fetchData();
      } catch (error) {
        toast.error("Error deleting class.");
        console.error('Error deleting class:', error);
      }
    }
  };

  // Testimonial management
  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial.id, testimonialForm);
        setEditingTestimonial(null);
        toast.success("Testimonial updated successfully!");
      } else {
        await createTestimonial(testimonialForm);
        toast.success("Testimonial created successfully!");
      }
      setTestimonialForm({
        author_name: '',
        rating: 5,
        review_text: '',
        source: 'Website'
      });
      setIsAddingTestimonial(false);
      fetchData();
    } catch (error) {
      toast.error("Error saving testimonial.");
      console.error('Error saving testimonial:', error);
    }
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialForm({
      author_name: testimonial.author_name,
      rating: testimonial.rating,
      review_text: testimonial.review_text,
      source: testimonial.source
    });
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteTestimonialDb(id);
        toast.success("Testimonial deleted.");
        fetchData();
      } catch (error) {
        toast.error("Error deleting testimonial.");
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  // Delete inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      try {
        const supabase = getSupabaseClient();
        await supabase.from('inquiries').delete().eq('id', id);
        fetchData();
      } catch (error) {
        console.error('Error deleting inquiry:', error);
      }
    }
  };

  // Framer Motion variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  // Filtering logic
  const filteredInquiries = inquiryFilter === "all"
    ? inquiries
    : inquiries.filter((inq) => inq.inquiry_type === inquiryFilter);

  // Reply logic (simulate sending reply)
  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsReplying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real app, send reply to backend/email service here
    setIsReplying(false);
    setReplyingInquiry(null);
    setReplyMessage("");
    alert("Reply sent! (Simulated)");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#732b1d] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

    function getLevelColor(level: string): string | undefined {
      switch (level) {
        case "Beginner":
          return "bg-green-100 text-green-800";
        case "Intermediate":
          return "bg-yellow-100 text-yellow-800";
        case "Advanced":
          return "bg-red-100 text-red-800";
        case "Industrial":
          return "bg-blue-100 text-blue-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }

    function getInquiryTypeColor(inquiry_type: string): string {
      switch (inquiry_type) {
        case "General":
          return "bg-blue-100 text-blue-800";
        case "Class Registration":
          return "bg-green-100 text-green-800";
        case "Group Booking":
          return "bg-yellow-100 text-yellow-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }

  // Password protection logic
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (passwordInput === ADMIN_PASSWORD) {
              setIsAuthenticated(true);
              setPasswordError("");
            } else {
              setPasswordError("Incorrect password. Please try again.");
              setPasswordInput("");
              passwordRef.current?.focus();
            }
          }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs flex flex-col gap-4 border"
        >
          <h2 className="text-2xl font-bold text-[#732b1d] text-center">Admin Login</h2>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter admin password"
            className="border rounded px-3 py-2"
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
            autoFocus
          />
          {passwordError && (
            <div className="text-red-600 text-sm text-center">{passwordError}</div>
          )}
          <Button type="submit" className="bg-[#732b1d] hover:bg-[#5a2117] text-white w-full">
            Login
          </Button>
        </form>
      </div>
    );
  }

  return (
    <>
      <Toaster richColors />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50"
      >
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-full py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-[#732b1d]">Admin Dashboard</h1>
              </div>
              <div className="text-sm text-gray-500">
                Welcome back, Administrator
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <motion.div variants={item}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                      <BookOpen className="h-4 w-4 text-[#732b1d]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#732b1d]">{classes.length}</div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={item}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
                      <Star className="h-4 w-4 text-[#732b1d]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#732b1d]">{testimonials.length}</div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={item}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
                      <MessageCircle className="h-4 w-4 text-[#732b1d]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#732b1d]">{inquiries.length}</div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={item}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                      <Star className="h-4 w-4 text-[#732b1d]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#732b1d]">
                        {testimonials.length > 0 
                          ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
                          : '0.0'
                        }
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest inquiries and testimonials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inquiries.slice(0, 5).map((inquiry) => (
                        <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{inquiry.name}</p>
                            <p className="text-sm text-gray-600">{inquiry.inquiry_type}</p>
                            {inquiry.event_type && (
                              <p className="text-xs text-gray-500">Event: {inquiry.event_type}</p>)}
                          </div>
                          <Badge variant="outline" className={getInquiryTypeColor(inquiry.inquiry_type)}>
                            {inquiry.inquiry_type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Classes Tab */}
            <TabsContent value="classes" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#732b1d]">Manage Classes</h2>
                <Dialog open={!!editingClass || isAddingClass} onOpenChange={(open) => {
                  if (!open) {
                    setEditingClass(null);
                    setIsAddingClass(false);
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#732b1d] hover:bg-[#5a2117]" onClick={() => {
                      setEditingClass(null);
                      setIsAddingClass(true);
                    }}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Class
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingClass ? 'Edit Class' : 'Add New Class'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleClassSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Class Name</label>
                          <Input
                            value={classForm.name}
                            onChange={(e) => setClassForm({...classForm, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Slug</label>
                          <Input
                            value={classForm.slug}
                            onChange={(e) => setClassForm({...classForm, slug: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea
                          value={classForm.description}
                          onChange={(e) => setClassForm({...classForm, description: e.target.value})}
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Level</label>
                          <Select value={classForm.level} onValueChange={(value) => setClassForm({...classForm, level: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="Industrial">Industrial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Duration</label>
                          <Input
                            value={classForm.duration}
                            onChange={(e) => setClassForm({...classForm, duration: e.target.value})}
                            placeholder="e.g., 8 weeks"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Price Details</label>
                        <Input
                          value={classForm.price_details}
                          onChange={(e) => setClassForm({...classForm, price_details: e.target.value})}
                          placeholder="e.g., Rs 1000 per session"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Benefits</label>
                        <Textarea
                          value={classForm.benefits}
                          onChange={(e) => setClassForm({...classForm, benefits: e.target.value})}
                          placeholder="e.g., Stress relief, Motor skill development"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <Input
                          value={classForm.image_url}
                          onChange={(e) => setClassForm({...classForm, image_url: e.target.value})}
                          placeholder="/images/class-image.jpg"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setEditingClass(null)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-[#732b1d] hover:bg-[#5a2117]">
                          {editingClass ? 'Update' : 'Create'} Class
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {classes.map((classItem) => (
                  <motion.div key={classItem.id} variants={item}>
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{classItem.name}</CardTitle>
                            <Badge className={getLevelColor(classItem.level)} variant="secondary">
                              {classItem.level}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleEditClass(classItem)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => handleDeleteClass(classItem.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-2">{classItem.description}</p>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Duration:</span> {classItem.duration}</p>
                          <p><span className="font-medium">Price:</span> {classItem.price_details}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#732b1d]">Manage Testimonials</h2>
                <Dialog open={!!editingTestimonial || isAddingTestimonial} onOpenChange={(open) => {
                  if (!open) {
                    setEditingTestimonial(null);
                    setIsAddingTestimonial(false);
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#732b1d] hover:bg-[#5a2117]" onClick={() => {
                      setEditingTestimonial(null);
                      setTestimonialForm({
                        author_name: '',
                        rating: 5,
                        review_text: '',
                        source: 'Website'
                    });
                    setIsAddingTestimonial(true);
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Author Name</label>
                      <Input
                        value={testimonialForm.author_name}
                        onChange={(e) => setTestimonialForm({...testimonialForm, author_name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Rating</label>
                      <Select value={testimonialForm.rating.toString()} onValueChange={(value) => setTestimonialForm({...testimonialForm, rating: parseFloat(value)})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Stars</SelectItem>
                          <SelectItem value="4.5">4.5 Stars</SelectItem>
                          <SelectItem value="4">4 Stars</SelectItem>
                          <SelectItem value="3.5">3.5 Stars</SelectItem>
                          <SelectItem value="3">3 Stars</SelectItem>
                          <SelectItem value="2.5">2.5 Stars</SelectItem>
                          <SelectItem value="2">2 Stars</SelectItem>
                          <SelectItem value="1.5">1.5 Stars</SelectItem>
                          <SelectItem value="1">1 Star</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Review Text</label>
                      <Textarea
                        value={testimonialForm.review_text}
                        onChange={(e) => setTestimonialForm({...testimonialForm, review_text: e.target.value})}
                        rows={4}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Source</label>
                      <Select value={testimonialForm.source} onValueChange={(value) => setTestimonialForm({...testimonialForm, source: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="Justdial">Justdial</SelectItem>
                          <SelectItem value="Google Reviews">Google Reviews</SelectItem>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setEditingTestimonial(null)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-[#732b1d] hover:bg-[#5a2117]">
                        {editingTestimonial ? 'Update' : 'Create'} Testimonial
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {testimonials.map((testimonial) => (
                <motion.div key={testimonial.id} variants={item}>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{testimonial.author_name}</CardTitle>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">{testimonial.rating}/5</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleEditTestimonial(testimonial)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">{testimonial.review_text}</p>
                      <Badge variant="outline">{testimonial.source}</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-2xl font-bold text-[#732b1d]">Customer Inquiries</h2>
              <div className="flex items-center gap-2   ">
                <label htmlFor="inquiry-filter" className="text-sm font-medium text-gray-700">Filter:</label>
                <Select
                  value={inquiryFilter}
                  onValueChange={setInquiryFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Class Registration">Class Registration</SelectItem>
                    <SelectItem value="Group Booking">Group Booking</SelectItem>
                  </SelectContent>
                </Select>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {filteredInquiries.length} Shown
                </Badge>
              </div>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {filteredInquiries.map((inquiry) => (
                <motion.div key={inquiry.id} variants={item}>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge className={getInquiryTypeColor(inquiry.inquiry_type)} variant="secondary">
                              {inquiry.inquiry_type}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(inquiry.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setReplyingInquiry(inquiry)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteInquiry(inquiry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{inquiry.email}</span>
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{inquiry.phone}</span>
                          </div>
                        )}
                        {inquiry.class_interest && (
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Interest: {inquiry.class_interest}</span>
                          </div>
                        )}
                        {inquiry.num_participants && (
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Participants: {inquiry.num_participants}</span>
                          </div>
                        )}
                        {inquiry.preferred_date && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              Preferred Date: {new Date(inquiry.preferred_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {inquiry.event_type && (
                          <div className="flex items-center space-x-2">
                            <Sparkle className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Event: {inquiry.event_type}</span>
                          </div>
                        )}
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Message:</p>
                        <p className="text-sm text-gray-600">{inquiry.message}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Reply Dialog */}
            <Dialog open={!!replyingInquiry} onOpenChange={(open) => {
              if (!open) {
                setReplyingInquiry(null);
                setReplyMessage("");
              }
            }}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reply to Inquiry</DialogTitle>
                  <DialogDescription>
                    {replyingInquiry && (
                      <div>
                        <div className="font-semibold">{replyingInquiry.name}</div>
                        <div className="text-sm text-gray-500">{replyingInquiry.email}</div>
                      </div>
                    )}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleReplySubmit} className="space-y-4">
                  <Textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply here..."
                    rows={5}
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setReplyingInquiry(null);
                        setReplyMessage("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#732b1d] hover:bg-[#5a2117] text-white"
                      disabled={isReplying}
                    >
                      {isReplying ? "Sending..." : "Send Reply"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
    </>
  );
}