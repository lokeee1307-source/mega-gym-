const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for demo
const inquiries = [];
const memberships = [];

// API Routes

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
  }
  const inquiry = {
    id: Date.now(),
    name,
    email,
    phone: phone || '',
    message,
    createdAt: new Date().toISOString()
  };
  inquiries.push(inquiry);
  console.log('📩 New inquiry from:', name);
  res.json({ success: true, message: 'Thank you! We will get back to you within 24 hours.' });
});

// Membership inquiry endpoint
app.post('/api/membership', (req, res) => {
  const { name, email, phone, plan } = req.body;
  if (!name || !email || !plan) {
    return res.status(400).json({ success: false, error: 'Name, email, and plan are required.' });
  }
  const membership = {
    id: Date.now(),
    name,
    email,
    phone: phone || '',
    plan,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  memberships.push(membership);
  console.log('🏋️ New membership inquiry:', name, '-', plan);
  res.json({ success: true, message: `Thank you for choosing the ${plan} plan! Our team will contact you shortly.` });
});

// Get reviews endpoint
app.get('/api/reviews', (req, res) => {
  const reviews = [
    { id: 1, name: 'Rahul M.', rating: 5, text: 'Nice friendly Staff, little small in space but have almost all equipments.', date: '2 months ago', avatar: 'RM' },
    { id: 2, name: 'Priya S.', rating: 5, text: 'Great place, friendly trainers and excellent equipment!!!', date: '1 month ago', avatar: 'PS' },
    { id: 3, name: 'Amit K.', rating: 4, text: 'Good gym with all necessary equipments. Trainers are helpful and motivating.', date: '3 weeks ago', avatar: 'AK' },
    { id: 4, name: 'Sneha R.', rating: 5, text: 'Best gym in Ejipura area! The trainers are very professional and supportive.', date: '1 week ago', avatar: 'SR' },
    { id: 5, name: 'Vikram D.', rating: 5, text: 'Amazing atmosphere and great collection of equipments. Highly recommend!', date: '4 days ago', avatar: 'VD' },
    { id: 6, name: 'Deepa N.', rating: 4, text: 'Clean environment, good equipment variety. Trainers know their craft well.', date: '2 days ago', avatar: 'DN' }
  ];
  res.json({ success: true, reviews, averageRating: 4.6, totalReviews: 383 });
});

// Get popular times endpoint
app.get('/api/popular-times', (req, res) => {
  const popularTimes = {
    Monday:    [10, 15, 25, 40, 55, 70, 85, 90, 80, 65, 50, 40, 35, 45, 60, 75, 85, 70, 45, 20],
    Tuesday:   [8, 12, 20, 35, 50, 65, 80, 88, 75, 60, 48, 38, 32, 42, 58, 72, 82, 68, 42, 18],
    Wednesday: [12, 18, 28, 42, 58, 72, 88, 92, 82, 68, 52, 42, 38, 48, 62, 78, 88, 72, 48, 22],
    Thursday:  [10, 14, 22, 38, 52, 68, 82, 86, 78, 62, 50, 40, 34, 44, 60, 74, 84, 70, 44, 20],
    Friday:    [15, 20, 30, 45, 60, 75, 85, 88, 78, 65, 52, 42, 36, 46, 58, 70, 78, 62, 38, 15],
    Saturday:  [5, 8, 15, 30, 50, 70, 85, 92, 88, 78, 65, 55, 50, 55, 60, 55, 40, 25, 12, 5],
    Sunday:    [5, 8, 12, 25, 42, 60, 75, 82, 80, 72, 60, 50, 45, 48, 52, 45, 32, 18, 8, 3]
  };
  res.json({ success: true, popularTimes, currentStatus: 'Less busy than usual' });
});

// Get gym info
app.get('/api/gym-info', (req, res) => {
  res.json({
    success: true,
    info: {
      name: 'Mega Gym',
      rating: 4.6,
      totalReviews: 383,
      phone: '099645 82171',
      address: '20th L Cross Rd, near VRR Homes, nr. Muniswamy Garden, Viveknagar Post, Gowda Muniswamy Garden, Ejipura, Bengaluru, Karnataka 560047',
      hours: {
        weekdays: '6:00 AM - 10:00 PM',
        saturday: '6:00 AM - 10:00 PM',
        sunday: '7:00 AM - 8:00 PM'
      },
      status: 'Open',
      established: 2015,
      avgTimeSpent: '1-2 hours'
    }
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║                                          ║
  ║   🏋️  MEGA GYM Server is LIVE!          ║
  ║                                          ║
  ║   🌐 http://localhost:${PORT}              ║
  ║                                          ║
  ╚══════════════════════════════════════════╝
  `);
});
