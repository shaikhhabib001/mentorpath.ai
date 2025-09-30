import React from 'react'
import { MapPin, Briefcase, Clock, DollarSign, Star } from 'lucide-react'

const JobList = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-mentor-blue text-6xl mb-4">💼</div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Jobs Found</h2>
        <p className="text-gray-600">Try adjusting your search criteria or check back later for new opportunities.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-lg text-mentor-blue font-medium">{job.company}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{job.match}% Match</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.posted}
                  </div>
                  {job.salary && (
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                  )}
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="bg-mentor-teal/10 text-mentor-teal px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex lg:flex-col gap-3 mt-4 lg:mt-0 lg:ml-6">
                <button className="bg-mentor-teal hover:bg-[#0EA271] text-white font-semibold py-2 px-6 rounded-lg transition duration-300 whitespace-nowrap">
                  Apply Now
                </button>
                <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-6 rounded-lg transition duration-300 whitespace-nowrap">
                  Save Job
                </button>
              </div>
            </div>
          </div>
          
          {/* Match Indicator */}
          <div className="bg-gray-100 rounded-b-lg overflow-hidden">
            <div 
              className="bg-mentor-teal h-1 transition-all duration-500"
              style={{ width: `${job.match}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default JobList