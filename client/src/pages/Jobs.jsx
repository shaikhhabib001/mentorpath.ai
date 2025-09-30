import React, { useState } from 'react'
import JobList from '../components/jobs/JobList'
import { Search, Filter, MapPin, Briefcase, DollarSign } from 'lucide-react'

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    salary: '',
    experience: ''
  })

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechInnovate Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      experience: 'Senior',
      description: 'We are looking for an experienced React developer to join our frontend team...',
      skills: ['React', 'TypeScript', 'Redux', 'Jest', 'CSS3'],
      posted: '2 days ago',
      match: 92
    },
    {
      id: 2,
      title: 'Full Stack JavaScript Developer',
      company: 'DigitalSolutions LLC',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100,000 - $130,000',
      experience: 'Mid-level',
      description: 'Join our distributed team building scalable web applications...',
      skills: ['Node.js', 'React', 'MongoDB', 'AWS', 'Express'],
      posted: '1 week ago',
      match: 85
    },
    {
      id: 3,
      title: 'Frontend Engineer',
      company: 'StartUpVision',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$90,000 - $110,000',
      experience: 'Mid-level',
      description: 'Help us build beautiful user interfaces for our SaaS platform...',
      skills: ['Vue.js', 'JavaScript', 'HTML5', 'SASS', 'Webpack'],
      posted: '3 days ago',
      match: 78
    },
    {
      id: 4,
      title: 'Node.js Backend Developer',
      company: 'CloudFirst Technologies',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      experience: 'Senior',
      description: 'Design and implement scalable backend services for our cloud platform...',
      skills: ['Node.js', 'PostgreSQL', 'Docker', 'Redis', 'GraphQL'],
      posted: '5 days ago',
      match: 88
    }
  ]

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilters = (!filters.location || job.location.includes(filters.location)) &&
                          (!filters.type || job.type === filters.type) &&
                          (!filters.experience || job.experience === filters.experience)

    return matchesSearch && matchesFilters
  })

  return (
    <div className="min-h-screen bg-mentor-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover opportunities that match your skills and career goals. 
            Our AI-powered matching ensures you find the perfect fit.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mentor-teal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-4">
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mentor-teal"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            >
              <option value="">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="San Francisco">San Francisco</option>
              <option value="New York">New York</option>
            </select>
            
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mentor-teal"
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>

            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mentor-teal"
              value={filters.experience}
              onChange={(e) => setFilters({...filters, experience: e.target.value})}
            >
              <option value="">All Experience</option>
              <option value="Junior">Junior</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
        </div>

        {/* Job Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Briefcase className="w-8 h-8 text-mentor-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{mockJobs.length}</div>
            <div className="text-gray-600">Total Jobs</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <MapPin className="w-8 h-8 text-mentor-teal mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-gray-600">Locations</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <DollarSign className="w-8 h-8 text-mentor-gold mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">$110K</div>
            <div className="text-gray-600">Avg Salary</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-8 h-8 bg-mentor-blue rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">✓</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">89%</div>
            <div className="text-gray-600">Match Rate</div>
          </div>
        </div>

        {/* Job List */}
        <JobList jobs={filteredJobs} />

        {/* Load More */}
        {filteredJobs.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-mentor-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0EA271] transition">
              Load More Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Jobs