import { Calendar } from "lucide-react";

const experiences = [
  {
    company: "Futures Platform",
    position: "Senior Frontend Developer",
    startDate: "02/2021",
    endDate: "02/2025",
    description: [
      "I am responsible for all technical matters in Frontend side to make sure they are aligned with the company's businesses.",
    ],
    link: "https://www.futuresplatform.com",
  },
  {
    company: "Vaadin",
    position: "Software developer",
    startDate: "10/2016",
    endDate: "04/2020",
    description: [
      "Working at Vaadin in the Component team - the team to develop/build/maintenance Vaadin components.",
    ],
    link: "https://vaadin.com/components",
  },
  {
    company: "Insightus",
    position: "Senior Frontend Developer",
    startDate: "01/2013",
    endDate: "10/2016",
    description: [
      "Responsible for developing and optimizing web applications for mapping, street visualization, and road infrastructure.",
      "Create interactive and high-performance user interfaces.",
      "My role involved integrating real-time geospatial data, improving UI/UX for navigation, and ensuring seamless frontend-backend communication.",
    ],
    link: "https://insightus.com.au/",
  },
];

export function ExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Work Experience</h1>
      <div className="space-y-8">
        {experiences.map((job, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{job.position}</h2>
            <a href={job.link} className="text-xl text-gray-600 mb-4">
              {job.company}
            </a>
            <div className="mt-1 flex items-center text-gray-500 mb-4">
              <Calendar className="w-5 h-5 mr-2" />
              <span>
                {job.startDate} - {job.endDate}
              </span>
            </div>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
